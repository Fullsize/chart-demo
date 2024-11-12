import BaseEchars from '@/components/BaseEchars';
import React from 'react';
import { EChartsOption } from 'echarts';
import { toRoseChat } from '@/components/BaseEchars/echartTr';
import { deconstruction } from '@/utils';
import _ from 'lodash';
import { mapTarget } from '@/utils';
export interface IDotPlotProps {
    resApi: any;
    style?: React.CSSProperties;
    options?: (o: EChartsOption) => EChartsOption | EChartsOption;
    data_deconstruction?: {
        name: string | string[];
        value: string;
        unit: string;
        groupName?: string;
    };
}

const RoseChart = (props: IDotPlotProps) => {
    const {
        style = {
            width: '100%',
            height: '100%',
        },
        data_deconstruction = {
            name: 'index_code_full_cname',
            value: 'val',
            unit: 'unit_name',
        },
    } = props;
    return (
        <BaseEchars
            style={style}
            resApi={props.resApi}
            renderer={'svg'}
            onRender={(data: any[]) => {
                let datas = deconstruction(data, data_deconstruction);
                datas = datas.map((item) => mapTarget(item, { name: data_deconstruction.name }));
                const currentOption: any = toRoseChat(datas);
                return _.merge(
                    currentOption,
                    {
                        color: [
                            '#5470c6',
                            '#91cc75',
                            '#fac858',
                            '#ee6666',
                            '#73c0de',
                            '#3ba272',
                            '#fc8452',
                            '#9a60b4',
                            '#ea7ccc',
                        ],
                    },
                    typeof props.options == 'function' ? props.options(currentOption) : props.options,
                );
            }}
        ></BaseEchars>
    );
};
RoseChart.displayName = 'RoseChart';
export default RoseChart;
