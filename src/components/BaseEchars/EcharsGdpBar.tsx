/*
 * @Author: sungy
 * @Date: 2023-12-04 15:38:53
 * @LastEditors: sungy
 * @LastEditTime: 2023-12-25 16:19:13
 * @Description: Echars-坐标轴类
 */
import React from 'react';
import BaseEchars from './BaseEchars';
import { trToEcharsGdpBar } from './echartTr';

export function EcharsGdpBar({ resApi, style, theme, data_deconstruction, option, ...props }: any) {
    return (
        <BaseEchars
            style={{ flex: 1, ...style }}
            theme={theme}
            resApi={resApi}
            onRender={(data: any) => {
                return trToEcharsGdpBar(
                    data,
                    {
                        ...data_deconstruction,
                    },
                    option,
                );
            }}
            {...props}
        />
    );
}
