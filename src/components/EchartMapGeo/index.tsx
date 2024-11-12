/*
 * @Author: sungy
 * @Date: 2023-08-01 14:20:43
 * @LastEditors: sungy
 * @LastEditTime: 2024-08-21 15:34:29
 * @Description: Echart 地图入口
 */
import React, { useEffect, useRef, useState } from 'react';
import { useDebounce } from 'react-use';
import { defaultsDeep, cloneDeep } from 'lodash';
import Loading from './Loading';
import type { EChartsOption, ECharts, ECElementEvent } from 'echarts';

import {
    registerEchartsMapByApidata,
    tranMapOdLineData,
    tranMapOdEffectDataData,
    ApiFeatureOriginProperty,
    MapRegisterInfo,
    ApiFeatureProperty,
    MapOdLineDataItem,
} from './customEcharsGeoMap/apiDataTransform';
import {
    EffectScatterPointDataFour,
    getDefaultOption,
    // getSeriesGeoBar,
    // getSeriesGeoBar2,
    getSeriesGeoBar3,
    getSeriesGeoLabel,
    getSeriesGeoTopK,
    getSeriesLines,
    getSeriesODEffectScatter,
} from './customEcharsGeoMap/echarsGeoMap';
import getOptionGeo, { getOptionHbFGWGeoWorld } from './customEcharsGeoMap/echarsGeoOption';
import { MapBgImgSpin } from './MapBgImgSpin';

import { renderEchartsMapAndVisualMap, renderEffectScatter, echarsGeoMapEvent } from './customEcharsGeoMap';
import { useEcApiLdgPost } from '@/service/index';
import BaseEcharts from '@/components/BaseEchars';
import chinaGeoJson from './test/geoChina.json';
import { KeyofEffectIco } from './customEcharsGeoMap/symbols/index';
import { FeatureCollection, Geometry } from 'geojson';
import { PropsWithStyle } from '@/utils/types';

export type OdDataProps = {
    from: Array<unknown> | object;
    to: Array<unknown> | object;
};

/**
 * 标签数据格式
 */
export type LabelItemType = {
    lon: number;
    lat: number;
    name: string;
    value: number;
    unit: string;
    children?: Pick<LabelItemType, 'name' | 'value' | 'unit'>[];
    [p: string]: unknown;
};

export type BarItemType = {
    lon: number;
    lat: number;
    name: string;
    centroid: [number, number];
    id: string;
    pro_code: string;
    data: Array<{ value: number; unit: string }>;
    [key: string]: unknown;
};

export type PointItemType = {
    lon: number;
    lat: number;
    name: string;
    [x: string]: unknown;
};

// 接口接入的指标数据结构
export interface MapApiIndicatorData {
    unitCode: string;
    val: string;
    rank: number;
    lat: string;
    type_code: string;
    index_code_full_type_name: string;
    unit_name: string;
    index_full_code: string;
    index_code_full_cname: string;
    index_code_cname: string;
    time_name: string;
    type: string;
    updated_by: string;
    time_freq: string;
    index_code: string;
    group_code: string;
    group_name: string;
    explain_code: string;
    region_code: string;
    region_name: string;
    lon: string;
    name?: string;
    value?: string;
    unit?: string;
    city_code?: string;
}

// 地图数据内的指标数据接口
export interface MapIndicatorData {
    id: string;
    cityCode: string;
    name: string;
    region_name: string;
    selected: boolean;
    data: Array<{
        name: string;
        value: string;
        unit: string;
    }>;
}

