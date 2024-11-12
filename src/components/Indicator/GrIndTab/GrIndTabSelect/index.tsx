/*
 * @Author: sungy
 * @Date: 2023-09-14 11:07:00
 * @LastEditors: sungy
 * @LastEditTime: 2024-06-27 10:15:28
 * @Description: 退出登录
 */

import React, { CSSProperties, useRef, useState } from 'react';
import styles from './index.module.css';
import ReactDOM from 'react-dom';
import { CaretDownOutlined } from '@ant-design/icons';
import { trDataDeconstruction } from '@/components/BaseEchars/echartTr/trDataDeconstruction';
import bgUrl from './bg.png';
import { useScale } from '@/components/layout/ResizeScaleBody';

interface SingleSelectProps {
    data: any[];
    active?: string | number | boolean;
    onChange?: any;
    data_deconstruction?: {
        label: string; // 指标名称
        value: string; // 单位
    };
    style?: CSSProperties;
    children: React.ReactElement;
    dialogStyle?: CSSProperties;
}

const activeStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    background: 'linear-gradient( 124deg, rgba(20,136,170,0.51) 0%, rgba(38,59,75,0) 100%)',
    boxShadow: '0px 10px 20px 0px rgba(38,52,112,0.05)',
    border: '1px solid #fff',
    borderImage: 'linear-gradient(270deg, rgba(255, 255, 255, 0), rgba(90, 142, 169, 1)) 1 1',
    color: '#fff',
};

export function GrIndTabSelect({
    onChange,
    active,
    style,
    data = [],
    data_deconstruction = {
        label: 'label',
        value: 'value',
    },
    children,
    dialogStyle,
}: SingleSelectProps) {
    const scale = useScale();
    const [forcus, setForcus] = useState<any>();

    const ref = useRef<any>();
    const { top = '-100%', left = '-100%', height = 0 } = ref.current?.getBoundingClientRect?.() ?? {};

    return (
        <div
            ref={ref}
            className={styles['nav-select-box']}
            style={{
                ...style,
            }}
        >
            <div
                tabIndex={1}
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 2,
                }}
                onClick={(event) => {
                    event.stopPropagation();
                }}
                onFocus={(event) => {
                    event.stopPropagation();
                    setForcus(true);
                }}
                onBlur={(event) => {
                    event.stopPropagation();
                    setForcus(false);
                }}
            >
                {children}
                <CaretDownOutlined style={{ fontSize: 18 }} rotate={forcus ? 180 : 0} />
            </div>
            {ReactDOM.createPortal(
                forcus ? (
                    <div
                        className={styles['nav-select-list']}
                        style={{
                            backgroundSize: '100% 100%',
                            position: 'absolute',
                            left: left / scale,
                            top: (top + height) / scale,
                            borderRadius: 4,
                            zIndex: 9999,
                            ...dialogStyle,
                        }}
                    >
                        <ul>
                            {data?.map?.((item: any, i: number) => {
                                const { label, value } = trDataDeconstruction(item, data_deconstruction);
                                const isActive = active == value;
                                const selectStyle = isActive ? activeStyle : { color: '#929BAC' };
                                return (
                                    <li
                                        key={'nav-select' + i}
                                        style={{
                                            fontSize: 16,
                                            ...selectStyle,
                                        }}
                                        onMouseDown={(event) => {
                                            event.stopPropagation();
                                            onChange?.(value, item);
                                        }}
                                    >
                                        {label}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ) : (
                    <></>
                ),
                document.body,
            )}
        </div>
    );
}

export const GrIndTabSelect1 = ({ ...props }: SingleSelectProps) => {
    return (
        <GrIndTabSelect
            dialogStyle={{
                backgroundColor: '#29369d',
                backgroundImage: 'none',
            }}
            {...props}
        ></GrIndTabSelect>
    );
};
