import BaseEchars from '@/components/BaseEchars';
import React from 'react';
import { EChartsOption } from 'echarts';
import { toBarLine } from '@/components/BaseEchars/echartTr';
import { deconstruction } from '@/utils';
import _ from 'lodash';
import { mapTarget } from '@/utils';
interface Props {
    resApi: any;
    style?: React.CSSProperties;
    options?: (o: EChartsOption) => EChartsOption | EChartsOption;
    data_deconstruction?: {
        name?: string;
        value?: string;
        unit?: string;
        type?: string;
        xAxisName?: string;
        measure?: string;
        category?: string;
    };
}
const defaultData_deconstruction = {
    name: 'index_code_full_cname',
    value: 'val',
    unit: 'unit_name',
    type: 'type',
    xAxisName: 'time_name',
    category: 'time_name',
    measure: 'index_code_full_cname',
};
const Page = (props: Props) => {
    const {
        style = {
            width: '100%',
            height: '100%',
        },
        data_deconstruction = defaultData_deconstruction,
    } = props;
    const data_deconstructions = _.merge(defaultData_deconstruction, data_deconstruction);

    return (
        <BaseEchars
            style={style}
            resApi={props.resApi}
            onRender={(data: any[]) => {
                let datas = deconstruction(data, data_deconstructions);
                datas = datas.map((item) => mapTarget(item, { name: data_deconstructions.name ?? '' }));
                const currentOption = toBarLine(deconstruction(data, data_deconstructions));
                return _.merge(
                    currentOption,
                    {
                        grid: {
                            right: 0,
                            bottom: 0,
                            left: 0,
                            top: 35,
                            containLabel: true,
                        },
                    },
                    typeof props.options == 'function' ? props.options(currentOption) : props.options,
                );
            }}
        ></BaseEchars>
    );
};
export default Page;
