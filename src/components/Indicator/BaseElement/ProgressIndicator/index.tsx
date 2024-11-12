import React, { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import { F14, F16, F18, IndProgress1, IndProgress2, GrZs3 as GrValUnit2 } from '@/components/Indicator';
import Empty from '@/components/Empty';
import { useEcharsTheme } from '@/components/BaseEchars/EcharsThemeProvider';
import echartscolors from '@/components/BaseEchars/theme/ectThemeFgwColors';
import styles from './index.module.css';
interface Props {
    className?: string;
    style?: React.CSSProperties;
    list: {
        [x: string]: any;
        name: string;
        value: number;
        unit?: string;
    }[];
    colors?: string[];
    progress?: boolean;
    checked?: string[];
    onClick?: (checked: string[]) => void;
}
const ProgressIndicator = (props: Props) => {
    // const theme = useEcharsTheme();
    const theme = {
        color: echartscolors.map((item) => _.dropRight(item)[0]),
    };
    const {
        list = [],
        colors = theme.color ?? [
            '#dc69aa',
            '#07a2a4',
            '#9a7fd1',
            '#588dd5',
            '#f5994e',
            '#c05050',
            '#59678c',
            '#c9ab00',
            '#7eb00a',
            '#6f5553',
        ],
        checked = false,
        progress = true,
        onClick,
    } = props;

    useEffect(() => {
        if (_.isEmpty(list)) {
            return;
        }
        onClick?.(list?.map?.((item) => item.name));
    }, [list]);
    const changeChecked = (data: { name: string; value: number; unit?: string | undefined }) => {
        const arr: string[] = checked || [];
        if (_.indexOf(arr, data.name) > -1) {
            _.remove(arr, (o) => o == data.name);
        } else {
            arr.push(data.name);
        }
        onClick?.(arr);
    };

    const renderItem = useCallback(
        () =>
            list.map((item, i) => {
                const color = colors[i] ? colors[i] : colors[i % colors.length];
                let percent = Math.abs(item.value);
                percent = percent < 20 ? percent + 20 : percent;
                const disabled = !checked ? false : _.indexOf(checked, item.name) == -1;
                const disabledColor = '#999';
                return (
                    <div
                        className={classNames(styles['item'], {
                            [`${styles['mb20']}`]: i !== list.length - 1,
                            [`${styles['item-progress']}`]: progress,
                            [`${styles['disabled']}`]: disabled,
                        })}
                        key={item.name}
                        onClick={() => changeChecked(item)}
                        style={{
                            cursor: props.onClick ? 'pointer' : '',
                        }}
                    >
                        <div
                            style={{
                                width: '100%',
                                paddingRight: 20,
                                boxSizing: 'border-box',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginBottom: 5,
                                    }}
                                >
                                    <div
                                        className={styles['circular']}
                                        style={{
                                            background: disabled ? disabledColor : color,
                                        }}
                                    ></div>
                                    <div style={{ flex: 1 }}>
                                        <F14>
                                            {item.name}
                                            {item?.fullName ?? ''}
                                        </F14>
                                    </div>
                                    <div>
                                        <GrValUnit2
                                            style={{ marginTop: -3 }}
                                            lastCompare={item.value >= 0 ? 'up' : 'down'}
                                            value={item.value}
                                            unit={item.unit}
                                        ></GrValUnit2>
                                    </div>
                                </div>
                                <div style={{ flex: 1, display: 'flex' }}>
                                    <div
                                        className={styles['circular']}
                                        style={{
                                            visibility: 'hidden',
                                        }}
                                    ></div>
                                    {/* {progress && (
                                        <IndProgress2
                                            width={'100%'}
                                            percent={percent}
                                            color={disabled ? disabledColor : color}
                                        />
                                    )} */}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }),
        [checked, list],
    );
    const renderEmpty = () => {
        return <Empty msg="暂无数据" />;
    };
    return (
        <div style={props.style} className={classNames(styles['container'], props.className)}>
            {_.isEmpty(list) ? renderEmpty() : renderItem()}
        </div>
    );
};
export default ProgressIndicator;
