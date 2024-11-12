import BaseEchars from '@/components/BaseEchars';
import React from 'react';
import { EChartsOption } from 'echarts';
import { toDotPlot } from '@/components/BaseEchars/echartTr';
import { deconstruction } from '@/utils';
import _, { isObject } from 'lodash';
import { mapTarget } from '@/utils';
import { IEcharsToolType } from '../EcharsToolsRender';
export interface IDotPlotProps {
    resApi: any;
    style?: React.CSSProperties;
    options?: (o: EChartsOption) => EChartsOption | EChartsOption;
    data_deconstruction?: {
        name: string | string[];
        value: string;
        unit: string;
        type: string;
        xAxisName: string;
    };
    /**虚线标记 */
    specific?:
        | {
              value: number;
              yIndex: 'left' | 'right';
              title?: string;
              name?: string;
          }
        | number
        | undefined;
}

const DotPlot = (props: IDotPlotProps) => {
    const {
        style = {
            width: '100%',
            height: '100%',
        },
        data_deconstruction = {
            name: 'index_code_full_cname',
            value: 'val',
            unit: 'unit_name',
            type: 'type',
            xAxisName: 'time_name',
        },
    } = props;
    return (
        <BaseEchars
            style={style}
            resApi={props.resApi}
            renderer={'svg'}
            trToolsType={IEcharsToolType.DotPlot}
            onRender={(data: any[]) => {
                let datas = deconstruction(data, data_deconstruction);
                datas = datas.map((item) => mapTarget(item, { name: data_deconstruction.name }));
                const currentOption = toDotPlot(
                    datas,
                    isObject(props.specific)
                        ? { ...props.specific, title: props.specific.name ?? props.specific.title }
                        : props.specific,
                );

                return _.merge(
                    currentOption,
                    {},
                    typeof props.options == 'function' ? props.options(currentOption) : props.options,
                    {
                        grid: {
                            bottom: 0,
                        },

                        xAxis: {
                            axisLabel: {
                                interval: 0, // 设置为0，表示显示所有标签
                                rotate: 45, // 设置标签旋转角度
                            },
                        },
                    },
                );
            }}
        ></BaseEchars>
    );
};
DotPlot.displayName = 'DotPlot';
export default DotPlot;
