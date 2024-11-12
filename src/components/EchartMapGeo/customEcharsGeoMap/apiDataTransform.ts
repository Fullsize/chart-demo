/*
 * @Description: 数据转换入口
 * @Version: 1.0
 * @Autor: Sungy
 * @Date: 2021-11-26 17:10:48
 * @LastEditors: sungy
 * @LastEditTime: 2024-05-21 09:30:54
 */

import { registerMap } from 'echarts';
import { FeatureCollection, Geometry } from 'geojson';
import { OdDataProps } from '..';
import { FluidEffectLineData } from './echarsGeoMap';

type LowercaseKeys<T> = {
    [K in Extract<keyof T, string> as Lowercase<K>]: T[K];
};

function getKeysIgnoreCase<T extends object>(obj: T): LowercaseKeys<T> {
    return Object.keys(obj).reduce((acc, key) => {
        acc[key.toLowerCase() as keyof LowercaseKeys<T>] = obj[key as keyof T] as LowercaseKeys<T>[keyof LowercaseKeys<T>];
        return acc;
    }, {} as LowercaseKeys<T>);
}


// 接口传入的属性数据
export interface ApiFeatureOriginProperty {
    PAC: string;
    PID: string;
    X: number;
    Y: number;
    CX: number;
    CY: number;
    NAME: string;
    LV: number;
    id: string;
    name: string;
    centroid: string;
    center: string;
    level: string;
    treeid: string;
    pcode: string;
    acroutes: string;
}

// 转换后的属性数据
export type ApiFeatureProperty = Omit<LowercaseKeys<ApiFeatureOriginProperty>, 'center' | 'centroid'> & {
    adcode?: string;
    name: string;
    level: string;
    treeId?: string;
    center: [string, string];
    centroid: [string, string];
};

type MapRegisterData = Parameters<typeof registerMap>[1];

export interface MapDataItem {
    name: string
    cityCode: string
    properties: ApiFeatureProperty
}

export interface MapRegisterInfo {
    mapName: string,
    mapData: Array<MapDataItem>,
    mappingCode: Record<string, string>,
    mappingFeatures: Record<string, ApiFeatureProperty>,
    geoJsonMapData: FeatureCollection<Geometry, ApiFeatureProperty>,
}

// 接口数据 注册Echarts 地图
export function registerEchartsMapByApidata(geoJSON: FeatureCollection<Geometry, ApiFeatureOriginProperty>): MapRegisterInfo {

    const mapData: Array<{ name: string, cityCode: string, properties: ApiFeatureProperty }> = [];
    // 注册地图名称 **全国的需要是 china,地图元素显示南海诸岛
    const mappingCode: Record<string, string> = {};
    const mappingFeatures: Record<string, ApiFeatureProperty> = {};

    const geoJsonMapDataFeatures: FeatureCollection<Geometry, ApiFeatureProperty>['features'] = geoJSON?.features?.map((item) => {
        // 由于达梦数据库不支持函数，为保持与之前的业务一致，将数据统一处理为统一格式。
        const trProperties = getKeysIgnoreCase(item?.properties);
        const { pid, pac, name, level, lv, id, pcode, acroutes, treeid, x, y, cx, cy } = trProperties;

        const property: ApiFeatureProperty = {
            pid,
            pac,
            lv,
            id,
            pcode,
            acroutes,
            adcode: pac,
            name: name,
            level: level,
            treeId: treeid,
            treeid,
            x,
            y,
            cx,
            cy,
            center: [x?.toString(), y?.toString()],
            centroid: [cx?.toString(), cy?.toString()],
        };

        property.adcode = pac;
        property.name = name;
        property.level = level;
        property.treeId = treeid;
        property.center = [x?.toString?.(), y?.toString?.()];
        property.centroid = [cx?.toString?.(), cy?.toString?.()];

        mappingCode[pac] = name;
        mappingFeatures[pac] = property;
        mappingFeatures[name] = property;

        name &&
            mapData.push({
                name: name,
                cityCode: pac,
                properties: property,
            });

        return {
            ...item,
            properties: property
        }
        // return item;
    });

    const mapName = 'map' + geoJSON?.features?.[0]?.properties?.acroutes;
    registerMap(mapName, geoJSON as MapRegisterData);
    return {
        mapName: mapName,
        mapData: mapData,
        mappingCode: mappingCode,
        mappingFeatures: mappingFeatures,
        geoJsonMapData: {
            ...geoJSON,
            features: geoJsonMapDataFeatures
        }
    };
}

export interface MapOdLineDataItem {
    coords: [number, number][],
    fromProperties: FluidEffectLineData & { coords: [number, number][]; },
    toProperties: FluidEffectLineData & { coords: [number, number][]; },
}

export function tranMapOdEffectDataData(tranData: Array<MapOdLineDataItem>) {
    const effectData: Array<{ name: string, properties: FluidEffectLineData, value: [number, number] }> = [];
    tranData?.map((item) => {
        effectData.push({
            name: item?.fromProperties?.name,
            properties: item?.fromProperties,
            value: [item?.coords[0][0], item?.coords[0][1]],
        });
        effectData.push({
            name: item?.toProperties?.name,
            properties: item?.toProperties,
            value: [item?.coords[1][0], item?.coords[1][1]],
        });
    });
    return effectData;
}

export function tranMapOdLineData(preTranData: OdDataProps) {
    const resTranData: { type: string, color: string, data: Array<MapOdLineDataItem['fromProperties'] | MapOdLineDataItem['toProperties']> } = {
        type: '',
        color: '',
        data: [],
    };
    const { from, to } = preTranData;
    if (Array.isArray(from)) {
        resTranData['type'] = 'od_in';
        const toItem = to as FluidEffectLineData['toProperties'];
        from.map((item) => {
            resTranData.data.push({
                name: item?.name,
                fromProperties: item,
                toProperties: toItem,
                coords: [
                    [item?.lng, item?.lat],
                    [toItem?.lng, toItem?.lat],
                ],
            });
        });
    } else if (Array.isArray(to)) {
        const fromItem = from as FluidEffectLineData['fromProperties'];
        to.map((item) => {
            resTranData['type'] = 'od_out';
            resTranData.data.push({
                name: item?.name,
                fromProperties: fromItem,
                toProperties: item,
                coords: [
                    [fromItem?.lng, fromItem?.lat],
                    [item?.lng, item?.lat],
                ],
            });
        });
    }
    resTranData.color = resTranData.type === 'od_in' ? '#F8C96D' : '#52ff9d';
    return resTranData;
}
