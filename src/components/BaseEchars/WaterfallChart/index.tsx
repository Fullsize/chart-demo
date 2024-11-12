import BaseEchars from '@/components/BaseEchars';
import React from 'react';
import { EChartsOption } from 'echarts';
import { toWaterfallChart } from '@/components/BaseEchars/echartTr';
import { deconstruction } from '@/utils';
import _ from 'lodash';
//  词云自定义配置 https://github.com/ecomfe/echarts-wordcloud?tab=readme-ov-file#usage
interface Props {
    resApi: any;
    style?: React.CSSProperties;
    options?: (o: EChartsOption) => EChartsOption | EChartsOption;
    data_deconstruction?: {
        xAxisName: string;
        value: string;
        unit: string;
    };
}
const Page = (props: Props) => {
    const {
        style = {
            width: '100%',
            height: '100%',
        },
        data_deconstruction = {
            xAxisName: 'index_code_full_cname',
            value: 'val',
            unit: 'unit_name',
        },
    } = props;
    return (
        <BaseEchars
            style={style}
            resApi={props.resApi}
            onRender={(data: any[]) => {
                const currentOption = toWaterfallChart(deconstruction(data, data_deconstruction));
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