export type EchartMapProps = {
    geoJSON?: FeatureCollection;
    config?: {
        selectedMode?: 'single' | 'multiple' | 'series' | boolean;
        hiddenRegion?: boolean;
        option?: EChartsOption | any;
        mapSelect?: string;
        /**选中点id 集合 */
        pointSelect?: Array<string | number>;
        /**打点样式 [选中样式，默认样式] ,[-1,-1] 代表默认样式 */
        pointSymbols?: [KeyofEffectIco | -1, KeyofEffectIco | -1];
        drillLevel?: {
            maxLevel: number;
            minLevel: number;
        };
        maxBarFactor?: number;
        /**
         * 连续映射 or 分段映射
         */
        isPieces?: boolean;
        /**
         * 分段映射的颜色列表，数值高到低分布
         * ['#E04E2080','#F8CF3680','#8ECA4380','#129AE780']
         */
        piecesColors?: string[];
        /**
         * mapData 是否渲染label，默认渲染
         */
        showLabel?: boolean;
        /**
         * 自定义颜色映射
         * @param args
         * @returns
         */
        customVisualMap?: (...args: unknown[]) => Record<string, unknown>[];
        /**topK 排名配置， symbolSize计算使用，可不传 */
        rankSeriesConfig?: { symbolSizeMax: number; symbolSizeMin: number };
        /**占位用，后期扩展  */
        labelSeriesConfig?: object;
    };
    /** 打点需要
     * 经度longitude , 180-0-180 , latitude 90-0-90 !!! 注意不要取反
     * name: 悬浮展示用
     */
    pointData?: Array<PointItemType>;
    barData?: Array<BarItemType>;
    mapData?: Array<MapApiIndicatorData>;
    /**
     * topK 排名使用，建议搭配 pointData属性使用
     */
    rankData?: Array<{ lon: number; lat: number; rank: number; [x: string]: unknown }>;
    labelData?: LabelItemType[];
    odData?: OdDataProps | Array<OdDataProps>;
    onMapSelectchanged?: (property: Record<string, unknown>, event: 'select' | 'unselect', seriesType: string) => void;
    onMapClick?: (event: ECElementEvent, params?: ApiFeatureProperty) => void;
    onGoBack?: (params: { code: string; treeId?: string; level?: number }) => void;
    onDrill?: (params: { code: string; treeId?: string; level?: number }) => void;
    className?: string;
    geoInfo: {
        code: number | string;
        level: number;
    };
};

const defaultConfig: EchartMapProps['config'] = {
    option: {},
    pointSelect: [],
    pointSymbols: ['7', '8'],
    mapSelect: '',
    hiddenRegion: false,
    selectedMode: 'single',
    drillLevel: {
        maxLevel: 2,
        minLevel: 2,
    },
    isPieces: false, // 启用分段映射
    showLabel: true,
    piecesColors: ['#E04E2080', '#F8CF3680', '#8ECA4380', '#129AE780'],
    customVisualMap: undefined,
    rankSeriesConfig: { symbolSizeMax: 50, symbolSizeMin: 50 },
    labelSeriesConfig: {},
};

const mapCache = new Map();

/**
 * 注册地图
 * @param geoInfo
 * @returns
 */
function useRegisterMap(geoInfo: { code: number | string; level: number }) {
    const [registerMap, setRegisterMap] = useState<MapRegisterInfo>();
    const [resApi, getApi] = useEcApiLdgPost('/api/v4/attr/query/geojsondata');
    function registerEchart(geoJson: FeatureCollection<Geometry, ApiFeatureOriginProperty>) {
        if (geoJson) {
            const regInfo = registerEchartsMapByApidata(geoJson);
            setRegisterMap(regInfo);
        }
    }
    const geoInfoStr = JSON.stringify(geoInfo);

    useEffect(() => {
        // jkGeoJson
        const geoInfoObj = JSON.parse(geoInfoStr);
        const { code } = geoInfoObj;
        if (code == '100000') {
            mapCache.set(geoInfoStr, chinaGeoJson);
        }
    }, [geoInfoStr]);

    // 获取地图数据并进行注册
    useEffect(() => {
        if (geoInfoStr) {
            if (mapCache.has(geoInfoStr)) {
                const regInfo = mapCache.get(geoInfoStr);
                registerEchart(regInfo);
            } else {
                const geoInfo = JSON.parse(geoInfoStr);
                setRegisterMap(undefined);
                if (geoInfo?.code) {
                    getApi({
                        dataId: 'eco_sxsjj_geojson_for_china',
                        field: 'id',
                        ...geoInfo,
                    });
                }
            }
        }
    }, [geoInfoStr]);

    // 地图数据请求后更新数据
    useEffect(() => {
        if (resApi.ok) {
            const geojson = resApi?.data?.geojson as FeatureCollection<Geometry, ApiFeatureOriginProperty>;
            registerEchart(geojson);
            mapCache.set(geoInfoStr, geojson);
        }
    }, [resApi?.sign]);

    return [registerMap];
}

