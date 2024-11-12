import _ from 'lodash';
import { trDataDeconstruction } from './trDataDeconstruction';

const defaultPieConfig = {
    category: 'index_code_full_cname',
    unitName: 'unit_name',
    val: 'val',
    fixed: 2,
};

const linearColor = {
    type: 'linear',
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [
        {
            offset: 0,
            color: '#ffffff00',
        },
        {
            offset: 0.4,
            color: 'rgba(216, 240, 255, 0.5)',
        },
        {
            offset: 0.5,
            color: 'rgba(216, 240, 255, 1)',
        },
        {
            offset: 0.6,
            color: 'rgba(216, 240, 255, 0.5)',
        },
        {
            offset: 1,
            color: '#ffffff00',
        },
    ],
    global: false,
};

export function trToEcharsPie(apiData: Array<any>, config: any = {}, custonOption?: any) {
    if (!(Array.isArray(apiData) && apiData?.length > 0)) {
        return;
    }
    const trConfig = _.defaultsDeep(config, defaultPieConfig);
    const seriesData: any = [];
    let unit: any;

    const categoryMark: any = {};
    const legendData: any = [];
    apiData?.map?.((item: any, i: any) => {
        const { category, val, unitName } = trDataDeconstruction(item, trConfig);

        if (unit === undefined) {
            unit = unitName;
        }
        let series;
        const value = parseFloat(val);
        if (categoryMark[category]) {
            series = categoryMark[category];
            const num = parseFloat(series.value) + value;
            series.value = num;
        } else {
            series = {
                value: value,
                name: category,
                selected: i === 0 ? true : false,
            };
            legendData.push(category);
            categoryMark[category] = series;
            category && seriesData.push(series);
        }
    });

    const fixed = trConfig['fixed'] ?? 2;
    if (fixed > 0) {
        seriesData?.map((item: any) => {
            const val = parseFloat(item.value).toFixed(fixed);
            item.value = val;
        });
    }

    const center = custonOption?.series?.[0]?.center || ['30%', '50%'];

    const legend = custonOption?.legend || {
        type: 'scroll',
        orient: 'vertical',
        icon: 'circle',
        right: '5%',
        top: 'center',
        align: 'left',
    };

    const radiusArr =
        legend?.orient == 'vertical'
            ? [
                ['45%', '70%'],
                ['45%', '60%'],
                ['85%', '85%'],
                ['38%', '38%'],
            ]
            : [
                ['35%', '60%'],
                ['35%', '50%'],
                ['75%', '75%'],
                ['28%', '28%'],
            ];

    const o: any = {
        grid: {},
        tooltip: {
            formatter: function (params: any) {
                return `${params.marker} ${params.name} :  <span style="font-weight:bold"> ${
                    params.value ?? '--'
                }</span>${unit ?? ''}<br/>`;
            },
        },
        legend: {
            ...legend,
            data: legendData,
        },
        series: [
            {
                type: 'pie',
                selectedOffset: 8,
                label: {
                    show: false,
                    position: 'center',
                },
                itemStyle: {
                    borderRadius: 2,
                    borderWidth: 0,
                },
                emphasis: {
                    label: {
                        show: true,
                        formatter: '{d}%',
                    },
                    scaleSize: 5,
                },
                select: {
                    label: {
                        show: false,
                        formatter: '{d}%',
                    },
                },
                center: center,
                radius: radiusArr[0],
                selectedMode: false,
                data: seriesData,
            },
            {
                radius: radiusArr[1],
                center: center,
                hoverAnimation: false,
                type: 'pie',
                label: {
                    normal: {
                        show: false,
                    },
                    emphasis: {
                        show: false,
                    },
                },
                labelLine: {
                    normal: {
                        show: false,
                    },
                    emphasis: {
                        show: false,
                    },
                },
                animation: false,
                tooltip: {
                    show: false,
                },
                data: [
                    {
                        value: 1,
                        itemStyle: {
                            color: 'rgba(250,250,250,0.4)',
                        },
                    },
                ],
            },
            {
                name: '',
                type: 'pie',
                clockWise: false,
                hoverAnimation: false,
                center: center,
                radius: radiusArr[2],
                label: {
                    normal: {
                        show: false,
                    },
                },
                animation: false,
                tooltip: {
                    show: false,
                },
                data: [
                    {
                        value: 1,
                        name: '',
                        itemStyle: {
                            normal: {
                                borderWidth: 2,
                                borderType: [10, 20],
                                borderDashOffset: 10,
                                borderColor: linearColor,
                            },
                        },
                    },
                    {
                        value: 1,
                        name: '',
                        itemStyle: {
                            normal: {
                                borderWidth: 2,
                                borderType: [10, 20],
                                borderDashOffset: 10,
                                borderColor: linearColor,
                            },
                        },
                    },
                ],
            },
            {
                name: '',
                type: 'pie',
                clockWise: false,
                hoverAnimation: false,
                center: center,
                radius: radiusArr[3],
                startAngle: 135,
                label: {
                    normal: {
                        show: false,
                    },
                },
                animation: false,
                tooltip: {
                    show: false,
                },
                data: [
                    {
                        value: 1,
                        name: '',
                        itemStyle: {
                            normal: {
                                borderWidth: 2,
                                borderType: 'solid',
                                borderColor: {
                                    ...linearColor,
                                    x2: 1,
                                    y2: 1,
                                },
                            },
                        },
                    },
                    {
                        value: 1,
                        name: '',
                        itemStyle: {
                            normal: {
                                borderWidth: 2,
                                borderType: 'solid',
                                borderColor: {
                                    ...linearColor,
                                    x2: 1,
                                    y2: 1,
                                },
                            },
                        },
                    },
                ],
            },
        ],
    };

    if (custonOption) {
        return _.defaultsDeep(custonOption, o);
    } else {
        return o;
    }
}
