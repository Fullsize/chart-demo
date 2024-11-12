/*
 * @Author: sungy
 * @Date: 2023-12-04 16:06:13
 * @LastEditors: sungy
 * @LastEditTime: 2023-12-15 14:39:40
 * @Description: Echars-饼图类
 */
import React from 'react';
import BaseEchars from './BaseEchars';
import { trToEcharsSankey } from './echartTr';

export function EcharsSankey({ resApi, style, data_deconstruction }: any) {
    return (
        <BaseEchars
            style={{ flex: 1, ...style }}
            resApi={resApi}
            onRender={(data: any) => {
                return trToEcharsSankey(data, {
                    ...data_deconstruction,
                });
            }}
        />
    );
}
