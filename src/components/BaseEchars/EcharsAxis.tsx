/*
 * @Author: sungy
 * @Date: 2023-12-04 15:38:53
 * @LastEditors: sungy
 * @LastEditTime: 2024-07-01 14:06:10
 * @Description: Echars-坐标轴类
 */
import React from 'react';
import BaseEchars from './BaseEchars';
import { trToEcharsAxis } from './echartTr';
import { IEcharsToolType } from './EcharsToolsRender';

export function EcharsAxis({ resApi, style, data_deconstruction, option = {}, series = {}, ...props }: any) {
    return (
        <BaseEchars
            trToolsType={IEcharsToolType.EcharsAxis}
            style={{ flex: 1, ...style }}
            resApi={resApi}
            onRender={(data: any) => {
                return trToEcharsAxis(
                    data,
                    {
                        ...data_deconstruction,
                    },
                    option,
                    series,
                );
            }}
            {...props}
        />
    );
}

export function EcharsAxisScale({ option, ...props }: any) {
    return (
        <EcharsAxis
            trToolsType={IEcharsToolType.EcharsAxis}
            option={{
                yAxis: [{ scale: true }],
                ...option,
            }}
            {...props}
        />
    );
}

export function EcharsAxisArea({ resApi, style, data_deconstruction, ...props }: any) {
    return (
        <BaseEchars
            trToolsType={IEcharsToolType.EcharsAxis}
            style={{ flex: 1, ...style }}
            resApi={resApi}
            onRender={(data: any) => {
                return trToEcharsAxis(
                    data,
                    {
                        ...data_deconstruction,
                    },
                    {},
                    {
                        stack: 'Total',
                        areaStyle: {},
                        type: 'line',
                    },
                );
            }}
            {...props}
        />
    );
}

export function EcharsAxisYc({
    resApi,
    style,
    data_deconstruction = {
        category: 'time_name',
        measure: 'type_name',
        val: 'value',
        type: 'type',
        unitName: 'unit',
    },
    ...props
}: any) {
    return (
        <BaseEchars
            trToolsType={IEcharsToolType.EcharsAxis}
            style={{ flex: 1, ...style }}
            resApi={resApi}
            onRender={(data: any) => {
                return trToEcharsAxis(
                    data,
                    {
                        ...data_deconstruction,
                    },
                    {
                        yAxis: [
                            {
                                scale: true,
                            },
                        ],
                        series: [
                            {},
                            { lineStyle: { type: 'dashed' } },
                            { lineStyle: { type: 'dashed' } },
                            { lineStyle: { type: 'dashed' } },
                            { lineStyle: { type: 'dashed' } },
                        ],
                    },
                    { type: 'line' },
                );
            }}
            {...props}
        />
    );
}
