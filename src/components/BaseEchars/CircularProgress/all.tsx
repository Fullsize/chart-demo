import React, { useEffect, useMemo, useState, useCallback } from 'react';
import _ from 'lodash';
import BaseEchars from '@/components/BaseEchars';
import { F16 as F18, GrValUnit } from '@/components/Indicator';
import { useSetState, useInterval, useBoolean } from 'react-use';
import classNames from 'classnames';
import Bg from './images/bg1.png';
import styles from './index.module.css';
interface Props {
    data: {
        name: string;
        value: number;
        unit?: string;
        groupName: string;
        fullName?: string;
        dataIndex?: number;
    }[];
    abs?: boolean;
    checked?: string[];
    options?: any;
}
// let currentIndex = -1;
const CircularProgress = (props: Props) => {
    const { data = [], checked = false } = props;
    const [isRunning, toggleIsRunning] = useBoolean(true);
    const [echartObj, setEchartObj] = useState<any>(null);
    const [state, setState] = useSetState({
        option: {},
        label: {
            name: '',
            value: '',
            unit: '%',
        },
    });
    const [currentIndex, setCurrentIndex] = useState(-1); // 使用useState替代全局变量
    const option = useMemo(() => state.option, [state.option, state.label]);
    const setLabel = useCallback(
        (data: any, abs: any) => {
            if (_.isEmpty(data)) return;
            if (_.indexOf(hides, data?.name) > -1) {
                if (data?.name === state.label.name) {
                    setState({
                        label: {
                            name: '',
                            value: '',
                            unit: '',
                        },
                    });
                }
                return;
            }
            setState({
                label: {
                    name: data?.name,
                    value: abs ? data?.value : data?.percent,
                    unit: abs ? data?.unit : '%',
                },
            });
        },
        [props.abs, setState, state.label],
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
                    width: '46%', // 图片宽度
                    height: '46%', // 图片高度
                    opacity: 1, // 图片透明度
                    x: '7%',
                    y: '26%',
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
                    return `${a?.name}  ${a?.value || ''}${a?.unit}  `;
                },
                // selected,
            },
            series: [
                {
                    name: data?.[0]?.groupName ?? '',
                    type: 'pie',
                    center: ['30%', '50%'],
                    radius: ['60%', '70%'],
                    legendHoverLink: false,
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center',
                        formatter: (params: any) => {
                            if (_.isEmpty(label)) {
                                setLabel(params.data, props.abs);
                            }

                            return '';
                        },
                    },

                    labelLine: {
                        show: false,
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
                    setCurrentIndex(params.dataIndex);
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
    }, [echartObj, currentIndex]);
    useInterval(
        () => {
            const newData = data;
            const dataLen = newData.length;

            echartObj.dispatchAction({
                type: 'downplay',
                seriesIndex: 0,
                dataIndex: currentIndex,
            });

            const nextIndex = (currentIndex + 1) % dataLen;
            setCurrentIndex(nextIndex); // 更新currentIndex

            echartObj.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: newData[nextIndex]?.dataIndex ?? -1,
                data: data[nextIndex],
            });
        },
        isRunning ? 3000 : null,
    );
    const [hides, setHides] = useState<string[]>([]);
    useEffect(() => {
        if (echartObj) {
            echartObj.on('legendselectchanged', function (params: any) {
                // 获取被点击的图例名称
                const selectedLegend: string = params.name;
                let arr = hides;
                // 获取所有图例的状态（选中或未选中）
                const selected = params.selected;
                if (!selected[selectedLegend]) {
                    arr.push(selectedLegend);
                } else {
                    arr = _.remove(arr, (n) => n === selectedLegend);
                }
                setHides(arr);
            });
        }
    }, [echartObj, hides]);
    return (
        <div className={classNames(styles['container'], styles['all'])}>
            <BaseEchars setChart={setEchartObj} option={_.merge(option, props.options)} renderer={'svg'}></BaseEchars>
            <div className={styles['info']} style={{ top: props.options?.series?.[0]?.center?.[1],maxWidth: '11%' } }>
                <GrValUnit value={state.label.value} unit={state.label.unit}></GrValUnit>
                <F18 whiteSpace={'preWrap'} textAlign={'center'}>
                    {state.label.name}
                </F18>
            </div>
        </div>
    );
};
export default CircularProgress;