function getOdSeriesArr(odData: OdDataProps) {
    if (typeof odData != 'object') {
        return [];
    }
    const { from, to } = odData;
    if (
        from &&
        to &&
        ((Array.isArray(from) && typeof to === 'object') || (Array.isArray(to) && typeof from === 'object'))
    ) {
        const trData = tranMapOdLineData(odData);
        const odSeries = getSeriesLines(trData.data, trData.color);
        const effectData = tranMapOdEffectDataData(trData.data as unknown as Array<MapOdLineDataItem>);
        const oDEffectSeries = getSeriesODEffectScatter(
            effectData as unknown as EffectScatterPointDataFour[],
            trData.color,
        );
        return [odSeries, oDEffectSeries];
    }
    return [];
}

export const EchartMapGeo: React.FC<PropsWithStyle<EchartMapProps>> = ({
    style,
    className,
    pointData,
    barData,
    mapData,
    odData,
    geoInfo,
    rankData,
    labelData,
    config = defaultConfig,
    onMapSelectchanged,
    onMapClick,
    onGoBack,
    onDrill,
}) => {
    // DOM节点
    const backRef = useRef<HTMLDivElement>(null);
    // ECharts实例
    const [chart, setChart] = useState<ECharts>();
    // 地图数据源
    const [registerMap] = useRegisterMap(geoInfo);
    // ECharts配置
    const [option, setOption] = useState<EChartsOption | null>();

    useDebounce(
        () => {
            if (chart) {
                echarsGeoMapEvent({
                    mapChart: chart,
                    config: {
                        drillLevel: config?.drillLevel,
                    },
                    backElement: backRef.current,
                    onMapSelectchanged: onMapSelectchanged,
                    onMapClick: onMapClick,
                    registerMapInfo: registerMap,
                    onGoBack: onGoBack,
                    onDrill: onDrill,
                });
            }
        },
        50,
        [chart, registerMap, mapData, config?.drillLevel],
    );

    useDebounce(
        async () => {
            let option: EChartsOption = getDefaultOption();
            if (!registerMap?.mapName) {
                return;
            }

            if (geoInfo?.code == 300000) {
                option['geo'] =  getOptionHbFGWGeoWorld(registerMap?.mapName, mapData, config, registerMap);
            } else {
                option['geo'] =  getOptionGeo(registerMap?.mapName, mapData, config, registerMap);
            }

            // 地图区域着色数据处理
            if (Array.isArray(mapData)) {
                const trMapData: Array<MapIndicatorData> = [];
                const { mappingCode } = registerMap;
                const mapSelectMapping: Record<string, boolean> = {};
                if (config?.mapSelect) {
                    const mapSelect = config?.mapSelect;
                    if (Array.isArray(mapSelect)) {
                        mapSelect?.map((item) => {
                            mapSelectMapping[item] = true;
                        });
                    } else {
                        mapSelectMapping[mapSelect] = true;
                    }
                }
                mapData.forEach((item) => {
                    const {
                        name,
                        region_name,
                        region_code,
                        val,
                        value,
                        index_code_full_cname,
                        unit,
                        unit_name,
                        city_code,
                    } = item;

                    const trId = city_code || region_code;
                    const trPName = name || region_name;
                    const trName = trId ? mappingCode[trId] : trPName;

                    const selected =
                        mapSelectMapping[region_code] || mapSelectMapping[region_name] || mapSelectMapping[name ?? '']
                            ? true
                            : false;

                    trMapData.push({
                        id: trName,
                        cityCode: trName,
                        name: trName,
                        region_name: trName,
                        selected: selected,
                        data: [
                            {
                                name: index_code_full_cname,
                                value: val ?? value,
                                unit: unit || unit_name,
                            },
                        ],
                    });
                });
                option = renderEchartsMapAndVisualMap(option, registerMap, trMapData, config);
            }

            // 柱状图数据处理
            if (Array.isArray(barData)) {
                const seriesGeoBar = getSeriesGeoBar3(barData, config);
                if (option.series) {
                    option.series = Array.isArray(option.series) ? option.series : [option.series];
                    option.series = [...option.series, ...seriesGeoBar];
                }
            }

            // 打点数据处理
            if (Array.isArray(pointData)) {
                const trData: Array<{
                    effectIco: string | number;
                    name: string;
                    value: [number, number];
                    selected: boolean;
                    apiData: PointItemType;
                }> = [];
                const trDataSelect: Array<{
                    effectIco: string | number;
                    name: string;
                    value: [number, number];
                    selected: boolean;
                    apiData: PointItemType;
                }> = [];
                const markObj: Record<string, string | number> = {};

                const pointSelect = config?.pointSelect;
                if (Array.isArray(pointSelect)) {
                    pointSelect.map((item) => {
                        markObj[item] = item;
                    });
                }

                const { pointSymbols = [7, 8] } = config;
                pointData.map((item) => {
                    const { park_id, park_name, area_name, region_name, ent_name } = item;
                    const name: string = `${item.name || park_name || ent_name || area_name || region_name}`;
                    const lon = Number(item.lon || item.lng);
                    const lat = Number(item.lat);
                    const id: string = `${park_id || name}`;
                    // 经纬度，  纬度longitude  0-90 ,有项目取反，需要注意, 经度latitude, 此处改回。
                    // 经度longitude , 180-0-180 , latitude 90-0-90 !!!
                    if (markObj[id]) {
                        trData.push({
                            effectIco: pointSymbols[0],
                            name: name,
                            value: [lon, lat],
                            selected: true,
                            apiData: item,
                        });
                    } else {
                        trDataSelect.push({
                            effectIco: pointSymbols[1],
                            name: name,
                            value: [lon, lat],
                            selected: false,
                            apiData: item,
                        });
                    }
                });
                option = renderEffectScatter(option, [trData, trDataSelect]);
            }

            option.series =
                option.series === undefined ? [] : Array.isArray(option.series) ? option.series : [option.series];

            // topK排名使用
            if (Array.isArray(rankData)) {
                const seriesGeoTopK = getSeriesGeoTopK(rankData, config);
                option.series = [...option.series, ...seriesGeoTopK];
            }

            // 标签数据处理
            if (Array.isArray(labelData)) {
                const seriesGeoTopK = getSeriesGeoLabel(labelData, config);
                option.series = [...option.series, ...seriesGeoTopK];
            }

            // OD数据处理
            if (Array.isArray(odData)) {
                odData.map((item: OdDataProps) => {
                    if (option.series !== undefined) {
                        option.series = [
                            ...(Array.isArray(option.series) ? option.series : [option.series]),
                            ...getOdSeriesArr(item),
                        ];
                    }
                });
            } else if (typeof odData == 'object') {
                option.series = [...option.series, ...getOdSeriesArr(odData)];
            }
            const deepOption = defaultsDeep(cloneDeep(config?.option ?? {}), option);
            setOption(deepOption);
        },
        100,
        [registerMap, pointData, mapData, barData, odData, config, labelData],
    );

    // 渲染Echars内容
    useEffect(() => {
        if (chart && option) {
            chart.setOption(option, true);
        }
    }, [chart, option]);

    useEffect(() => {
        if (!registerMap) {
            setOption(null);
        }
    }, [registerMap]);

    return (
        <div
            ref={backRef}
            style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                ...style,
            }}
            className={className}
        >
            <MapBgImgSpin></MapBgImgSpin>
            {option ? <BaseEcharts setChart={setChart} option={option} renderer="canvas" /> : <Loading />}
        </div>
    );
};
export default React.memo(EchartMapGeo);
