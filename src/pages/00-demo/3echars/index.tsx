/*
 * @Author: sungy
 * @Date: 2023-08-09 11:24:30
 * @LastEditors: Fullsize
 * @LastEditTime: 2024-05-22 17:01:34
 * @Description:Echars 示例入口
 */
import React, { useState } from 'react';
import { ExFlr, getMockData, useMockData } from '../BaseEx';
import {
    EcharsAxis,
    EcharsAxisYc,
    EcharsAxisArea,
    EcharsPie,
    EcharsSankey,
    EcharsGdpBar,
    EchartsRadar,
    CircularProgress,
    StackedBar,
    WordCloud,
    WaterfallChart,
    DotPlot,
} from '@/components/BaseEchars';
import { ProgressIndicator } from '@/components/Indicator';
import mockAxis from './test/mockAxis.json';
import mockAxisLine from './test/mockAxisLine.json';
import mockAxisGdp from './test/mockAxisGdp.json';
import mockAxisQg from './test/mockAxis-全国.json';
import mockPie from './test/mockPie.json';
import mockSankey from './test/mockSankey.json';
import mockAxisDouble from './test/mockAxisDouble.json';
import mockYc from './test/mockYc.json';
import mockYcfx from './test/mockYcfx.json';
import { Select } from 'antd';
import useStore from '@/store';
import { EcharsAxisDouble } from '@/components/BaseEchars/EcharsAxisDouble';
import EchartGauge from '@/components/BaseEchars/gauge';
import mockRadar from './test/mockRadar';
import mockDotPlot from './test/mockDotPlot';
import mockGaugeData from './test/mockGuageData';
import EchartGuageWithTarget from '@/components/BaseEchars/gauge/EchartGuageWithTarget';

const data = [
    { value: 1048, name: 'Search Engine', unit: '万元', groupName: '123' },
    { value: 735, name: 'Direct', unit: '万元', groupName: '123' },
    { value: 580, name: 'Email', unit: '万元', groupName: '123' },
    { value: 484, name: 'Union Ads', unit: '万元', groupName: '123' },
    { value: 300, name: 'Video Ads', unit: '万元', groupName: '123' },
];

function SwitchTheme() {
    const { echartsTheme, setEchartsTheme } = useStore();
    return (
        <Select
            value={echartsTheme}
            style={{
                width: 150,
                position: 'fixed',
                left: 30,
                top: 95,
            }}
            onChange={(v: any) => {
                setEchartsTheme(v);
            }}
            options={[
                { value: 'ectFgw', label: '河北发改主题' },
                { value: 'ect1', label: '主题一' },
                { value: 'ect2', label: '主题二' },
                { value: 'ectGz', label: '贵州主题' },
                { value: 'ectSjz', label: '石家庄主题' },
            ]}
        />
    );
}

