import _ from 'lodash';
interface Props {
    data: {
        name: string;
        value: number;
        unit?: string;
        groupName?: string;
    }[];
}
export default function toRoseChat(data: Props['data']) {
    data = _.orderBy(data, ['val'], ['asc']);
    const category = _.uniqBy(data, 'name').map((item) => item['name']);

    const option = {
        tooltip: {
            trigger: 'item',
            confine: true,
            formatter: function (params: any) {
                // 自定义 tooltip 的显示内容
                return (
                    params.seriesName + `<br />` + params.marker + params.name + ': ' + params.value + params.data.unit
                );
            },
        },
        angleAxis: {
            startAngle: 0,
            type: 'category',
            data: category,
            z: 1,

            clockwise: false,
            // boundaryGap: ['30%'],
            axisLabel: {
                color: '#FFF',
            },
            //startAngle:45,//倾斜度
            axisLine: {
                lineStyle: {
                    color: '#324fba',
                },
            },

            axisTick: {
                show: false,
            },
            splitLine: {
                // show:false,
                interval: 0,
            },
        },
        radiusAxis: {
            splitLine: {
                lineStyle: {
                    color: '#324fba',
                },
            },
            axisLabel: {
                show: false,
                // todo: 颜色需要修改
                color: '#FFF',
            },
        },
        polar: {
            center: ['50%', '50%'],
            radius: ['15%', '80%'],
        },
        grid: {
            left: '20',
            right: '20',
            containLabel: true,
        },
        series: [
            {
                type: 'bar',
                label: {
                    show: false,
                },
                data: data.map((item) => ({
                    ...item,
                })),
                barWidth: '90%',
                coordinateSystem: 'polar',
                name: data?.[0].groupName,
                colorBy: 'data',
                itemStyle: null,
            },
        ],
    };
    return option;
}
