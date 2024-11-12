/*
 * @Author: sungy
 * @Date: 2023-12-04 16:06:13
 * @LastEditors: sungy
 * @LastEditTime: 2023-12-04 16:36:47
 * @Description: Echars-饼图类
 */
import React, { CSSProperties } from 'react';
import BaseEchars from './BaseEchars';
import { isEmpty } from 'lodash';

export interface EcharsPieDoubleProps {
    resApi: any;
    style?: CSSProperties;
    data_deconstruction?: {
        name: string;
        unit: string;
        value: string;
        type: string;
    };
    isCustomBar?: boolean;
    legend?: any;
    pieConfig?: any;
}

export function EcharsPieDouble(props: any) {
    const {
        resApi,
        style,
        data_deconstruction = {
            name: 'index_code_full_cname',
            value: 'val',
            unit: 'unit_name',
            type: 'type',
        },
        legend = {
            top: 'center',
            right: '10%',
            orient: 'vertical',
        },
        pieConfig = { center: ['40%', '50%'] },
    } = props;
    return (
        <BaseEchars
            style={{ flex: 1, ...style }}
            resApi={resApi}
            onRender={(data: any) => {
                const part1Data = data?.part1?.data?.map((item: any) => ({
                    name: item[data_deconstruction.name],
                    value: item[data_deconstruction.value],
                    unit: item[data_deconstruction.unit],
                    type: item[data_deconstruction.type],
                    // selected: index == 0,
                }));

                const part2Data = data?.part2?.data?.map((item: any) => ({
                    name: item[data_deconstruction.name],
                    value: item[data_deconstruction.value],
                    unit: item[data_deconstruction.unit],
                    type: item[data_deconstruction.type],
                }));

                const option = {
                    tooltip: {
                        trigger: 'item',
                    },
                    legend: {
                        ...legend,
                        selectedMode: false,
                        itemWidth: 16,
                        itemHeight: 8,
                    },
                    series: [
                        {
                            name: ' ',
                            z: 10,
                            type: 'pie',
                            radius: ['60%', '70%'],
                            label: {
                                position: 'center',
                                show: true,
                                color: '#fff',
                                lineHeight: 20,
                                fontSize: 14,
                                fontWeight: 'bold',
                                formatter: () => {
                                    const info = part1Data[0] ?? {};
                                    if (isEmpty(info)) {
                                        return '';
                                    }
                                    return info.name + '\n' + `${info.value} ${info.unit}`;
                                },
                            },
                            labelLine: {
                                show: false,
                            },
                            tooltip: {
                                show: false,
                            },
                            itemStyle: {
                                normal: {
                                    color: 'rgb(250,250,250, .8)',
                                    opacity: 0.8,
                                },
                            },
                            data: [
                                {
                                    value: 0,
                                },
                            ],
                            ...pieConfig,
                        },
                        {
                            name: ' ',
                            z: 5,
                            type: 'pie',
                            radius: ['60%', '85%'],
                            avoidLabelOverlap: false,
                            label: {
                                show: false,
                            },
                            tooltip: {
                                trigger: 'item',
                                formatter: (params: any) => {
                                    const data = params.data;
                                    return `${params.marker}${data.name}: ${data.value} ${data.unit}`;
                                },
                            },
                            data: part2Data,
                            labelLine: {
                                show: false,
                            },
                            ...pieConfig,
                        },
                    ],
                };
                return option;
            }}
        />
    );
}
