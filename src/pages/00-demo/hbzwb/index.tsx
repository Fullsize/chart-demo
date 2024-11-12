/*
 * @Author: sungy
 * @Date: 2023-08-09 11:24:30
 * @LastEditors: sungy
 * @LastEditTime: 2024-01-25 15:44:00
 * @Description:企业预测
 */
import React from 'react';
import { Flc } from '@/components/Indicator';
import { ExFlaAuto, ExFlc, ExFlr, useMockData } from '../BaseEx';
import mock7V01 from './test/mock7v-生产总值.json';
import mock7V02 from './test/mock7v-商圈访客.json';
import mock7V03 from './test/mock7v-居民消费.json';
import mock7V04 from './test/mock7v-居民消费价格指数.json';
import mock7VLdrk from './test/mock7v-流动人口.json';
import mock7Vjjdb from './test/mock7v-经济对比.json';

import {
    TrIndCardHgjj1,
    TrIndCardHgjj2,
    TrIndCardHgjj3,
    TrIndCardHgjj5,
    TrIndCardLdrk,
    TrIndCardJjdbfx,
} from '@/components/Indicator';

export default function P() {
    return (
        <>
            <ExFlr gap={50} flexWrap="nowrap">
                <ExFlr title="宏观通用指标卡" maxWidth={800}>
                    <ExFlc title="指标卡一">
                        <TrIndCardHgjj1 apiData={useMockData(mock7V01)} itemStyle={{ overflow: 'visible' }} />
                        <TrIndCardHgjj1
                            apiData={useMockData(mock7V01)}
                            itemStyle={{ overflow: 'visible' }}
                            onChange={() => {
                                // TODO
                            }}
                        />
                    </ExFlc>
                    <ExFlr title="指标卡二">
                        <TrIndCardHgjj2 style={{ width: 300 }} apiData={useMockData(mock7V02)} />
                        <TrIndCardHgjj2
                            style={{ width: 300 }}
                            apiData={useMockData(mock7V02)}
                            onChange={() => {
                                // TODO
                            }}
                        />
                    </ExFlr>
                    <ExFlc title="指标卡三">
                        <TrIndCardHgjj3 style={{ width: 700 }} apiData={useMockData(mock7V03)} />
                        <TrIndCardHgjj3
                            style={{ width: 700 }}
                            apiData={useMockData(mock7V03)}
                            onChange={() => {
                                // TODO
                            }}
                        />
                    </ExFlc>

                    <ExFlc title="指标卡五">
                        <TrIndCardHgjj5 style={{ width: 700 }} apiData={useMockData(mock7V04)} />
                        <TrIndCardHgjj5
                            style={{ width: 700 }}
                            childrenStyle={{
                                background: 'rgba(37, 75, 128, 0.5)',
                                borderRadius: 8,
                            }}
                            apiData={useMockData(mock7V04)}
                        />
                        <TrIndCardHgjj5
                            style={{ width: 700 }}
                            apiData={useMockData(mock7V04)}
                            onChange={() => {
                                // TODO
                            }}
                        />
                    </ExFlc>
                </ExFlr>
                <ExFlr title="宏观其他-指标卡" maxWidth={800}>
                    <TrIndCardLdrk apiData={useMockData(mock7VLdrk)}></TrIndCardLdrk>
                    <TrIndCardJjdbfx
                        apiData={useMockData(mock7Vjjdb)}
                        onChange={() => {
                            // TODO
                        }}
                    ></TrIndCardJjdbfx>
                </ExFlr>
            </ExFlr>
        </>
    );
}
