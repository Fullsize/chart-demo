import BaseEchars from '@/components/BaseEchars';
import React from 'react';
import { EChartsOption } from 'echarts';
import { toStackedBar } from '@/components/BaseEchars/echartTr';
import { deconstruction } from '@/utils';
import _ from 'lodash';
interface Props {
    resApi: any;
    style?: React.CSSProperties;
    options?: (o: EChartsOption) => EChartsOption | EChartsOption;
    data_deconstruction?: {
        name: string;
        value: number;
        unit: string;
        type: string;
        xAxisName: string;
        stackedName: string;
    };
}
const StackedBar = (props: Props) => {
    const {
        style = {
            width: '100%',
            height: '100%',
        },
        data_deconstruction = {
            name: 'region_name',
            value: 'val',
            unit: 'unit_name',
            type: 'type',
            xAxisName: 'time_name',
            stackedName: 'group_name',
        },
    } = props;
    return (
        <BaseEchars
            style={style}
            resApi={props.resApi}
            onRender={(data: any[]) => {
                const currentOption: any = toStackedBar(deconstruction(data, data_deconstruction));
                const series: any = currentOption?.series;
                return _.merge(
                    currentOption,
                    {
                        grid: {
                            right: 0,
                            bottom: 0,
                            left: 10,
                            top: 55,
                            containLabel: true,
                        },
                        series: series?.map((item: any) => {
                            return {
                                label: {
                                    show: false,
                                },
                                ...item,
                                // label: {
                                //     show: false,
                                // },
                                data: item.data.map((a: any) => ({
                                    ...a,
                                    itemStyle: {
                                        borderRadius: [
                                            // i == 0 ? 100 : 0,
                                            // i == 0 ? 100 : 0,
                                            0, 0, 0, 0,
                                        ],
                                    },
                                })),
                            };
                        }),
                    },
                    typeof props.options == 'function' ? props.options(currentOption) : props.options,
                );
            }}
        ></BaseEchars>
    );
};
export default StackedBar;
