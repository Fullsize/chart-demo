import React, { useEffect, useMemo, useRef, useState } from 'react';
import BaseEchars from './BaseEchars';
import { mapTarget } from '@/utils';
import colors from '@/components/BaseEchars/theme/ectThemeFgwColors';
import _ from 'lodash';
const default_deconstruction = {
    name: 'group_name',
    value: 'val',
    unit: 'unit_name',
    measure: ['index_code_full_type_name', '_', 'index_code_cname'],
};

/**
 * 生成雷达图options
 * @param apiData
 * @param config
 * @returns
 */
function onRenderRadar(apiData: Array<Record<string, string>>, config: any = {}, customOption?: any) {
    if (!Array.isArray(apiData)) {
        throw new TypeError('入参类型不匹配，需要数组');
    }

    const { data_deconstruction = default_deconstruction } = config ?? {};
    const dataMaped = apiData.map((item) => {
        return mapTarget(item, data_deconstruction);
    });

    // 计算最大值，设置1.2 倍常数
    const max = Math.max(...dataMaped.map((item) => item.value)) * 1.2;
    const legends = [...new Set(dataMaped.map((item) => item.measure || item.index_code_full_type_name))];
    const indicator = [...new Set(dataMaped.map((item) => item.name))].map((item) => {
        return { name: item, max: max };
    });
    const seriesData = legends.map((item, index) => {
        const valueFilter = dataMaped.filter((i) => (i.measure || i.index_code_full_type_name) === item);
        return {
            name: item,
            value: valueFilter.map((i) => i.value),
            unit: valueFilter.map((item) => item.unit[0] || item.unit_name)[0],
            areaStyle: {
                color: colors[index]?.[1],
                opacity: '0.2',
            },
            itemStyle: {
                borderWidth: 2,
                color: colors[index]?.[0],
            },
            symbolSize: 0,
            lineStyle: {
                color: colors[index]?.[0],
                width: 1,
            },
        };
    });

    const option = {
        tooltip: {
            formatter: function (params: any) {
                const { name, value, unit } = params.data ?? {};
                let toolTipContent = '' + name + '<br>';
                for (let i = 0; i < indicator.length; i++) {
                    toolTipContent += params.marker + indicator[i].name + ': ' + (value[i] ?? '--') + unit + '<br>';
                }
                return toolTipContent;
            },
        },
        legend: {
            show: true,
            data: legends,
            align: 'left',
            orient: 'vertical',
            y: 'center',
            x: '65%',
        },
        radar: {
            // shape: 'circle',
            indicator: indicator,
            center: ['30%', '50%'],
            // 面积设置
            splitArea: {
                areaStyle: {
                    shadowBlur: 10,
                    color: ['rgba(91,117,128,0.2)'],
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
            },
            splitLine: {
                lineStyle: {
                    color: '#5b7580',
                },
            },
            axisLine: {
                lineStyle: {
                    color: '#5b7580',
                },
            },
        },
        series: [
            {
                type: 'radar',
                data: seriesData,
            },
        ],
    };

    if (customOption) {
        return _.defaultsDeep(customOption, option);
    }
    return option;
}

export interface IEchartsRadarProps {
    resApi: any;
    style?: React.CSSProperties;
    data_deconstruction?: object;
    [x: string]: any;
}

/**
 * 雷达图
 * @param param0
 * @returns
 */
export const EchartsRadar: React.FC<IEchartsRadarProps> = ({
    resApi,
    style,
    data_deconstruction = default_deconstruction,
    customOption = {},
    onClick,
    ...restProps
}) => {
    const [echartObj, setEchartObj] = useState<any>(null);

    useEffect(() => {
        if (echartObj) {
            echartObj.on('click', (params: any) => {
                onClick?.(params);
            });
        }
        return () => {
            echartObj?.off('click');
        };
    }, [echartObj]);

    return (
        <>
            <BaseEchars
                setChart={setEchartObj}
                style={{ flex: 1, ...style }}
                resApi={resApi}
                onRender={(data: any) => {
                    return onRenderRadar(data, { data_deconstruction }, customOption);
                }}
                {...restProps}
            />
        </>
    );
};

export default EchartsRadar;
