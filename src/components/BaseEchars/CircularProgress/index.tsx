import React, { useCallback, useEffect, useMemo, useState } from 'react';
import _ from 'lodash';
import BaseEchars from '@/components/BaseEchars';
import { F16, GrValUnit, GrValUnit2, Flr } from '@/components/Indicator';
import { useSetState, useInterval, useBoolean } from 'react-use';
import All from './all';
import AllType from './allType';
import Simpler from './simpler';
import Bg from './images/bg1.png';
import styles from './index.module.css';

export interface Props {
    data: {
        name: string;
        value: number;
        unit?: string;
        groupName: string;
        percent?: number;
        dataIndex?: number;
    }[];
    abs?: boolean;
    checked?: string[];
    options?: any;
}

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
            setState({
                label: {
                    name: data?.name,
                    value: abs ? data?.value : data?.percent,
                    unit: abs ? data?.unit : '%',
                },
            });
        },
        [props.abs, setState],
    );

    useEffect(() => {
        if (_.isEmpty(data)) {
            return;
        }
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
                    width: '85%', // 图片宽度
                    height: '85%', // 图片高度
                    opacity: 1, // 图片透明度
                    x: '8%',
                    y: '5%',
                },
            },
            tooltip: {
                trigger: 'item',
                confine: true,
                formatter: function (params: any) {
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
                show: false,
                top: '5%',
                left: 'center',
                selected,
            },
            series: [
                {
                    name: data?.[0]?.groupName ?? '',
                    type: 'pie',
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
        setState({ option: _.merge(option, {}, props.options) });
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
                    setCurrentIndex(params.dataIndex); // 更新currentIndex
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
            const newData = data.filter((item) => _.indexOf(props.checked, item.name) > -1);
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
    useEffect(() => {
        console.log(203, checked);
    }, [checked]);
    return (
        <div className={styles['container']}>
            <BaseEchars
                setChart={setEchartObj}
                option={_.merge(option, {}, props.options)}
                renderer={'svg'}
            ></BaseEchars>
            <div className={styles['info']}>
                <F16 color="#ADC0D3">{state.label.name}</F16>
                <Flr>
                    {!props.abs && (
                        <span
                            style={{
                                display: 'flex',
                                alignItems: 'baseline',
                                marginRight: 10,
                            }}
                        >
                            占比
                        </span>
                    )}

                    {state.label.unit === '%' || state.label.unit === '' ? (
                        <GrValUnit value={state.label.value} unit={state.label.unit}></GrValUnit>
                    ) : (
                        <GrValUnit2 value={state.label.value} unit={state.label.unit}></GrValUnit2>
                    )}
                </Flr>
            </div>
        </div>
    );
};

CircularProgress.all = All;
CircularProgress.allTye = AllType;
CircularProgress.simpler = Simpler;
export default CircularProgress;
