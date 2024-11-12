import React, { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import { F14, IndProgress2, GrValUnit2, GrValUnit6, GrValUnit7, Flr } from '@/components/Indicator';
import Empty from '@/components/Empty';
import { useEcharsTheme } from '@/components/BaseEchars/EcharsThemeProvider';
import styles from './index.module.css';

interface IProcessConfig {
    showProgress?: boolean;
    showCompare?: boolean;
    progressKey: string;
}
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
    config?: {};
}
const ProgressIndicator = (props: Props) => {
    const theme = useEcharsTheme();
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
                // let percent = Math.abs(item.zb_val);
                // const disabled = false;
                // const disabledColor = '#999';
                return (
                    <div
                        key={item.name}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '10px 0',
                        }}
                    >
                        <div style={{ flex: 2, display: 'flex', alignItems: 'center' }}>
                            <span
                                style={{
                                    display: 'inline-block',
                                    width: 16,
                                    height: 8,
                                    backgroundColor: color,
                                    marginRight: 8,
                                    borderRadius: 2, // 矩形样式
                                }}
                            />
                            {item.name}
                        </div>
                        <div style={{ flex: 1, textAlign: 'center' }}>
                            <GrValUnit7 value={item.value} style={{ 'justify-content': 'center' }}></GrValUnit7>
                        </div>
                        <div style={{ flex: 1, textAlign: 'center' }}>
                            <GrValUnit7 value={item.zb_val} style={{ 'justify-content': 'center' }}></GrValUnit7>
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
        <div className={classNames(styles['container2'], props.className)}>
            <div
                style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                overflowY: 'auto',        
                }}
            >
            <div style={{ display: 'flex', paddingBottom: '10px', justifyContent: "cetner" }}>
                <div style={{ flex: 2 }}>指标名称</div>
                <div style={{ flex: 1, textAlign: 'center' }}>当期值{`(${list?.[0]?.unit || ""} )`}</div>
                <div style={{ flex: 1, textAlign: 'center' }}>比重{`(${list?.[0]?.unit_name1 || ""})`}</div>
            </div>
            {_.isEmpty(list) ? renderEmpty() : renderItem()}
            </div>
        </div>
    );
};
export default ProgressIndicator;
