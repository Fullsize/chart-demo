import { EChartsOption, color } from 'echarts';
import _, { isArray } from 'lodash';
export default function toDotPlot(
    data: {
        name: string;
        value: number;
        unit: string;
        type: string;
        xAxisName: string;
    }[],
    specific?:
        | {
              value: number;
              yIndex: 'left' | 'right';
              title?: string;
          }
        | number
        | undefined,
): EChartsOption {
    let options: EChartsOption = {};
    if (_.isEmpty(data)) {
        return options;
    }
    // x 轴数据
    const xAxisNames = _.uniqBy(data, 'xAxisName').map((item) => `${item['xAxisName']}`);
    // 数据分类
    const names = _.uniqBy(data, 'name');

    // echart 类型
    const types = _.uniqBy(data, 'type').map((item, i) => ({
        ...item,
        yIndex: i,
    }));
    let defaultUnit = null; //hardcode

    const units = _.uniqBy(
        _.uniqBy(data, 'name')
            .map((item, i) => ({
                ...item,
                yIndex: i,
            }))
            .filter((item) => item['unit']),
        'unit',
    );

    // y 轴设置
    const yAxis = !_.isEmpty(units)
        ? units.map((item) => ({
              type: 'value',
              name: item.unit === '-' ? '' : item.unit,
              scale: true,
              alignTicks: true,
              axisLine: {
                  show: true,
                  lineStyle: {
                      show: true,
                  },
              },
              axisLabel: {
                  formatter: function (value: any) {
                      const valueStr = value.toString();
                      const decimalIndex = valueStr.indexOf('.');
                      if (decimalIndex === -1 || (decimalIndex !== -1 && valueStr.length - decimalIndex - 1 <= 2)) {
                          return value.toLocaleString();
                      } else {
                          return parseFloat(valueStr).toFixed(1);
                      }
                  },
              },
              splitLine: {
                  show: true,
                  lineStyle: {
                      show: true,
                      type: 'dashed',
                  },
              },
          }))
        : {};

    const series = names.map((item) => {
        const currentType = _.find(types, ['type', item.type]);

        const json: any = {
            name: item['name'],
            type: item.type === 'line' ? 'scatter' : (item.type ?? 'bar'),
            yAxisIndex: currentType?.yIndex,
            data: _.filter(data, ['name', item.name]).map((a) => ({
                name: a['name'],
                value: ['' + a['xAxisName'], a['value']],
                unit: a['unit'],
            })),
            unitName: item.unit,
        };
        defaultUnit = item.unit;
        return json;
    });
    let mean: any = 0;
    mean = _.round(_.mean(data.filter((item) => item.type != 'bar').map((item) => Number(item.value))));
    const yAxisIndex = {
        left: 0,
        right: 1,
    };
    if (specific) {
        series.push({
            name: _.isObject(specific) ? (specific?.title ? specific?.title : '') : '',
            type: 'line',
            // showAllSymbol: true,
            symbol: 'none',
            tooltip: {
                show: false,
            },
            lineStyle: {
                color: 'red',
            },
            itemjStyle: {
                color: 'red',
            },
            legend: {
                show: true,
                itemWidth: 0,
                itemStyle: {
                    color: '',
                },
            },
            yAxisIndex: _.isObject(specific)
                ? isArray(yAxis) && yAxis.length > 1
                    ? yAxisIndex[specific.yIndex]
                    : 0
                : 0,
            data: xAxisNames.map(() => (_.isObject(specific) ? specific.value : specific) ?? null),
            markLine: {
                label: {
                    position: 'insideEndTop',
                    color: 'red',
                    // formatter: _.isObject(specific) ? (specific?.title ? specific?.title : '{c}') : '{c}',
                },
                data: [
                    {
                        type: 'average',
                        name: '平均值',
                        lineStyle: {
                            width: 3,
                            color: 'red',
                        },
                    },
                ],
            },
            unitName: defaultUnit,
        });
    }
    options = {
        xAxis: {
            type: 'category',
            data: xAxisNames,
        },
        legend: {
            show: true,
            type: 'scroll',
        },

        yAxis,
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
            },
            confine: true,
            formatter: function (params: any) {
                let toolTip = '';
                if (params !== null && params.length) {
                    params.map((item: any) => {
                        toolTip += `${item.marker} ${item.seriesName} : 
                <span style="font-weight:bold"> ${item.value[1] ?? '--'}</span>     
                ${item.data.unit}<br/>`;
                        return item;
                    });
                    return `${params[0].axisValue}<br/>${toolTip}`;
                }
                return toolTip;
            },
        },

        series,
    };

    return options;
}
