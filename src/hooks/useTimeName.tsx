import React, { useEffect, useState } from 'react';
import { IResponseType } from '@/service/hooksMiddleware';

/**
 * 获取标题时间
 * @param param0
 * @returns
 */
export const getTimeNameFromData = ({ data }: IResponseType<any>): string => {
    if (!Array.isArray(data) || data.length === 0) {
        // console.warn('func:TimeName , 参数不合法');
        return '';
    }

    const [lastElement] = data.slice(-1);
    const { time_name, time_name1 } = lastElement ?? {};

    return time_name ?? time_name1 ?? '';
};

/**
 * 标题时间获取
 * @param response  指标卡|图表 返回结果
 * @returns
 */
const useTimeName = (response: IResponseType<any>): { timeName: string } => {
    const [timeName, setTimeName] = useState('');

    useEffect(() => {
        setTimeName(getTimeNameFromData(response));
    }, [response.sign]);

    return { timeName };
};

export default useTimeName;
