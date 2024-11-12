import React, { useState } from 'react';
import EchartMapGeo from '@/components/EchartMapGeo';

const mockMapData = [
    {
        name: '喀什地区',
        value: 578.61,
        unit: '万人',
    },
    {
        name: '乌鲁木齐市',
        value: 386.38,
        unit: '万人',
    },
    {
        name: '和田地区',
        value: 283.1,
        unit: '万人',
    },
    {
        name: '伊犁哈萨克自治州',
        value: 266.35,
        unit: '万人',
    },
    {
        name: '阿克苏地区',
        value: 226.89,
        unit: '万人',
    },
    {
        name: '巴音郭楞蒙古自治州',
        value: 154.77,
        unit: '万人',
    },
    {
        name: '昌吉回族自治州',
        value: 132.85,
        unit: '万人',
    },
    {
        name: '塔城地区',
        value: 82.93,
        unit: '万人',
    },
    {
        name: '克孜勒苏柯尔克孜自治州',
        value: 69.24,
        unit: '万人',
    },
    {
        name: '哈密市',
        value: 64.08,
        unit: '万人',
    },
    {
        name: '吐鲁番市',
        value: 58.38,
        unit: '万人',
    },
    {
        name: '阿勒泰地区',
        value: 53.56,
        unit: '万人',
    },
    {
        name: '博尔塔拉蒙古自治州',
        value: 41.63,
        unit: '万人',
    },
    {
        name: '克拉玛依市',
        value: 31.87,
        unit: '万人',
    },
];

const mockPointData = [
    {
        city_code: '650200',
        park_id: 'gxb000033',
        park_name: '克拉玛依市石油开采3产业聚集区',
        lat: '84.88214',
        lon: '45.5768429999999',
    },
    {
        city_code: '650100',
        park_id: 'gxb000040',
        park_name: '乌鲁木齐市石油开采10产业聚集区',
        lat: '87.57974',
        lon: '43.870995',
    },
    {
        city_code: '650400',
        park_id: 'gxb000044',
        park_name: '吐鲁番市石油开采14产业聚集区',
        lat: '90.49715',
        lon: '43.0776669999999',
    },
    {
        city_code: '652800',
        park_id: 'gxb000061',
        park_name: '巴音郭楞蒙古自治州天然气开采1产业聚集区',
        lat: '86.16746',
        lon: '41.766983',
    },
    {
        city_code: '654300',
        park_id: 'gxb000124',
        park_name: '阿勒泰地区常用有色金属矿采选13产业聚集区',
        lat: '86.15797',
        lon: '47.893658',
    },
    {
        city_code: '650200',
        park_id: 'gxb000295',
        park_name: '克拉玛依市石油和天然气开采专业及辅助性活动4产业聚集区',
        lat: '84.8732399999999',
        lon: '45.604008',
    },
    {
        city_code: '652800',
        park_id: 'gxb000312',
        park_name: '巴音郭楞蒙古自治州石油和天然气开采专业及辅助性活动21产业聚集区',
        lat: '86.229065',
        lon: '41.69478',
    },
    {
        city_code: '650200',
        park_id: 'gxb000319',
        park_name: '克拉玛依市石油和天然气开采专业及辅助性活动28产业聚集区',
        lat: '84.8777539999999',
        lon: '45.5770699999999',
    },
    {
        city_code: '652800',
        park_id: 'gxb000731',
        park_name: '巴音郭楞蒙古自治州棉纺织及印染精加工20产业聚集区',
        lat: '86.1747199999999',
        lon: '41.6349639999999',
    },
    {
        city_code: '650200',
        park_id: 'gxb001241',
        park_name: '克拉玛依市精炼石油产品制造20产业聚集区',
        lat: '84.87851',
        lon: '44.3260399999999',
    },
    {
        city_code: '654000',
        park_id: 'gxb001391',
        park_name: '伊犁哈萨克自治州化学药品原料药制造20产业聚集区',
        lat: '81.1501899999999',
        lon: '43.9388659999999',
    },
    {
        city_code: '652800',
        park_id: 'gxb001496',
        park_name: '巴音郭楞蒙古自治州纤维素纤维原料及纤维制造5产业聚集区',
        lat: '86.1721299999999',
        lon: '41.613174',
    },
    {
        city_code: '659002',
        park_id: 'gxb001503',
        park_name: '阿拉尔市纤维素纤维原料及纤维制造12产业聚集区',
        lat: '81.20376',
        lon: '40.5945359999999',
    },
    {
        city_code: '652300',
        park_id: 'gxb001512',
        park_name: '昌吉回族自治州纤维素纤维原料及纤维制造21产业聚集区',
        lat: '86.1590999999999',
        lon: '44.3045199999999',
    },
    {
        city_code: '652300',
        park_id: 'gxb001520',
        park_name: '昌吉回族自治州纤维素纤维原料及纤维制造29产业聚集区',
        lat: '86.3393499999999',
        lon: '44.22769',
    },
    {
        city_code: '659004',
        park_id: 'gxb001832',
        park_name: '五家渠市有色金属压延加工11产业聚集区',
        lat: '87.6788999999999',
        lon: '44.2735059999999',
    },
    {
        city_code: '650100',
        park_id: 'gxb002950',
        park_name: '乌鲁木齐市燃气生产和供应业19产业聚集区',
        lat: '87.5940099999999',
        lon: '43.8268899999999',
    },
];

const GeoMap = ({ style }: any) => {
    const [map, setMap] = useState('和田地区');
    const [mapPoint, setMapPoint] = useState('gxb000033');
    const [regionCode] = useState('650000');

    return (
        <EchartMapGeo
            onDrill={(data: any) => {
                //
                console.log('data', data);
            }}
            onGoBack={(data: any) => {
                console.log('data', data);
            }}
            onMapClick={(e: any, _p: any) => {
                // 地图点击事件
                console.log('data', e, _p);
            }}
            onMapSelectchanged={(data: any, _state: any, seriesType: any) => {
                // 选中区域/点 事件
                if (seriesType == 'map') {
                    setMap(data?.name);
                } else if (seriesType == 'effectScatter') {
                    setMapPoint(data?.park_id);
                }
            }}
            config={{
                // 选中区域
                mapSelect: map,
                // 选中点
                pointSelect: [mapPoint],
                option: {
                    // 显示地图Label
                    geo: [{ label: { show: false } }],
                },
                // 上钻下钻等级配置
                drillLevel: {
                    maxLevel: 2,
                    minLevel: 2,
                },
            }}
            // 地图底图
            geoInfo={{
                code: regionCode,
                level: 2,
            }}
            // 区域着色数据
            mapData={mockMapData}
            // 打点数据
            pointData={mockPointData}
            style={{ ...style }}
        />
    );
};
export default GeoMap;
