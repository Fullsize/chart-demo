import React from 'react';
import { F14, F26B, Flc, IndCssLgText4 } from '@/components/Indicator';
import BaseEchars from '@/components/BaseEchars';
import { CSSProperties } from 'styled-components';

interface EchartGaugeProps {
    gaugeValue?: number;
    style?: CSSProperties;
    titleData?: {
        unit_name?: string;
        val?: any;
    };
}

export default function EchartGauge({ gaugeValue = 80, style, titleData }: EchartGaugeProps) {
    return (
        <Flc height="100%" position="relative" {...style}>
            <BaseEchars
                style={{ flex: 1, ...style }}
                resApi={{ ok: true, sign: 1, data: gaugeValue }}
                onRender={(data: any) => {
                    return {
                        grid: {
                            top: 10,
                            bottom: 10,
                        },
                        series: [
                            {
                                type: 'gauge',
                                radius: '85%',
                                center: ['50%', '45%'],
                                startAngle: 210,
                                endAngle: -30,
                                min: 0,
                                max: 100,
                                itemStyle: {
                                    color: '#009BFE',
                                },
                                progress: {
                                    show: true,
                                    width: 10,
                                },
                                axisLine: {
                                    lineStyle: {
                                        width: 10,
                                        color: [[1, '#009BFE']],
                                    },
                                },
                                axisTick: {
                                    show: false,
                                },
                                splitLine: {
                                    show: false,
                                },
                                axisLabel: {
                                    show: false,
                                },
                                title: {
                                    show: false,
                                },
                                detail: {
                                    show: false,
                                },
                                pointer: {
                                    length: '80%',
                                    itemStyle: {
                                        color: '#D6E3E9',
                                    },
                                },
                                data: [
                                    {
                                        value: data,
                                    },
                                ],
                            },
                        ],
                    };
                }}
            />
            <Flc alignItems="center" position="absolute" top="55%" width="100%" gap={10}>
                <F14>{titleData?.unit_name}</F14>
                <F26B>
                    <IndCssLgText4>{titleData?.val}</IndCssLgText4>
                </F26B>
            </Flc>
        </Flc>
    );
}
