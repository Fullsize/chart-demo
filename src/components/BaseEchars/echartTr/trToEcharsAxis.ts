import _ from 'lodash';
import { trDataDeconstruction } from './trDataDeconstruction';
import colors from '../theme/ectThemeFgwColors';
const defaultAxisConfig = {
    category: 'time_name',
    measure: 'index_code_full_cname',
    val: 'val',
    type: 'type',
    unitName: 'unit_name',
};

function getTrData(data: any, data_deconstruction: any) {
    const categoryMap: any = new Map();
    const axisMap: any = new Map();
    data?.map?.((item: any) => {
        const { category, measure, val, type, unitName } = trDataDeconstruction(item, data_deconstruction);
        if (!categoryMap.has(category)) {
            categoryMap.set(category, categoryMap.size);
        }

        const unionKey = type + unitName;
        let axisM = axisMap.get(unionKey);
        if (!axisM) {
            axisM = {
                type,
                unitName,
                data: new Map(),
            };
            axisMap.set(unionKey, axisM);
        }
        const measureMap = axisM.data;
        if (!measureMap.has(measure)) {
            measureMap.set(measure, []);
        }
        measureMap.get(measure).push([category, val]);
    });
    return {
        category: Array.from(categoryMap.keys()),
        measure: Array.from(axisMap).sort((a: any, b: any) => {
            const isTypeA = a[1].type == 'bar';
            const isTypeB = b[1].type == 'bar';
            if (isTypeA && !isTypeB) {
                return -1;
            }
            if (!isTypeA && isTypeB) {
                return 1;
            }
            return 0;
        }),
    };
}

export function trToEcharsAxis(apiData: Array<any>, config: any = {}, customOption?: any, customSeries?: any) {
    if (!(Array.isArray(apiData) && apiData?.length > 0)) {
        return;
    }
    const trConfig = _.defaultsDeep(config, defaultAxisConfig);
    const { category, measure }: any = getTrData(apiData, trConfig);
    const series: any = [];
    const yAxis: any = [];
    const seriesMak: any = {};
    measure.forEach((a: any, i: any) => {
        const { type, unitName, data } = a[1];
        yAxis.push({
            name: unitName,
            alignTicks: true,
            type: 'value',
            offset: -10,
            axisLabel: {
                formatter: function (value: any) {
                    const valueStr = value.toString();
                    const decimalIndex = valueStr.indexOf('.');
                    if (decimalIndex === -1 || (decimalIndex !== -1 && valueStr.length - decimalIndex - 1 <= 2)) {

                        return value < 0 ? `{a|${value.toLocaleString()}}` : value.toLocaleString();
                    } else {
                        // return value < 0 ?  : value;
                        return value < 0 ? `{a|${parseFloat(valueStr).toFixed(2)}}` : parseFloat(valueStr).toFixed(2);
                    }
                },
                rich: {
                    a: {
                        color: '#7DFFAF', // 负值的颜色
                        fontWeight: 'bold'
                    }
                }
            },

        });
        const array: any = Array.from(data);
        array.sort((a: any, b: any) => {
            const isTypeA = a[0] == '当期增速';
            const isTypeB = b[0] == '当期增速';
            if (isTypeA && !isTypeB) {
                return -1;
            }
            if (!isTypeA && isTypeB) {
                return 1;
            }
            return 0;
        });
        const sortMap = new Map(array);
        for (const [key, value] of sortMap) {
            seriesMak[series.length] = i;
            series.push({
                name: key,
                type: type ?? 'bar',
                yAxisIndex: i,
                ...customSeries,
                data: value,
                unitName: unitName,
                lineStyle: {
                    width: 3,
                }
            });
        }
    });

    const o: any = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
            },
            formatter: function (params: any[] | null) {
                let toolTip = '';
                if (params !== null && params.length) {
                    params.map((item: any, index) => {
                        const i = index % colors.length
                        const color = colors[i]?.[0];
                        item.marker = `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${color}"></span>`;
                        toolTip += `${item.marker} ${item.seriesName} : 
                            <span style="font-weight:bold"> ${item.value[1] ?? '--'}</span>     
                            ${measure?.[seriesMak[item.seriesIndex]]?.[1].unitName ?? ''}<br/>`;
                        return item;
                    });
                    return `${params[0].name}<br/>${toolTip}`;
                }
                return toolTip;
            },
        },
        legend: {
            padding: [0, 5, 0, 5],
            type: 'scroll',
        },
        grid: {
            bottom: -8,

        },
        xAxis: {
            type: 'category',
            data: category,
            axisTick: {
                show: false
            },
            axisLine: {
                show: true,
                lineStyle: {
                    width: 4      // 轴线宽度
                }
            },
            axisLabel: {
                interval: 0,
                rotate: 45,
                // align: 'center',
                // showMinLabel: true,
                // showMaxLabel: true,
            },
        },
        yAxis: yAxis,
        series: series,
    };
    if (customOption) {
        return _.defaultsDeep(customOption, o);
    } else {
        return o;
    }
}
