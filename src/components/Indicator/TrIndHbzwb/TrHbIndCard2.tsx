import React from 'react';
import { CSSProperties } from 'styled-components';

import bottom from '@images/msfw/botton_n.png';
import bottomActive from '@images/msfw/botton_h.png';
import { F12, F14, F16, F18, F30, F32B, Flc, Flr } from '@/components/Indicator';
import { IndCssLgText4 } from '@/components/Indicator';

export interface TrIndYqInfoProps {
    apiData?: Array<any>;
    style?: CSSProperties;
    cardStyle?: CSSProperties;
}

export const TrIndYqInfo = ({ apiData, style, cardStyle }: TrIndYqInfoProps) => {
    return (
        <Flc gap={20} overflow="hidden" {...style}>
            {apiData?.map((item: any, i: number) => {
                const { index_code_full_cname, val, unit_name } = item;
                return (
                    <Flr key={i} alignItems="center" justifyContent="space-between" padding={20} {...cardStyle}>
                        <F18> {index_code_full_cname} </F18>
                        <Flr alignItems="flex-end" justifyContent="flex-start">
                            <F30 color="#fbfa30">{val}</F30>
                            <F14 marginLeft={10}> {unit_name}</F14>
                        </Flr>
                    </Flr>
                );
            })}
        </Flc>
    );
};

// 民生服务-重点人群检测指标卡
interface TrIndCardMsfw1Props {
    data: any[];
    active?: number | string;
    data_deconstruction?: {
        name: string;
        value: string;
        unit: string;
        time?: string;
        key?: string;
    };
    onItemClick?: (item: any) => void;
    itemIcon?: (item: any) => any;
    style?: CSSProperties;
    itemStyle?: CSSProperties;
}
export const TrIndCardMsfw1 = (props: TrIndCardMsfw1Props) => {
    const {
        data,
        active,
        data_deconstruction = {
            name: 'index_code_full_cname',
            value: 'val',
            unit: 'unit_name',
            time: 'time_name',
            key: 'order',
        },
        onItemClick,
        itemIcon,
        style,
        itemStyle,
    } = props;

    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                gap: 10,
                ...style,
            }}
        >
            {data?.map?.((item: any, index: number) => {
                return (
                    <div
                        key={index}
                        style={{
                            display: 'flex',
                            width: '100%',
                            alignItems: 'center',
                            height: 96,
                            cursor: 'pointer',
                            background: 'linear-gradient(90deg, rgba(37,75,128,0.25) 0%, rgba(37,75,128,0.1) 100%)',
                            border: '1px solid',
                            borderImage: 'linear-gradient(90deg, rgba(24, 64, 110, 1), rgba(24, 64, 110, 0)) 1 1',
                            ...itemStyle,
                        }}
                        onClick={() => {
                            onItemClick?.(item);
                        }}
                    >
                        <div
                            style={{
                                width: 76,
                                position: 'relative',
                                marginLeft: 20,
                            }}
                        >
                            <img
                                alt=""
                                src={
                                    data_deconstruction.key && item[data_deconstruction.key] == active
                                        ? bottomActive
                                        : bottom
                                }
                                style={{ width: '100%', objectFit: 'contain' }}
                            ></img>
                            <img
                                alt=""
                                src={itemIcon?.(item)}
                                style={{
                                    position: 'absolute',
                                    zIndex: '2',
                                    left: '50%',
                                    top: 2,
                                    transform: 'translate(-50%,0%)',
                                }}
                                width={40}
                            ></img>
                        </div>
                        <Flc flex={1} height={72} marginLeft={16}>
                            <Flr>
                                <F16
                                    color={
                                        data_deconstruction.key && item[data_deconstruction.key] == active
                                            ? '#67BCFF'
                                            : '#D8F0FF'
                                    }
                                >
                                    {item[data_deconstruction.name]}
                                </F16>
                                <F12 lineHeight={'18px'} marginRight="10px">
                                    {data_deconstruction.time && item[data_deconstruction.time]}
                                </F12>
                            </Flr>

                            <Flr justifyContent="flex-start" alignItems="flex-end" gap={10}>
                                <F32B>
                                    <IndCssLgText4>{item[data_deconstruction.value]}</IndCssLgText4>
                                </F32B>
                                <F14 lineHeight={'22px'} color="#C5D8F1">
                                    {item[data_deconstruction.unit]}
                                </F14>
                            </Flr>
                        </Flc>
                    </div>
                );
            })}
        </div>
    );
};
