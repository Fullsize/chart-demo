/*
 * @Author: sungy
 * @Date: 2023-08-10 11:40:25
 * @LastEditors: sungy
 * @LastEditTime: 2024-07-24 16:22:52
 * @Description:
 */

import { useRef } from 'react';
import { getFetchOption, getParmsJson } from '../utils';

// 处理特殊维度时间
const trParams = (param: any) => {
    if (typeof param == 'object') {
        param.businessName = '140000_sxsjj';
        if (param?.timeLength == 5) {
            param.replaceTime = '.Q';
        }
        if (param?.timeLength == 4) {
            param.replaceTime = 'yyyy年';
        }
        if (param?.orderIndexCode || param?.regionProcode) {
            param.shortName = true;
        }
        if (param?.regionProcode == '130000') {
            delete param.regionProcode;
            param.regionCodeList =
                '130100,130181,130200,130300,130400,130500,130600,130682,130700,130800,130900,131000,131100,133100';
        }
        param.module = window.location.hash.substring(1);
    }
    return param;
};

// 生成请求Option
export function getApiOption(args: any) {
    if (!args) {
        return undefined;
    }
    const [reqPath, reqParams, method] = args;

    let reqParamsTr = getParmsJson(reqParams);
    reqParamsTr = trParams(reqParamsTr);
    if (reqParamsTr == undefined) {
        return undefined;
    }

    const { url, option } = getFetchOption(reqPath, reqParamsTr, method);
    return {
        url: handleUrl(url),
        option,
    };
}

// 验证接口结果
export function verifyCode(resData: any) {
    const code = resData?.data?.code;
    if (code == '1') {
        return true;
    }
    return false;
}

function getApiTimeName(data: any, field: string) {
    let res;
    if (Array.isArray(data)) {
        if (field) {
            res = data?.[data.length - 1]?.[field];
        } else {
            res = data?.[data.length - 1]?.time_name || data?.[data.length - 1]?.time_name1;
        }
    } else if (typeof data == 'object') {
        if (field) {
            res = data?.[field];
        } else {
            res = data?.time_name || data?.time_name1;
        }
    }
    return res ?? '--';
}

// 平台处理返回结果
function useEcResHandle(resData: any) {
    const ref = useRef<any>(resData);
    if (resData.loading == true) {
        ref.current = resData;
    } else if (ref.current?.sign != resData?.sign) {
        if (resData.ok) {
            const { data, sign, getApiParams } = resData;
            if (verifyCode(resData)) {
                ref.current = {
                    ok: true,
                    data: data?.data,
                    sign: sign,
                    getTimeName: (field: string) => {
                        return getApiTimeName(data?.data, field);
                    },
                    getApiParams,
                };
            } else {
                ref.current = { ok: false, error: resData, sign: sign };
            }
        } else {
            ref.current = resData;
        }
    }

    if (!ref.current?.getTimeName) {
        ref.current.getTimeName = () => {
            return '';
        };
    }
    return ref.current;
}

//【中间件】Fetch 请求
function ecHooksMiddleware(useNextHook: any) {
    return (args: any) => {
        const [fetchData, dispathFetch] = useNextHook(() => {
            return getApiOption(args);
        });

        function dispath(params: any) {
            const [reqPath, , method] = args;
            const option = getApiOption([reqPath, params, method]);
            dispathFetch(option);
        }
        const res = useEcResHandle(fetchData);
        return [res, dispath];
    };
}

/**
 * 处理需要完整链接的情况
 * @param url
 * @returns
 */
function handleUrl(url: string) {
    if (url.startsWith('http')) {
        return url;
    }
    return window['baseapi'] + url;
}

export { ecHooksMiddleware };
