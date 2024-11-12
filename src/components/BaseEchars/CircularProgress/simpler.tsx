import React, { useEffect, useMemo, useState, useCallback } from 'react';
import _ from 'lodash';
import BaseEchars from '@/components/BaseEchars';
import { F18, GrValUnit } from '@/components/Indicator';
import { useSetState, useInterval, useBoolean } from 'react-use';
import classNames from 'classnames';
import Bg from './images/sim_bg.png';

import styles from './index.module.css';
interface Props {
    data: {
        name: string;
        value: number;
        unit?: string;
        groupName: string;
        fullName?: string;
    }[];
    abs?: boolean;
    checked?: string[];
    options?: any;
}
let currentIndex = -1;
const CircularProgress = (props: Props) => {
    const { data = [], checked = false } = props;
    const [echartObj, setEchartObj] = useState<any>(null);
    const [isRunning, toggleIsRunning] = useBoolean(true);
    const [state, setState] = useSetState({
        option: {},
        label: {
            name: '',
            value: '',
            unit: '%',
        },
    });
    const option = useMemo(() => state.option, [state.option, state.label]);
    const setLabel = useCallback(
        (data: any, abs: any) => {
            setState({
                label: {
                    name: data.name,
                    value: abs ? data.value : data.percent,
                    unit: abs ? data.unit : '%',
                },
            });
        },
        [props.abs, setState],
    );
    useEffect(() => {
        if (_.isEmpty(data)) {
            return;
        }
        // let option;
        let label: any = {};
        const selected: any = {};
        data.map((item) => {
            selected[item.name] = true;
        });
        const setSelected = () => {
            if (Array.isArray(checked)) {
                for (const i in selected) {
                    if (_.find(checked, (o: string) => o == i)) {
                        selected[i] = true;
                    } else {
                        selected[i] = false;
                    }
                }
            }
        };
        if (checked !== false) {
            setSelected();
        }
        setState({
            label: {
                name: '',
                value: '',
                unit: '',
            },
        });

        const option = {
            graphic: {
                type: 'image',
                id: 'background',
                left: 0,
                top: 0,
                z: -10,
                bounding: 'raw',
                origin: [0, 0],
                style: {
                    image: Bg, // 替换为你的图片 URL
                    width: '90%', // 图片宽度
                    height: '90%', // 图片高度
                    opacity: 1, // 图片透明度
                    x: '3%',
                    y: '3%',
                },
            },
            tooltip: {
                trigger: 'item',
                confine: true,
                formatter: function (params: any) {
                    // 自定义 tooltip 的显示内容
                    return (
                        params.seriesName +
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
                show: true,
                type: 'scroll',
                orient: 'vertical',
                icon: 'circle',
                left: '50%',
                top: 'center',
                align: 'left',
                formatter: function (name: any) {
                    const a = _.find(data, { name });
                    return name;
                },
                // selected,
            },
            series: [
                {
                    name: data?.[0]?.groupName ?? '',
                    type: 'pie',
                    center: ['50%', '50%'],
                    radius: ['40%', '68%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center',
                        formatter: (params: any) => {
                            if (_.isEmpty(label)) {
                                label = {
                                    name: params.name,
                                    value: props.abs ? params.value : params.percent,
                                    unit: props.abs ? params.data.unit : '%',
                                };
                                setState({
                                    label,
                                });
                            }

                            return '';
                        },
                    },

                    labelLine: {
                        show: false,
                    },
                    data,
                },
                {
                    name: '最外层',
                    type: 'pie',
                    center: ['50%', '50%'],
                    radius: ['73%', '75%'],
                    avoidLabelOverlap: false,

                    legendHoverLink: false,
                    tooltip: {
                        show: false,
                    },
                    label: {
                        show: false,
                    },
                    emphasis: { disabled: true },
                    itemStyle: {
                        color: 'rgba(0, 255, 255, 1)',
                    },
                    data,
                },
            ],
        };
        setState({ option });
    }, [data, checked]);
    useEffect(() => {
        if (echartObj) {
            echartObj.on('mouseover', (params: any) => {
                if (currentIndex !== params.dataIndex) {
                    echartObj.dispatchAction({
                        type: 'downplay',
                        seriesIndex: 0,
                        dataIndex: currentIndex,
                    });
                    currentIndex = params.dataIndex;
                }

                toggleIsRunning(false);
                setLabel(params.data, props.abs);
            });
            echartObj.on('mouseout', () => {
                toggleIsRunning(true);
            });
            echartObj.on('highlight', (params: any) => {
                setLabel(params.data, props.abs);
            });
        }
    }, [echartObj]);

    return (
        <div className={classNames(styles['container'], styles['all'])}>
            <BaseEchars
                setChart={setEchartObj}
                option={_.defaultsDeep(props.options, option)}
                renderer={'svg'}
            ></BaseEchars>
        </div>
    );
};
export default CircularProgress;