export default function P() {
    const [list, setList] = useState<string[]>([]);
    return (
        <>
            <SwitchTheme />
            <ExFlr gap={30}>
                <ExFlr title="Echars 坐标轴类">
                    <EcharsAxis
                        style={{ height: 300, width: 1500 }}
                        resApi={useMockData(mockAxisQg)}
                        data_deconstruction={{
                            category: 'time_name',
                            measure: 'region_name',
                        }}
                    ></EcharsAxis>

                    <EcharsAxis
                        style={{ height: 300, width: 650 }}
                        resApi={useMockData(mockAxis)}
                        data_deconstruction={{
                            measure: 'index_code_full_cname',
                        }}
                    ></EcharsAxis>
                    {/* 度量上合并两个字段数据 */}
                    <EcharsAxis
                        style={{ height: 300, width: 650 }}
                        resApi={useMockData(mockAxis)}
                        data_deconstruction={{
                            category: 'time_name',
                            measure: ['index_code_full_cname', '---', 'index_code_full_type_name'],
                        }}
                    ></EcharsAxis>
                    <EcharsAxis
                        theme={'ectGz'}
                        style={{ height: 300, width: 650 }}
                        resApi={useMockData(mockAxis)}
                    ></EcharsAxis>

                    {/* 折线面积 */}
                    <EcharsAxis
                        style={{ height: 300, width: 650 }}
                        resApi={useMockData(mockAxisLine)}
                        data_deconstruction={{
                            measure: 'index_code_full_cname',
                        }}
                    />
                    <EcharsAxisArea
                        style={{ height: 300, width: 650 }}
                        resApi={useMockData(mockAxisLine)}
                        data_deconstruction={{
                            measure: 'index_code_full_cname',
                        }}
                    />

                    {/* 预测预警 */}
                    <EcharsAxisYc style={{ height: 300, width: 650 }} resApi={useMockData(mockYc)}></EcharsAxisYc>
                    <EcharsAxisYc style={{ height: 300, width: 650 }} resApi={useMockData(mockYcfx)}></EcharsAxisYc>
                    <StackedBar style={{ height: 300, width: 650 }} resApi={useMockData(mockAxisQg)}></StackedBar>
                    <DotPlot
                        style={{ height: 300, width: 650 }}
                        resApi={getMockData(mockDotPlot)}
                        data_deconstruction={{
                            name: 'index_code_full_cname',
                            value: 'val',
                            unit: 'unit_name',
                            type: 'type',
                            xAxisName: 'region_name',
                        }}
                        specific={{
                            value: 3.8,
                            yIndex: 'left',
                            title: '全国',
                        }}
                    />
                </ExFlr>
                <ExFlr title="Echars 瀑布图">
                    <EcharsGdpBar style={{ height: 300, width: 650 }} resApi={useMockData(mockSankey)}></EcharsGdpBar>
                    <EcharsGdpBar style={{ height: 300, width: 650 }} resApi={useMockData(mockAxisGdp)}></EcharsGdpBar>
                    <WaterfallChart
                        style={{ height: 300, width: 650 }}
                        resApi={useMockData(mockAxisGdp)}
                        data_deconstruction={{
                            xAxisName: 'group_name',
                            value: 'val',
                            unit: 'unit_name',
                        }}
                    />
                </ExFlr>
                <ExFlr title="Echars 饼图类">
                    <EcharsPie style={{ height: 300, width: 500 }} resApi={useMockData(mockPie)}></EcharsPie>
                    <div style={{ height: 300, width: 300 }}>
                        <CircularProgress
                            data={[
                                {
                                    value: 1048,
                                    name: 'Search Engine',
                                    unit: '万元',
                                    groupName: '123',
                                },
                                {
                                    value: 735,
                                    name: 'Direct',
                                    unit: '万元',
                                    groupName: '123',
                                },
                                {
                                    value: 580,
                                    name: 'Email',
                                    unit: '万元',
                                    groupName: '123',
                                },
                                {
                                    value: 484,
                                    name: 'Union Ads',
                                    unit: '万元',
                                    groupName: '123',
                                },
                                {
                                    value: 300,
                                    name: 'Video Ads',
                                    unit: '万元',
                                    groupName: '123',
                                },
                            ]}
                        ></CircularProgress>
                    </div>
                </ExFlr>

                <ExFlr title="Echars 桑基图">
                    <EcharsSankey style={{ height: 400, width: 500 }} resApi={useMockData(mockSankey)}></EcharsSankey>
                </ExFlr>
                <ExFlr title="Echars 双向柱子">
                    <EcharsAxisDouble
                        style={{ height: 400, width: 900 }}
                        resApi={useMockData(
                            mockAxisDouble.map((d: any) => ({
                                ...d,
                                inverse: d.index_full_code == 'F01ZB00170107LX0301',
                            })),
                        )}
                    ></EcharsAxisDouble>
                </ExFlr>
                <ExFlr title="仪表盘">
                    <EchartGauge gaugeValue={60} style={{ height: 400, width: 400 }} />
                    <EchartGuageWithTarget data={mockGaugeData} style={{ height: 400, width: 400 }} />
                </ExFlr>
                <ExFlr title="雷达图">
                    <EchartsRadar style={{ height: 400, width: 400 }} resApi={useMockData(mockRadar)} />
                </ExFlr>
                <ExFlr title="组合图">
                    <div style={{ display: 'flex', height: 300 }}>
                        <div style={{ width: 300 }}>
                            <CircularProgress checked={list} data={data}></CircularProgress>
                        </div>
                        <div style={{ width: 300 }}>
                            <ProgressIndicator
                                list={data}
                                checked={list}
                                onClick={(data) => {
                                    setList([...data]);
                                }}
                            ></ProgressIndicator>
                        </div>
                    </div>
                </ExFlr>
                <ExFlr title="词云">
                    <WordCloud
                        style={{ height: 100, width: 400 }}
                        resApi={useMockData(mockAxisQg)}
                        data_deconstruction={{
                            name: 'region_name',
                            value: 'val',
                            unit: 'unit_name',
                        }}
                    />
                </ExFlr>
            </ExFlr>
        </>
    );
}
