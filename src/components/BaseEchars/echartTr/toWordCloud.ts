import { EChartsOption } from 'echarts';
import { isEmpty } from 'lodash';
export interface DATA {
    name: string;
    value: number;
    unit: string;
}
export default function toWordCloud(
    data: DATA[],
    colors: string[] = [
        '#dc69aa',
        '#07a2a4',
        '#9a7fd1',
        '#588dd5',
        '#f5994e',
        '#c05050',
        '#59678c',
        '#c9ab00',
        '#7eb00a',
        '#6f5553',
    ],
) {
    let options: EChartsOption = {};
    if (isEmpty(data)) {
        return options;
    }
    const series: any[] = [
        {
            type: 'wordCloud',
            textStyle: {
                fontWeight: 600,
                color: function () {
                    return colors[parseInt((Math.random() * (colors.length - 1)).toString())];
                },
            },
            width: '100%',
            height: '100%',
            gridSize: 1,
            rotationRange: [0, 0],
            emphasis: {
                focus: 'none',
            },
            data,
        },
    ];
    options = {
        tooltip: {
            show: true,
            formatter: function (params: any) {
                return params.name + '<br/>' + params.marker + params.data.value + (params.data.unit || '');
            },
        },
        xAxis: {
            show: false,
        },
        yAxis: {
            show: false,
        },

        series,
    };
    return options;
}
