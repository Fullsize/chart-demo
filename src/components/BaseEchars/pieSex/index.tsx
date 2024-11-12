import React, { useCallback, useEffect, useMemo, useState } from 'react';
import _ from 'lodash';
import BaseEchars from '@/components/BaseEchars';
import icon from './icon.json';
import theme from '../theme/ectThemeFgw.json';
export interface Props {
    resApi?: any;
    data_deconstruction?: {
        name?: string;
        value?: string;
        unit?: string;
    };
}
const scale = 0.45;
const CircularProgress = (props: Props) => {
    return (
        <BaseEchars
            resApi={props.resApi}
            onRender={(data: any[]) => {
                // const color = ['#00FFFF', 'rgba(196,36,255,1)'];
                const color = theme.color;
                const datas = [];
                for (let i = 0; i < data.length; i++) {
                    datas.push(
                        {
                            value: data[i][props.data_deconstruction?.value ?? ''],
                            name: data[i][props.data_deconstruction?.name ?? ''],
                            unit: data[i][props.data_deconstruction?.unit ?? ''],
                            itemStyle: {
                                normal: {
                                    borderWidth: 8,
                                    // shadowBlur: 20,
                                    borderColor: color[i],
                                    // shadowColor: color[i],
                                },
                            },
                        },
                        {
                            value: data[0].value / 10,
                            name: '',
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: false,
                                    },
                                    labelLine: {
                                        show: false,
                                    },
                                    color: 'rgba(0, 0, 0, 0)',
                                    borderColor: 'rgba(0, 0, 0, 0)',
                                    borderWidth: 0,
                                },
                            },
                        },
                    );
                }
                const option = {
                    color,
                    graphic: {
                        elements: [
                            {
                                type: 'image',
                                z: 3,
                                style: {
                                    image: icon.border,
                                    width: 300 * scale,
                                    height: 300 * scale,
                                },
                                left: 'center',
                                top: 'center',
                                position: [100 * scale, 100 * scale],
                            },
                            {
                                type: 'image',
                                z: 3,
                                style: {
                                    image: icon.man,
                                    width: 85 * scale,
                                    height: 120 * scale,
                                },
                                left: '40%',
                                top: 'center',
                            },
                            {
                                type: 'image',
                                z: 3,
                                style: {
                                    image: icon.woman,
                                    width: 85 * scale,
                                    height: 120 * scale,
                                },
                                right: '40%',
                                top: 'center',
                            },
                        ],
                    },
                    tooltip: {
                        show: true,
                        formatter: '{a}{b}:{c}%',
                    },
                    toolbox: {
                        show: false,
                    },
                    series: [
                        {
                            name: '',
                            type: 'pie',
                            clockWise: false,
                            radius: [175 * scale, 180 * scale],
                            hoverAnimation: false,
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true,
                                        fontSize: 14,
                                        formatter(params: any) {
                                            return params.name
                                                ? params.name + '\n' + params.value + params.data.unit
                                                : '';
                                        },
                                    },
                                    labelLine: {
                                        width: 4,
                                        length: 30 * scale,
                                        length2: 50 * scale,
                                        show: true,
                                        color: '#00ffff',
                                    },
                                },
                            },
                            data: datas,
                        },
                    ],
                };
                return option;
            }}
        ></BaseEchars>
    );
};

export default CircularProgress;
