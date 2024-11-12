/*
 * @Author: zhipengHuang
 * @Date: 2024-07-18 15:32:07
 * @LastEditors: zhipengHuang
 * @LastEditTime: 2024-08-19 14:29:20
 * @Description: 
 */
import React from 'react';
import { Empty } from 'antd';
import noDataPng from '@images/noData.png';

export default function SjzEmpty({ msg = '暂无数据', style }: { msg?: string | any; style?: React.CSSProperties }) {
    return (
        <div
            style={{
                height: '100%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                ...style,
            }}
        >
            <Empty
                style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
                image={noDataPng}
                description={"暂无数据"}
            ></Empty>
        </div>
    );
}
