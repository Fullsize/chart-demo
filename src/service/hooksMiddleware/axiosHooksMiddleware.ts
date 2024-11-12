/*
 * @Author: sungy
 * @Date: 2023-10-13 15:05:10
 * @LastEditors: sungy
 * @LastEditTime: 2024-07-23 15:04:12
 * @Description:  封装基础的 axios 请求
 */

import { useState, useRef, useEffect } from 'react';
import instance from '../request';

let count = 1;
function axiosRequest(url: string, option: any) {
    const { method, signal, body = {} } = option;
    if (method == 'GET') {
        return instance.get(url, { signal: signal });
    } else if (method == 'POST') {
        return instance.post(url, body, { signal: signal });
    } else {
        throw Error('暂不支持其他请求方式');
    }
}

/**
 * 返参格式
 */
export type IResponseType<T> = {
    ok?: boolean;
    data?: T;
    sign?: number;
    loading?: boolean;
    error?: string;
    signal?: any;
    getApiParams?: any;
};

/** hooks 返参格式 */
export type IAxiosAPIResponseType<T> = [IResponseType<T>, (...args: any[]) => void];

/**
 * Axios API
 * @param option
 * @param config
 * @returns
 */
function useAxiosApi<T>(option: any, config: any): IAxiosAPIResponseType<T> {
    const axiosRef = useRef(option);
    const [axiosState, setAxiosState] = useState<IResponseType<T>>({
        ok: undefined,
        data: undefined,
    });
    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);

    // Axios 请求
    const runAxios = (axiosOption: any) => {
        const reqOps = typeof axiosOption == 'function' ? axiosOption() : axiosOption;
        if (!reqOps) {
            return;
        }
        const { url, option } = reqOps;
        if (config?.loading) {
            const controller = new AbortController();
            option.signal = controller.signal;
            if (isMounted.current) {
                setAxiosState({ loading: true, signal: controller });
            }
        }
        let isOk = false;
        let apiData: any;
        axiosRequest(url, option)
            .then((res: any) => {
                if (res.status === 200) {
                    isOk = true;
                }
                return res.data;
            })
            .then((resData: any) => {
                count++;
                apiData = resData;
            })
            .catch((error: any) => {
                count++;
                apiData = error;
            })
            .finally(() => {
                if (isMounted.current) {
                    if (isOk) {
                        setAxiosState({
                            ok: true,
                            data: apiData,
                            sign: count,
                            getApiParams: () => {
                                return { url, params: option?.body, method: option?.method };
                            },
                        });
                    } else {
                        setAxiosState({
                            ok: false,
                            error: '请求服务失败，请检查接口',
                            sign: count,
                        });
                    }
                }
            });
    };

    // 初始化
    useEffect(() => {
        runAxios(axiosRef.current);
    }, []);

    // 手动触发接口
    function dispatch(option: any) {
        axiosRef.current = option;
        runAxios(option);
    }
    return [axiosState, dispatch];
}

// 【中间件】Axios 请求
export function axiosHooksMiddleWare(useNextHook: any, config: any) {
    return (reqOption: any) => {
        const fetRes = useAxiosApi(reqOption, config);
        const res = useNextHook(fetRes);
        return res[0];
    };
}
