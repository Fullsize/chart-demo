import React from 'react';
import EchartMapGeo from '@/components/EchartMapGeo';
import { Flr } from '@/components/Indicator';

const mockODData = [
    {
        time_name: 20231105,
        val: 28831,
        region_name: '甘肃省',
        unit_name: '人',
        lng: 103.823557,
        lat: 36.058039,
    },
    {
        time_name: 20231105,
        val: 6957,
        region_name: '内蒙古自治区',
        unit_name: '人',
        lng: 111.670801,
        lat: 40.818311,
    },
    {
        time_name: 20231105,
        val: 6528,
        region_name: '四川省',
        unit_name: '人',
        lng: 104.065735,
        lat: 30.659462,
    },
    {
        time_name: 20231105,
        val: 4498,
        region_name: '河南省',
        unit_name: '人',
        lng: 113.665412,
        lat: 34.757975,
    },
    {
        time_name: 20231105,
        val: 4458,
        region_name: '陕西省',
        unit_name: '人',
        lng: 108.948024,
        lat: 34.263161,
    },
    {
        time_name: 20231105,
        val: 4005,
        region_name: '青海省',
        unit_name: '人',
        lng: 101.778916,
        lat: 36.623178,
    },
    {
        time_name: 20231105,
        val: 3330,
        region_name: '广东省',
        unit_name: '人',
        lng: 113.280637,
        lat: 23.125178,
    },
    {
        time_name: 20231105,
        val: 2927,
        region_name: '北京市',
        unit_name: '人',
        lng: 116.405285,
        lat: 39.904989,
    },
    {
        time_name: 20231105,
        val: 2174,
        region_name: '上海市',
        unit_name: '人',
        lng: 121.472644,
        lat: 31.231706,
    },
    {
        time_name: 20231105,
        val: 2125,
        region_name: '山东省',
        unit_name: '人',
        lng: 117.000923,
        lat: 36.675807,
    },
    {
        time_name: 20231105,
        val: 1545,
        region_name: '浙江省',
        unit_name: '人',
        lng: 120.153576,
        lat: 30.287459,
    },
    {
        time_name: 20231105,
        val: 1450,
        region_name: '宁夏回族自治区',
        unit_name: '人',
        lng: 106.278179,
        lat: 38.46637,
    },
    {
        time_name: 20231105,
        val: 1346,
        region_name: '重庆市',
        unit_name: '人',
        lng: 106.504962,
        lat: 29.533155,
    },
    {
        time_name: 20231105,
        val: 1057,
        region_name: '江苏省',
        unit_name: '人',
        lng: 118.767413,
        lat: 32.041544,
    },
    {
        time_name: 20231105,
        val: 980,
        region_name: '湖南省',
        unit_name: '人',
        lng: 112.982279,
        lat: 28.19409,
    },
    {
        time_name: 20231105,
        val: 932,
        region_name: '湖北省',
        unit_name: '人',
        lng: 114.298572,
        lat: 30.584355,
    },
    {
        time_name: 20231105,
        val: 828,
        region_name: '天津市',
        unit_name: '人',
        lng: 117.190182,
        lat: 39.125596,
    },
    {
        time_name: 20231105,
        val: 784,
        region_name: '山西省',
        unit_name: '人',
        lng: 112.549248,
        lat: 37.857014,
    },
    {
        time_name: 20231105,
        val: 771,
        region_name: '海南省',
        unit_name: '人',
        lng: 110.33119,
        lat: 20.031971,
    },
    {
        time_name: 20231105,
        val: 650,
        region_name: '河北省',
        unit_name: '人',
        lng: 114.502461,
        lat: 38.045474,
    },
    {
        time_name: 20231105,
        val: 613,
        region_name: '福建省',
        unit_name: '人',
        lng: 119.306239,
        lat: 26.075302,
    },
    {
        time_name: 20231105,
        val: 521,
        region_name: '安徽省',
        unit_name: '人',
        lng: 117.283042,
        lat: 31.86119,
    },
    {
        time_name: 20231105,
        val: 347,
        region_name: '贵州省',
        unit_name: '人',
        lng: 106.713478,
        lat: 26.578343,
    },
    {
        time_name: 20231105,
        val: 340,
        region_name: '云南省',
        unit_name: '人',
        lng: 102.712251,
        lat: 25.040609,
    },
    {
        time_name: 20231105,
        val: 327,
        region_name: '辽宁省',
        unit_name: '人',
        lng: 123.429096,
        lat: 41.796767,
    },
    {
        time_name: 20231105,
        val: 289,
        region_name: '西藏自治区',
        unit_name: '人',
        lng: 91.132212,
        lat: 29.660361,
    },
    {
        time_name: 20231105,
        val: 261,
        region_name: '广西壮族自治区',
        unit_name: '人',
        lng: 108.320004,
        lat: 22.82402,
    },
    {
        time_name: 20231105,
        val: 242,
        region_name: '吉林省',
        unit_name: '人',
        lng: 125.3245,
        lat: 43.886841,
    },
    {
        time_name: 20231105,
        val: 127,
        region_name: '江西省',
        unit_name: '人',
        lng: 115.892151,
        lat: 28.676493,
    },
    {
        time_name: 20231105,
        val: 97,
        region_name: '黑龙江省',
        unit_name: '人',
        lng: 126.642464,
        lat: 45.756967,
    },
];

const GeoMapChina = ({ style }: any) => {
    return (
        <Flr>
            <EchartMapGeo
                config={{
                    option: {
                        // 显示地图Label
                        geo: [{ label: { show: false } }],
                    },
                }}
                geoInfo={{
                    code: 300000,
                    level: 1,
                }}
                // 流入数据
                odData={{
                    to: {
                        region_name: '加拿大',
                        lng: 25.88214,
                        lat: 45.5768429999999,
                    },
                    from: mockODData,
                }}
                style={{ ...style }}
            />

            <EchartMapGeo
                config={{
                    option: {
                        // 显示地图Label
                        geo: [{ label: { show: false } }],
                    },
                }}
                geoInfo={{
                    code: 300000,
                    level: 1,
                }}
                // 流入数据
                odData={{
                    from: {
                        region_name: '加拿大',
                        lng: 25.88214,
                        lat: 45.5768429999999,
                    },
                    to: mockODData,
                }}
                style={{ ...style }}
            />
        </Flr>
    );
};
export default GeoMapChina;
