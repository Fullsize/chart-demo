/**
 * The base pieChart component is responsible only for rendering the chart, without handling data processing.
 * @param props
 * @returns
 */

import BaseEchars from './../BaseEchars';
import _ from 'lodash';
import { useEffect, useState } from 'react';

interface BasePieChartProps {
    backgroundImgUrl?: string; //base chart背景图 可以根据自定义调节
    backgroundImgStyle?: any; //css properties
    data: {
        name: string;
        value: number;
        unit?: string;
        dataIndex?: number;
        fullName?: string;
        [key: string]: any; //其他值
    }[];
    options?: any; //自定义option对于饼图的
    [key: string]: any; //其他值

}

const BasePieChart = (props: BasePieChartProps) => {
    const { data } = props;
    const [option, setOption] = useState<any>();
    useEffect(() => {
        const option = {
            tooltip: {
                trigger: 'item',
                confine: true,
                formatter: function (params: any) {
                    // 自定义 tooltip 的显示内容
                    return (
                        params?.data?.time_name +
                        `<br />` +
                        params.marker +
                        params.name +
                        (params.data.fullName ?? '') +
                        ': ' +
                        params.value +
                        params.data.unit
                    );
                },
            },
            legend: {
                show: false,
                top: '5%',
                left: 'center',
                // selected,
            },
            series: [
                {
                    type: 'pie',
                    center: ['30%', '50%'],
                    radius: ['60%', '70%'],
                    legendHoverLink: false,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                        },
                    },
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center',
                    },
    
                    labelLine: {
                        show: false,
                    },
                    data,
                },
            ],
        }
        setOption(option);
    }, [data]);
    return <BaseEchars setChart={props?.setEchartObj} option={_.merge(option, props.options)} renderer={'svg'}></BaseEchars>;
};

export default BasePieChart;
