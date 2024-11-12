import _ from 'lodash';
import { trDataDeconstruction } from './trDataDeconstruction';
const defaultAxisConfig = {
    category: 'group_name',
    val: 'val',
    unitName: 'unit_name',
};

export function trToEcharsGdpBar(apiData: Array<any>, config: any = {}, customOption?: any, customSeries?: any) {
    if (!(Array.isArray(apiData) && apiData?.length > 0)) {
        return;
    }

    const trConfig = _.defaultsDeep(config, defaultAxisConfig);

    let total: number = 0;
    const totalArr: any = [];

    const valArr1: any = [[], []];
    const valArr2: any = [[], []];
    const categoryNames: any = [];
    let unitNameStr;
    for (let i = 0; i < apiData.length; i++) {
        const item = apiData[i];
        const { category, val, unitName } = trDataDeconstruction(item, trConfig);
        unitNameStr = unitName;
        if (!val) {
            return;
        }
        const apiValue = parseFloat(val);
        if (i == 0) {
            totalArr.push(0);
            categoryNames.push(category);
            if (apiValue >= 0) {
                valArr1[0].push({
                    value: apiValue,
                    itemStyle: {
                        borderColor: 'transparent',
                        borderRadius: [0, 100, 100, 0],
                    },
                });
                valArr1[1].push({ value: '-' });
                valArr2[0].push({ value: '-' });
                valArr2[1].push({ value: '-' });
            } else {
                valArr1[0].push({ value: '-' });
                valArr1[1].push({ value: '-' });
                valArr2[0].push({ value: '-' });
                valArr2[1].push({
                    value: apiValue,
                    itemStyle: {
                        borderColor: 'transparent',
                        borderRadius: [100, 0, 0, 100],
                    },
                });
            }
            continue;
        }
        const preVal = parseFloat(apiData[i - 1]?.[trConfig['val']]);
        if (apiData[i - 1]) {
            valArr1[0].push({ value: '-' });
            valArr1[1].push({ value: '-' });
            valArr2[0].push({ value: '-' });
            valArr2[1].push({ value: '-' });

            const preIndex = valArr1[0].length - 2;
            const index = valArr1[0].length - 1;

            let mark: any = 0;

            if (preVal > 0) {
                mark = valArr1[0][preIndex].value;
            } else {
                mark = valArr2[1][preIndex].value;
            }

            let v1: any = '-';
            let v2: any = '-';
            total = total + (mark == '-' ? 0 : mark);
            const minMark = total + apiValue;

            if (apiValue >= 0) {
                if (total < 0) {
                    if (minMark > 0) {
                        v1 = minMark;
                        v2 = total;
                        total = 0;
                    } else {
                        v2 = -apiValue;
                        total = minMark;
                    }
                } else {
                    v1 = apiValue;
                }
                v1 = v1 != '-' ? parseFloat(v1.toFixed(2)) : '-';
                v2 = v2 != '-' ? parseFloat(v2.toFixed(2)) : '-';

                let v1Style = {};
                let v2Style = {};
                if (v1 == '-' || v2 == '-') {
                    v1Style = {
                        borderColor: 'transparent',
                        borderRadius: 100,
                    };
                    v2Style = v1Style;
                } else {
                    v1Style = {
                        borderColor: 'transparent',
                        borderRadius: [0, 100, 100, 0],
                    };
                    v2Style = {
                        borderColor: 'transparent',
                        borderRadius: [100, 0, 0, 100],
                    };
                }

                valArr1[0][index] = { value: v1, itemStyle: v1Style };
                valArr2[0][index] = { value: v2, itemStyle: v2Style };
            } else {
                if (total > 0) {
                    if (minMark < 0) {
                        v1 = total;
                        v2 = minMark;
                        total = 0;
                    } else {
                        v1 = -apiValue;
                        total = minMark;
                    }
                } else {
                    v2 = apiValue;
                }
                v1 = v1 != '-' ? parseFloat(v1.toFixed(2)) : '-';
                v2 = v2 != '-' ? parseFloat(v2.toFixed(2)) : '-';

                let v1Style = {};
                let v2Style = {};
                if (v1 == '-' || v2 == '-') {
                    v1Style = {
                        borderColor: 'transparent',
                        borderRadius: 100,
                    };
                    v2Style = v1Style;
                } else {
                    v1Style = {
                        borderColor: 'transparent',
                        borderRadius: [0, 100, 100, 0],
                    };
                    v2Style = {
                        borderColor: 'transparent',
                        borderRadius: [100, 0, 0, 100],
                    };
                }

                valArr1[1][index] = { value: v1, itemStyle: v1Style };
                valArr2[1][index] = { value: v2, itemStyle: v2Style };
            }
        }

        categoryNames.push(category);
        totalArr.push(total);
    }

    const o: any = {
        grid: {
            right: 30,
            bottom: 0,
            left: 0,
            top: 0,
            containLabel: true,
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
            },
            formatter: function (params: any) {
                const item = apiData[apiData.length - 1 - params[0].dataIndex];
                const { category, val, unitName } = trDataDeconstruction(item, trConfig);
                const marker = val > 0 ? params[1].marker : params[2].marker;
                return marker + category + `<b>  ${val}</b> ` + unitName;
            },
        },
        legend: {
            show: false,
            type: 'scroll',
        },
        xAxis: {
            name: unitNameStr,
            axisLine: {
                show: true,
            },
            splitLine: {
                show: true,
            },
            axisTick: {
                show: false,
            },
            splitArea: {
                show: false,
            },
            type: 'value',
        },
        yAxis: {
            type: 'category',
            data: categoryNames.reverse(),
            axisLine: {
                show: true,
            },
            splitLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            splitArea: {
                show: false,
            },
        },
        series: [
            {
                name: 'Placeholder',
                type: 'bar',
                stack: 'Total',
                silent: true,
                showBackground: true,
                itemStyle: {
                    borderColor: 'transparent',
                    color: 'transparent',
                },
                emphasis: {
                    itemStyle: {
                        borderColor: 'transparent',
                        color: 'transparent',
                    },
                },
                label: {
                    show: false,
                },
                data: [...totalArr].reverse(),
            },
            {
                name: 'v1',
                type: 'bar',
                stack: 'Total',
                showBackground: false,
                itemStyle: {
                    color: '#71FF5E',
                },
                emphasis: {
                    itemStyle: {
                        color: '#71FF5E',
                    },
                },
                data: valArr1[0].reverse(),
                label: {
                    show: false,
                },
                ...customSeries,
            },
            {
                name: 'v1',
                type: 'bar',
                stack: 'Total',
                showBackground: false,
                itemStyle: {
                    color: '#FF5E60',
                },
                emphasis: {
                    itemStyle: {
                        color: '#FF5E60',
                    },
                },
                data: valArr1[1].reverse(),
                label: {
                    show: false,
                },
                ...customSeries,
            },
            {
                name: 'v2',
                type: 'bar',
                stack: 'Total',
                showBackground: false,
                itemStyle: {
                    color: '#71FF5E',
                },
                emphasis: {
                    itemStyle: {
                        color: '#71FF5E',
                    },
                },
                data: valArr2[0].reverse(),
                label: {
                    show: false,
                },
                ...customSeries,
            },
            {
                name: 'v2',
                type: 'bar',
                stack: 'Total',
                showBackground: false,
                itemStyle: {
                    color: '#FF5E60',
                },
                emphasis: {
                    itemStyle: {
                        color: '#FF5E60',
                    },
                },
                data: valArr2[1].reverse(),
                label: {
                    show: false,
                },
                ...customSeries,
            },
        ],
    };

    if (customOption) {
        return _.defaultsDeep(customOption, o);
    } else {
        return o;
    }
}
