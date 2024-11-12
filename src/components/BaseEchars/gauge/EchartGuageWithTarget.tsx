import React, { memo } from 'react';
import BaseEchars from '../BaseEchars';
import { mapTarget } from '@/utils';
import { color } from 'echarts';
import { min } from 'lodash';

/**
 * 默认解构参数
 */
const default_deconstruction = {
    value: 'val1',
    target: 'val',
    unit: 'unit_name',
    measure: ['index_code_cname'],
};

/**
 * 获取最大值，最小值
 * @param param0
 * @returns
 */
const minMax = (value = 0, target = 0) => {
    const magic = 5;
    let max = Math.max(Math.abs(value), Math.abs(target));

    max = Math.ceil(max / magic) * magic;

    return {
        min: 0,
        max: max,
    };
};

function onRenderGuage(data: ITEchartGuageWithTargetProps['data'], config: any) {
    const { data_deconstruction } = config ?? {};

    /**映射字段 */
    const dataMaped = mapTarget(data, data_deconstruction);

    const { value, target, unit, measure } = dataMaped;

    const { min, max } = minMax(value, target);

    const options = {
        color: ['rgb(5, 207, 247)', '#FCCE25'],
        series: [
            {
                type: 'gauge',
                center: ['50%', '60%'],
                startAngle: 200,
                endAngle: -20,
                min: min,
                max: value ? max : 1,
                splitNumber: 10,
                raduis: '50%',
                colorBy: 'series',
                progress: {
                    show: false,
                    width: 10,
                    itemStyle: {
                        // color: 'rgb(5, 207, 247)',
                        color: '#FCCE25',
                    },
                },
                pointer: {
                    show: false,
                },
                axisLine: {
                    lineStyle: {
                        width: 10,
                        color: [[1, '#4155D4B3']],
                    },
                },
                axisTick: {
                    distance: -20,
                    splitNumber: 5,
                    lineStyle: {
                        width: 1,
                        color: '#4155D4',
                    },
                },
                splitLine: {
                    distance: -20,
                    length: 8,
                    lineStyle: {
                        width: 2,
                        color: '#324FBA',
                    },
                },
                axisLabel: {
                    // show:false,
                    distance: -12,
                    color: '#4155D4',
                    fontSize: 8,
                },
                anchor: {
                    show: false,
                },
                title: {
                    show: true,
                    color: '#FFF',
                    fontSize: 12,
                    offsetCenter: [0, '80%'],
                },
                detail: {
                    valueAnimation: false,
                    width: '60%',
                    lineHeight: 40,
                    borderRadius: 8,
                    offsetCenter: [0, '-10%'],
                    fontSize: 18,
                    fontWeight: 'bolder',
                    formatter: `${value ?? ''} ${unit ?? ''}`,
                    color: '#FCCE25',
                    fontFamily: 'D-DIN',
                },
                data: [
                    {
                        value: value ?? 0,
                        name: measure,
                    },
                ],
            },
            {
                type: 'gauge',
                center: ['50%', '60%'],
                startAngle: 200,
                endAngle: -20,
                min: min,
                max: value ? max : 1,
                raduis: '50%',
                colorBy: 'data',
                z: 3,
                itemStyle: {
                    borderWidth: 1,
                    borderColor: '#324fba',
                },
                progress: {
                    show: true,
                    width: 5,
                    overlap: false,
                },
                pointer: {
                    show: false,
                },
                axisLine: {
                    show: false,
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
                detail: {
                    show: false,
                },
                data: [
                    {
                        value: target ?? 0,
                    },
                    {
                        value: Math.abs(value) ?? 0,
                        itemStyle: {
                            color: value > 0 ? '#FCCE25' : '#71ff5e',
                        },
                    },
                ],
            },
        ],
    };

    return options;
}

export interface ITEchartGuageWithTargetProps {
    /**数据 */
    data: Record<string, unknown>;
    /**映射字段
     * @default default_deconstruction
     */
    data_deconstruction?: object;
    style?: React.CSSProperties;
    [x: string]: any;
}

/**
 * 仪表盘-目标值和实际值对比
 * @param props
 * @returns
 */
const EchartGuageWithTarget: React.FC<ITEchartGuageWithTargetProps> = (props) => {
    const { data, data_deconstruction = default_deconstruction, style, ...restProps } = props;

    return (
        <BaseEchars
            style={{ flex: 1, ...style }}
            resApi={{ ok: true, sign: 1, data: data }}
            onRender={(data: any) => {
                return onRenderGuage(data, { data_deconstruction });
            }}
            {...restProps}
        />
    );
};

export default EchartGuageWithTarget;
