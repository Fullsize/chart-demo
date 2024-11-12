/*
 * @Author: sungy
 * @Date: 2024-06-25 14:12:40
 * @LastEditors: sungy
 * @LastEditTime: 2024-07-24 14:40:03
 * @Description: Echars 工具类 Provider
 */
import React, { createContext, useContext, useEffect, useState } from 'react';
import _ from 'lodash';

export const IndSourceContext: any = createContext(null);

// 设置数据源 Provider
export const IndSourceProvider = ({ value, children }: any) => {
    return <IndSourceContext.Provider value={value}>{children}</IndSourceContext.Provider>;
};

// 内容
export const useSetIndSource = (hooksApi: any) => {
    const [apiId] = useState('hooksApi' + _.uniqueId());
    const setIndHooks: any = useContext(IndSourceContext);

    useEffect(() => {
        setIndHooks?.(apiId, hooksApi);
    }, [hooksApi?.sign]);
    return apiId;
};
