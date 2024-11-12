/*
 * @Author: sungy
 * @Date: 2023-08-10 11:40:25
 * @LastEditors: sungy
 * @LastEditTime: 2024-09-11 18:16:38
 * @Description: 请求Hooks 入口
 */
import { useMiddleware, axiosHooksMiddleWare, ecHooksMiddleware } from './hooksMiddleware';
import _ from 'lodash';

// 经济通用--API 入口 手动触发请求
export const useEcApi = (reqPath: string, reqParams?: object, method?: string, config?: any) => {
    const resApi = useMiddleware([reqPath, reqParams, method], {
        use: [ecHooksMiddleware, axiosHooksMiddleWare],
        loading: config?.loading,
    });
    return resApi;
};

// 经济通用-API【POST】入口
export const useEcApiPost = (reqPath: string, reqParams?: object) => {
    return useEcApi(reqPath, reqParams, 'POST', { loading: true });
};
// 经济通用-API【GET】入口
export const useEcApiGet = (reqPath: string, reqParams?: object) => {
    return useEcApi(reqPath, reqParams, 'GET', { loading: true });
};

// 经济通用-loading-API【GET】入口
export const useEcApiLdgGet = (reqPath: string, reqParams?: object) => {
    return useEcApi(reqPath, reqParams, 'GET', { loading: true });
};
// 经济通用-loading-API【POST】入口
export const useEcApiLdgPost = (reqPath: string, reqParams?: object) => {
    return useEcApi(reqPath, reqParams, 'POST', { loading: true });
};
