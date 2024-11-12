import { EChartsOption } from 'echarts';
import { isEmpty, uniqBy, orderBy, toFinite } from 'lodash';
interface DATA {
    xAxisName: string;
    value: number;
    unit: string;
}
export default function toWaterfallChart(data: DATA[]) {
    let options: EChartsOption = {};
    if (isEmpty(data)) {
        return options;
    }
    data = data.map((item) => ({
        ...item,
        value: Math.abs(toFinite(item.value)),
    }));
    console.log(data);
    const xAxisNames = uniqBy(data, 'xAxisName').map((item) => `${item['xAxisName']}`);
    const showValue = data.map((item) => item.value);
    let total = 0;
    const hValue: any[] = [];

    showValue.map((item, index) => {
        hValue.push(total);
        if (index === 0) {
            total = item;
        }
        total = total - showValue[index + 1];
    });
    console.log(32, hValue);
    options = {
        xAxis: {
            type: 'value',
        },
        yAxis: {
            type: 'category',
            data: xAxisNames,
        },
        series: [
            {
                type: 'bar', // 系列类型
                name: '辅助', // 系列名称, 用于tooltip的显示, legend 的图例筛选
                // 数据堆叠，同个类目轴上系列配置相同的stack值后，后一个系列的值会在前一个系列的值上相加
                stack: 'p',
                // 图形样式
                itemStyle: {
                    color: 'rgba(0,0,0,0)', // 柱条的颜色
                },
                data: hValue, // 系列中的数据内容数组
            },
            {
                type: 'bar', // 系列类型
                name: '运营管理', // 系列名称, 用于tooltip的显示, legend 的图例筛选
                // 数据堆叠，同个类目轴上系列配置相同的stack值后，后一个系列的值会在前一个系列的值上相加
                stack: 'p',

                // 图形的样式
                itemStyle: {
                    color: (val) => {
                        return val.value > 0 ? 'blue' : 'red';
                    },
                },
                // 系列中的数据内容数组
                data: showValue,
            },
        ],
    };
    return options;
}
