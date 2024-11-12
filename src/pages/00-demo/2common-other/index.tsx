/*
 * @Author: sungy
 * @Date: 2023-08-09 11:24:30
 * @LastEditors: zhipengHuang
 * @LastEditTime: 2024-08-28 19:23:04
 * @Description: 其他公共组件
 */
import React from 'react';
import { ExFlr, ExFlc, useMockData } from '../BaseEx';
import {
    GrIndTab,
    GrIndTab1,
    GrIndTab2,
    GrIndTab3,
    GrIndTab5,
    GrIndTab6,
    GrIndRankList,
    IndLegend,
    ProgressIndicator,
    // GrIndTab4,
    GrIndMapGreen,
    GrIndRankGreen,
    IndTabIcon,
    TrIndProgressCardArr,
    TrIndProgressCard2,
    TrIndProgressCard2Arr,
    TrIndProgressCard3,
} from '@/components/Indicator';
import mockRank from './test/mockRank.json';
import mockLegend from './test/mockLegend.json';
import { progressMockData, progressMockData2, progressMockData3 } from './mockData';

export default function P() {
    return (
        <>
            <ExFlr gap={20} flexWrap="nowrap">
                <ExFlr title="排名组件">
                    <GrIndRankList
                        width={500}
                        apiData={useMockData(mockRank)}
                        fieldNames={{
                            name: 'index_code_full_cname',
                            unit: 'unit_name',
                        }}
                    />
                </ExFlr>
                <ExFlr title="GrIndTab组件" width={700}>
                    <GrIndTab
                        active="禽蛋"
                        data={[
                            { lable: '猪牛羊肉', value: '猪牛羊肉' },
                            { lable: '禽肉', value: '禽肉' },
                            { lable: '禽蛋', value: '禽蛋' },
                            { lable: '生牛奶', value: '生牛奶' },
                        ]}
                    ></GrIndTab>
                    <GrIndTab1
                        active="禽蛋"
                        data={[
                            { lable: '猪牛羊肉', value: '猪牛羊肉' },
                            { lable: '禽肉', value: '禽肉' },
                            { lable: '禽蛋', value: '禽蛋' },
                            { lable: '生牛奶', value: '生牛奶' },
                        ]}
                    ></GrIndTab1>
                    <GrIndTab2
                        active="禽蛋"
                        data={[
                            { lable: '猪牛羊肉', value: '猪牛羊肉' },
                            { lable: '禽肉', value: '禽肉' },
                            { lable: '禽蛋', value: '禽蛋' },
                            { lable: '生牛奶', value: '生牛奶' },
                        ]}
                    ></GrIndTab2>
                    <GrIndTab3
                        active="禽蛋"
                        data={[
                            { lable: '猪牛羊肉', value: '猪牛羊肉' },
                            { lable: '禽肉', value: '禽肉' },
                            { lable: '禽蛋', value: '禽蛋' },
                            { lable: '生牛奶', value: '生牛奶' },
                        ]}
                    ></GrIndTab3>
                    <GrIndTab5
                        active="禽蛋"
                        data={[
                            { lable: '猪牛羊肉', value: '猪牛羊肉' },
                            { lable: '禽肉', value: '禽肉' },
                            { lable: '禽蛋', value: '禽蛋' },
                            { lable: '生牛奶', value: '生牛奶' },
                        ]}
                    ></GrIndTab5>

                    {/* <GrIndTab4
                        active="worldMap"
                        data={[
                            {
                                lable: null,
                                value: 'worldMap',
                                icon: GrIndMapGreen,
                                iconProps: {},
                            },
                            {
                                lable: null,
                                value: 'worldRank',
                                icon: GrIndRankGreen,
                                iconProps: { color: 'red' },
                            },
                        ]}
                    />

                    <GrIndTab4
                        active="worldMap"
                        data={[
                            {
                                lable: '地图',
                                value: 'worldMap',
                                icon: GrIndMapGreen,
                                iconProps: {},
                            },
                            {
                                lable: '排名',
                                value: 'worldRank',
                                icon: GrIndRankGreen,
                                iconProps: { color: 'red' },
                            },
                        ]}
                    /> */}

                    <GrIndTab
                        flexDirection="row"
                        justifyContent="normal"
                        active="棉花"
                        maxWidth={200}
                        data={[
                            { lable: '粮食', value: '粮食' },
                            { lable: '棉花', value: '棉花' },
                            { lable: '禽蛋', value: '禽蛋' },
                            { lable: '生牛奶', value: '生牛奶' },
                            { lable: '鲜花', value: '鲜花' },
                        ]}
                    ></GrIndTab>

                    <GrIndTab
                        flexDirection="row"
                        justifyContent="normal"
                        active="棉花"
                        data={[
                            { lable: '粮食', value: '粮食' },
                            { lable: '棉花', value: '棉花' },
                            { lable: '禽蛋', value: '禽蛋' },
                            { lable: '生牛奶', value: '生牛奶' },
                            { lable: '鲜花', value: '鲜花' },
                        ]}
                    ></GrIndTab>

                    <GrIndTab1
                        flexDirection="row"
                        justifyContent="normal"
                        active="棉花"
                        data={[
                            { lable: '粮食', value: '粮食' },
                            { lable: '棉花', value: '棉花' },
                            { lable: '禽蛋', value: '禽蛋' },
                            { lable: '生牛奶', value: '生牛奶' },
                            { lable: '鲜花', value: '鲜花' },
                        ]}
                    ></GrIndTab1>
                    <GrIndTab2
                        flexDirection="row"
                        justifyContent="normal"
                        active="棉花"
                        data={[
                            { lable: '粮食', value: '粮食' },
                            { lable: '棉花', value: '棉花' },
                            { lable: '禽蛋', value: '禽蛋' },
                            { lable: '生牛奶', value: '生牛奶' },
                            { lable: '鲜花', value: '鲜花' },
                        ]}
                    ></GrIndTab2>
                    <GrIndTab3
                        flexDirection="row"
                        justifyContent="normal"
                        active="棉花"
                        data={[
                            { lable: '粮食', value: '粮食' },
                            { lable: '棉花', value: '棉花' },
                            { lable: '禽蛋', value: '禽蛋' },
                            { lable: '生牛奶', value: '生牛奶' },
                            { lable: '鲜花', value: '鲜花' },
                        ]}
                    ></GrIndTab3>

                    {/* <GrIndTab4
                        flexDirection="row"
                        justifyContent="normal"
                        active="worldMap"
                        data={[
                            {
                                lable: null,
                                value: 'worldMap',
                                icon: GrIndMapGreen,
                                iconProps: {},
                            },
                            {
                                lable: null,
                                value: 'worldRank',
                                icon: GrIndRankGreen,
                                iconProps: { color: 'red' },
                            },
                        ]}
                    /> */}
                    <GrIndTab5
                        flexDirection="row"
                        justifyContent="normal"
                        active="棉花"
                        data={[
                            { lable: '粮食', value: '粮食' },
                            { lable: '棉花', value: '棉花' },
                            { lable: '禽蛋', value: '禽蛋' },
                            { lable: '生牛奶', value: '生牛奶' },
                            { lable: '鲜花', value: '鲜花' },
                        ]}
                    ></GrIndTab5>
                    <GrIndTab6
                        width="500px"
                        flexDirection="row"
                        active="棉花"
                        data={[
                            { lable: '粮食', value: '粮食' },
                            { lable: '棉花', value: '棉花' },
                        ]}
                    ></GrIndTab6>

                    <ExFlr title="IndTabIcon">
                        <IndTabIcon />
                        <IndTabIcon
                            icons={['word', 'chart', 'map', 'chartVal', 'chartZs']}
                            onChange={(key) => console.log('IndIcon:', key)}
                        />
                    </ExFlr>
                    <ExFlr title="圆形进度条指标卡">
                        <TrIndProgressCardArr
                            apiData={progressMockData}
                            selected={progressMockData?.data?.[0]}
                            onChange={(data) => console.log(data)}
                        />
                    </ExFlr>
                    <ExFlr title="仪表盘进度条" width="650px">
                        <TrIndProgressCard2Arr apiData={progressMockData} />
                    </ExFlr>
                    <ExFlc title="步骤进度条">
                        <TrIndProgressCard3 apiData={progressMockData3}/>
                    </ExFlc>
                </ExFlr>
                <ExFlr title="GLegend">
                    <IndLegend
                        width={400}
                        data={mockLegend}
                        activeKey="F0201ZB000601LX0201"
                        fieldNames={{
                            name: 'group_name',
                            unit: 'unit_name',
                        }}
                    />
                    <ProgressIndicator
                        list={[
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
                    />
                </ExFlr>
            </ExFlr>
        </>
    );
}
