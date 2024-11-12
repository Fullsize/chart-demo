/*
 * @Author: sungy
 * @Date: 2023-12-04 15:38:53
 * @LastEditors: zhipengHuang
 * @LastEditTime: 2024-08-28 18:06:42
 * @Description: Echars-坐标轴类
 */
import React from 'react';
import BaseEchars from './BaseEchars';
import _ from 'lodash';
import { IEcharsToolType } from './EcharsToolsRender';

const defaultAxisConfig = {
    category: 'time_name',
    measure: 'index_code_full_cname',
    val: 'val',
    type: 'type',
    unitName: 'unit_name',
    inverse: 'inverse',
};
export function trToEcharsAxisDouble(apiData: Array<any>, data_deconstruction: any, customOption?: any) {
    if (!(Array.isArray(apiData) && apiData?.length > 0)) {
        return;
    }

    // 数据类别
    const max = (() => {
        const data: any = _.maxBy(apiData, (item) => _.toFinite(item[data_deconstruction?.val ?? '']));
        const num = _.round(_.toFinite(data?.[data_deconstruction?.val] ?? 0) * 1.2);
        if (num > 99) {
            return num - (num % 10);
        }
        return num;
    })();
    const entries = _.uniqBy(apiData, data_deconstruction?.measure);

    const category = _.uniqBy(apiData, data_deconstruction?.category).map(
        (item: any) => item[data_deconstruction?.category],
    );
    // series
    const series = entries.map((item: any) => ({
        type: 'bar',
        // barWidth: 14,
        label: {
            show: false,
        },
        itemStyle: {
            color: (params: any) => {
                return params.color;
            },
            borderRadius: item[data_deconstruction.inverse] ? [0, 100, 100, 0] : [100, 0, 0, 100],
        },
        backgroundStyle: {
            borderRadius: item[data_deconstruction.inverse] ? [0, 100, 100, 0] : [100, 0, 0, 100],
        },
        name: item[data_deconstruction?.measure],
        xAxisIndex: item[data_deconstruction.inverse] ? 2 : 0,
        yAxisIndex: item[data_deconstruction.inverse] ? 2 : 0,
        data: _.filter(apiData, (d: any) => d[data_deconstruction?.measure] == item[data_deconstruction?.measure])?.map(
            (item: any) => item[data_deconstruction?.val],
        ),
    }));

    const extSeries: any[] = [];
    const leftCount = entries.filter((d: any) => d[data_deconstruction.inverse] != true)?.length || 0;
    const rightCount = entries.filter((d: any) => d[data_deconstruction.inverse] == true)?.length || 0;

    if (rightCount != leftCount) {
        const len = Math.abs(rightCount - leftCount);
        for (let index = 0; index < len; index++) {
            extSeries.push({
                type: 'bar',
                // barWidth: 14,
                xAxisIndex: rightCount < leftCount ? 2 : 0,
                yAxisIndex: rightCount < leftCount ? 2 : 0,
            });
        }
    }

    const unitName = apiData[0][data_deconstruction.unitName] ?? '';
    const option = {
        tooltip: {
            show: true,
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
            },
            formatter: function (params: any) {
                let tip = '';
                if (params) {
                    tip += `${params[0]?.name}<br/>`;
                    params.map((d: any) => {
                        tip += `${d.marker} ${d.seriesName}:  ${d.value} ${unitName}<br/> `;
                        return d;
                    });
                }
                return tip;
            },
        },
        legend: [{
            show: true
        }],
        grid: [
            {
                show: false,
                left: '10%',
                top: '15%',
                width: '40%',
                containLabel: true,
                bottom: 30,
            },
            {
                show: false,
                left: -10,
                top: '20%',
                bottom: 30,
                width: '0%',
            },
            {
                show: false,
                left: '50%',
                top: '15%',
                bottom: 30,
                containLabel: true,
                width: '35%',
            },
        ],
        xAxis: [
            {
                name: unitName,
                nameTextStyle: {
                    padding: [0, 0, -40, 0],
                    verticalAlign: 'bottom',
                },
                type: 'value',
                inverse: true,
                max,
                axisLabel: {
                    show: true,

                    margin: 10,
                },
            },
            {
                gridIndex: 1,
                show: true,
                axisLabel: {
                    margin: 0,
                },
                splitLine: {},
            },
            {
                name: unitName,
                nameTextStyle: {
                    padding: [0, 0, -40, 0],
                    verticalAlign: 'bottom',
                },
                gridIndex: 2,
                max,
                type: 'value',
                axisLabel: {
                    show: true,
                    margin: 10,
                },
            },
        ],
        yAxis: [
            {
                type: 'category',
                inverse: false,
                position: 'left',
                data: category,
            },
            {
                type: 'category',
                inverse: false,
                gridIndex: 1,
                axisLine: {
                    show: false,
                    lineStyle: {},
                },
                axisTick: {
                    show: false,
                },
            },
            {
                type: 'category',
                inverse: false,
                gridIndex: 2,
                axisLabel: {
                    show: false,
                },
                axisLine: {
                    show: true,
                },
                axisTick: {
                    show: false,
                },
                data: category,
            },
        ],
        series: [...series, ...extSeries],
    };
    return option;
}

export function EcharsAxisDouble({
    resApi,
    style,
    data_deconstruction = defaultAxisConfig,
    option = {},
    ...props
}: any) {
    return (
        <BaseEchars
            style={{ flex: 1, ...style }}
            resApi={resApi}
            onRender={(data: any) => {
                return trToEcharsAxisDouble(
                    data,
                    {
                        ...data_deconstruction,
                    },
                    option,
                );
            }}
            trToolsType={IEcharsToolType.EcharsAxisDouble}
            {...props}
        />
    );
}
