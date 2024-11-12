/*
 * @Author: sungy
 * @Date: 2023-08-09 11:24:30
 * @LastEditors: sungy
 * @LastEditTime: 2023-12-06 19:29:08
 * @Description:企业预测
 */
import React from 'react';
import { ExFlr } from '../BaseEx';
import EchartMapGeo from '@/components/EchartMapGeo';
import mockGeoMap from './test/mockGeoMap.json';
import mockGeoPoint from './test/mockGeoPoint.json';
import mockGeoBar from './test/mockBar';
import GeoMapChian from './GeoMapChian';
import GeoMapWrold from './GeoMapWrold';
import { mockRankData } from './test/mockRankData';
import { mockGeoVisual } from './test/mockGeoVisual';
import { maxBy, find, toNumber } from 'lodash';
import { mockGeoLabel } from './test/mockGeoLabel';

const maxRank = maxBy(mockGeoVisual, 'rank')?.rank ?? 0;

const getValue = (rank: number) => {
    const data: any = find(mockGeoVisual, ['rank', rank]);
    return toNumber(data?.val ?? 0);
};

const colors = {
    color_1: 'rgba(20, 241, 147, 1)', // 绿色 color_1
    color_2: 'rgba(0, 154, 253, 1)', // 蓝色 color_2
    color_3: 'rgba(255, 219, 39, 1)', // 黄色 color_3
    color_4: 'rgba(253, 138, 0, 1)', // 橙色 color_4
    color_5: 'rgba(244, 48, 28, 1)', // 红色 color_5
};

export default function P() {
    return (
        <>
            <ExFlr gap={30} title="Echars地图">
                <ExFlr title="EchartMapGeo-示例集合">
                    <EchartMapGeo
                        style={{ height: 500, width: 650 }}
                        geoInfo={{
                            code: '520000',
                            level: 2,
                        }}
                        mapData={mockGeoMap}
                    />

                    <EchartMapGeo
                        style={{ height: 500, width: 650 }}
                        geoInfo={{
                            code: '520000',
                            level: 2,
                        }}
                        mapData={mockGeoMap}
                        config={{
                            isPieces: true,
                        }}
                    />

                    <EchartMapGeo
                        style={{ height: 500, width: 650 }}
                        geoInfo={{
                            code: '520000',
                            level: 2,
                        }}
                        pointData={mockGeoPoint}
                        config={{
                            pointSelect: ['3'],
                        }}
                    />

                    <EchartMapGeo
                        style={{ height: 500, width: 650 }}
                        geoInfo={{
                            code: '520000',
                            level: 2,
                        }}
                        labelData={mockGeoLabel}
                        config={{
                            pointSelect: ['3'],
                            pointSymbols: [-1, -1],
                        }}
                    />

                    <EchartMapGeo
                        style={{ height: 500, width: 650 }}
                        geoInfo={{
                            code: '520000',
                            level: 2,
                        }}
                        rankData={mockRankData}
                        pointData={mockGeoPoint}
                        config={{
                            pointSymbols: [-1, -1],
                            rankSeriesConfig: { symbolSizeMax: 50, symbolSizeMin: 30 },
                        }}
                    />

                    <EchartMapGeo
                        style={{ height: 500, width: 650 }}
                        geoInfo={{
                            code: '520000',
                            level: 2,
                        }}
                        barData={mockGeoBar}
                    />

                    <EchartMapGeo
                        style={{ height: 500, width: 650 }}
                        geoInfo={{
                            code: '130000',
                            level: 3,
                        }}
                        mapData={mockGeoVisual}
                        config={{
                            isPieces: true,
                            showLabel: false,
                            customVisualMap: () => {
                                return [
                                    {
                                        type: 'piecewise', // 定义为分段型 visualMap
                                        textStyle: {
                                            color: '#fff',
                                        },
                                        pieces: [
                                            {
                                                gte: getValue(Math.floor(maxRank * 0.1)),
                                                label: '前10%',
                                                color: colors.color_1,
                                            },
                                            {
                                                gt: getValue(Math.floor(maxRank * 0.25)),
                                                lt: getValue(Math.floor(maxRank * 0.1)),
                                                label: '10%-25%',
                                                color: colors.color_2,
                                            },
                                            {
                                                gt: getValue(Math.floor(maxRank * 0.75)),
                                                lt: getValue(Math.floor(maxRank * 0.25)),
                                                label: '25%-75%',
                                                color: colors.color_3,
                                            },
                                            {
                                                gt: getValue(Math.floor(maxRank * 0.9)),
                                                lt: getValue(Math.floor(maxRank * 0.75)),
                                                label: '75%-90%',
                                                color: colors.color_4,
                                            },
                                            {
                                                lt: getValue(Math.floor(maxRank * 0.9)),
                                                label: '后10%',
                                                color: colors.color_5,
                                            },
                                        ],
                                    },
                                ];
                            },
                        }}
                    />
                </ExFlr>

                <ExFlr title="EchartMapGeo-中国地图示例集合">
                    <GeoMapChian style={{ height: 500, width: 650 }}></GeoMapChian>
                </ExFlr>
                <ExFlr title="EchartMapGeo-世界地图示例集合">
                    <GeoMapWrold style={{ height: 500, width: 650 }}></GeoMapWrold>
                </ExFlr>
            </ExFlr>
        </>
    );
}
