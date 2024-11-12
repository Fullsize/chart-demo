/*
 * @Author: sungy
 * @Date: 2024-01-02 14:14:30
 * @LastEditors: zhipengHuang
 * @LastEditTime: 2024-08-07 10:39:31
 * @Description: Antd类示例入口
 */

import React from 'react';
import { ExFlr, ExFlc, ExFlaAuto, getMockData } from '../BaseEx';
import { EcDatePicker } from '@/components/BaseAntd';
import TableC from './TablleCc';
import RankingTable from '@/components/BaseAntd/RankingTable';
import BaseCircleProgress from '@/components/BaseAntd/process';
import { Checkbox, Radio, Select } from 'antd';

const mockRangeData: any = getMockData([
    {
        default_time: 20231010,
        end_default_time: 20220515,
        end_time: 20241210,
        start_time: 20210110,
        start_default_time: 20220705,
    },
]);

const mockData: any = getMockData([
    {
        current_value: 20231227,
        end_time: 20241227,
        start_time: 20220101,
    },
]);

//其重点在与数据结构排名生成如何对接

export default function P() {
    return (
        <>
            <ExFlr gap={20}>
                <ExFlr title="通用-日期选择器【年、季、月、年/周、月/周、日】" width={650}>
                    <EcDatePicker
                        apiData={mockData}
                        onChange={(v: any, ov: any) => {
                            console.log('日期', v, ov);
                        }}
                    ></EcDatePicker>
                    <EcDatePicker apiData={mockData} picker="week"></EcDatePicker>
                    <EcDatePicker apiData={mockData} picker="weekMonth"></EcDatePicker>
                    <EcDatePicker
                        apiData={getMockData([
                            {
                                current_value: 2024040002,
                                end_time: 2024090001,
                                start_time: 2023090001,
                            },
                        ])}
                    ></EcDatePicker>
                    <EcDatePicker apiData={mockData} picker="month"></EcDatePicker>
                    <EcDatePicker apiData={mockData} picker="quarter"></EcDatePicker>
                    <EcDatePicker apiData={mockData} picker="year"></EcDatePicker>
                    <EcDatePicker
                        apiData={getMockData([
                            {
                                current_value: 2024040002,
                                end_time: 2024090001,
                                start_time: 2023090001,
                            },
                        ])}
                        picker="year"
                    ></EcDatePicker>
                    {/* 时间维度异常示例 */}
                    <EcDatePicker
                        apiData={getMockData([
                            {
                                current_value: 202312,
                                end_time: 202412,
                                start_time: 202212,
                            },
                        ])}
                        picker="date"
                    ></EcDatePicker>

                    {/* 时间范围示例 */}
                    <EcDatePicker
                        apiData={mockRangeData}
                        onChange={(v: any, ov: any) => {
                            console.log('日期范围', v, ov);
                        }}
                    ></EcDatePicker>
                    <EcDatePicker apiData={mockRangeData} picker="year"></EcDatePicker>
                    <EcDatePicker apiData={mockRangeData} picker="weekMonth"></EcDatePicker>
                    {/* 时间维度异常示例 */}
                    <EcDatePicker
                        apiData={getMockData([
                            {
                                default_time: 202310,
                                end_default_time: 202305,
                                end_time: 202412,
                                start_time: 202101,
                                start_default_time: 202312,
                            },
                        ])}
                        picker="date"
                    ></EcDatePicker>
                </ExFlr>
                <div style={{ marginLeft: 200 }}>
                    <TableC></TableC>
                </div>
                <ExFlc title="环形进度条">
                    <BaseCircleProgress percent={80} strokeColor={{ 0: '#02FCD5', 100: '#051D2B' }} strokeWidth={8} />
                </ExFlc>
                <ExFlc title="Radio">
                    <Radio.Group defaultValue={1}>
                        <Radio value={1}>A</Radio>
                        <Radio value={2}>B</Radio>
                        <Radio value={3}>C</Radio>
                        <Radio value={4}>D</Radio>
                    </Radio.Group>
                </ExFlc>
                <ExFlc title="CheckBox">
                    <Checkbox.Group
                        options={[
                            { label: 'Apple', value: 'Apple' },
                            { label: 'Pear', value: 'Pear' },
                            { label: 'Orange', value: 'Orange', disabled: false },
                        ]}
                        defaultValue={['Apple']}
                    />
                </ExFlc>
                <ExFlc title="Select">
                    <Select
                        defaultValue="lucy"
                        style={{ width: 120 }}
                        options={[
                            { value: 'jack', label: 'Jack' },
                            { value: 'lucy', label: 'Lucy' },
                            { value: 'Yiminghe', label: 'yiminghe' },
                            { value: 'disabled', label: 'Disabled', disabled: true },
                        ]}
                    />
                </ExFlc>
            </ExFlr>
        </>
    );
}
