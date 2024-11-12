/*
 * @Author: sungy
 * @Date: 2024-06-25 14:12:40
 * @LastEditors: sungy
 * @LastEditTime: 2024-06-27 15:34:24
 * @Description: Echars 工具类 Provider
 */
import React, { createContext, useContext } from 'react';
import _ from 'lodash';

export const EcharsToolsContext: any = createContext(null);

// 创建一个 Provider 组件
export const EcharsToolsProvider = ({ value, title, children }: any) => {
    return (
        <EcharsToolsContext.Provider value={{ title, value }} title={title}>
            {children}
        </EcharsToolsContext.Provider>
    );
};

// 设置工具栏
export const useEcharsTools = () => {
    const echarsTools: any = useContext(EcharsToolsContext);
    return echarsTools?.value;
};

// 获取标题名称
export const useIndTitle = () => {
    const echarsTools: any = useContext(EcharsToolsContext);
    return echarsTools?.title;
};
