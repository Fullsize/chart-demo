/*
 * @Description: 地图组件入口
 * @Version: 1.0
 * @Autor: Sungy
 * @Date: 2021-11-25 14:09:13
 * @LastEditors: sungy
 * @LastEditTime: 2023-12-27 10:56:56
 */
import { ECElementEvent, ECharts, EChartsOption, MapSeriesOption } from 'echarts';
import { EffectScatterPointData, EffectScatterPointDataTwo, getOptionVisualMap, getSeriesEffectScatter, getSeriesIcoEffectScatter } from './echarsGeoMap';
import { KeyofEffectIco, effectIco } from './symbols';
import { EchartMapProps, MapIndicatorData, PointItemType } from '..';
import { ApiFeatureProperty, MapRegisterInfo } from './apiDataTransform';


export interface MapSeriesData {
    name: string,
    cityCode: string,
    apiData: MapIndicatorData,
    value: number,
    selected: boolean,
}

// 渲染面分布图 及 VisualMap
export function renderEchartsMapAndVisualMap(option: EChartsOption, registerMap: MapRegisterInfo, mapData: Array<MapIndicatorData>, config?: EchartMapProps['config']) {
    if (!Array.isArray(mapData)) {
        return option;
    }
    const { mapName } = registerMap;
    const seriesMapData: Array<MapSeriesData> = [];
    let minMaxArr: number[] = [];

    mapData.forEach((item) => {
        const { cityCode, name, data, selected } = item;
        let value: string | number;

        if (Array.isArray(data)) {
            value = data[0]?.value;
        } else if (typeof data === 'object') {
            value = (data as { value: string })?.value;
        } else {
            value = data;
        }
        value = parseFloat(value);

        if (value !== undefined || value !== null || !isNaN(value)) {
            minMaxArr.push(value);
        }

        seriesMapData.push({
            name: name,
            cityCode: cityCode,
            apiData: item,
            value: value,
            selected: selected,
        });
    });

    const seriesOption: MapSeriesOption = {
        type: 'map',
        geoIndex: 0,
        selectedMode: config?.selectedMode ?? 'single',
        map: mapName,
        data: seriesMapData,
        tooltip: {
            trigger: 'item',
            formatter(p) {
                const params = p?.data as { apiData: MapIndicatorData };
                const data = params?.apiData?.data;
                let domStr = '';
                if (Array.isArray(data)) {
                    data.map((item) => {
                        const { name, value, unit } = item;
                        domStr += `<br />
                        ${name ?? ''}
                        ${name ? '&nbsp' : ''}
                        ${value ?? ''}
                        ${unit ?? ''}`;
                    });
                } else {
                    const { name, value, unit } = data ?? {};
                    domStr = `${name ?? ''}
                    ${name ? '&nbsp' : ''}
                    ${value ?? ''}
                    ${unit ?? ''}`;
                }
                return `<div style='text-align:left;font-size:16px'>
                <b>${p?.name}</b>
                ${domStr}
                </div>`;
            },
        },
    }
    if (Array.isArray(option.series)) {
        option.series.push(seriesOption);
    } else {
        option.series = option.series === undefined ? [seriesOption] : [option.series, seriesOption];
    }

    minMaxArr = minMaxArr.sort(function (a: number, b: number) {
        return b - a;
    });

    let min = minMaxArr[minMaxArr.length - 1];
    const max = minMaxArr[0];
    if (min == max) {
        min = 0;
    }

    // 有自定义颜色映射，优先走自定义
    const { customVisualMap } = config ?? {};
    option.visualMap =
        typeof customVisualMap === 'function'
            ? customVisualMap()
            : getOptionVisualMap(min ?? 0, max ?? 100, config ?? {});
    return option;
}


export interface EffectScatterItem {
    effectIco: string | number;
    name: string;
    value: [number, number];
    selected: boolean;
    apiData: PointItemType;
}

// 渲染 点/图标效果数据
export function renderEffectScatter(option: EChartsOption, pointData: [EffectScatterItem[], EffectScatterItem[]]) {
    // 渲染点图
    pointData?.map((item) => {
        let symbol = effectIco['7'];
        if (item.length > 0) {
            symbol = effectIco[item[0]?.effectIco as unknown as KeyofEffectIco];
        }

        if (symbol) {
            if (Array.isArray(option.series)) option.series.push(getSeriesIcoEffectScatter(item as unknown as EffectScatterPointDataTwo[], symbol, 35));
        } else {
            if (Array.isArray(option.series)) option.series.push(getSeriesEffectScatter(item as unknown as EffectScatterPointData[]));
        }
    });
    return option;
}

export interface EChartsGeoMapEvent {
    mapChart: ECharts;
    config: EchartMapProps['config'];
    registerMapInfo?: MapRegisterInfo;
    backElement: HTMLDivElement | null;
    onMapSelectchanged?: (property: Record<string, unknown>, event: 'select' | 'unselect', seriesType: string) => void;
    onMapClick?: (event: ECElementEvent, params?: ApiFeatureProperty) => void;
    onGoBack?: (params: { code: string, treeId?: string, level?: number }) => void;
    onDrill?: (params: { code: string, treeId?: string, level?: number }) => void;
}

export function echarsGeoMapEvent(geoMapPrams: EChartsGeoMapEvent) {
    const { mapChart, config, registerMapInfo, backElement, onMapSelectchanged, onMapClick, onGoBack, onDrill } =
        geoMapPrams;
    mapChart.off('click');
    mapChart.on('click', (params) => {
        if (onMapClick) {
            if (params?.componentType == 'geo' || params?.seriesType == 'map') {
                onMapClick && onMapClick(params, registerMapInfo?.mappingFeatures[params?.name]);
            } else {
                onMapClick && onMapClick(params);
            }
        }

        if (onDrill && params.seriesType == 'map') {
            const cityCode = (params?.data as { cityCode: string })?.cityCode;
            const { adcode, level, treeId } = registerMapInfo?.mappingFeatures[cityCode] ?? {};
            const { minLevel } = config?.drillLevel ?? {};
            if (!minLevel || level && parseInt(level) + 1 > minLevel) {
                return;
            }
            if (adcode && level) {
                onDrill({
                    code: adcode,
                    treeId: treeId,
                    level: parseInt(level) + 1,
                });
            }
        }
    });

    mapChart.off('selectchanged');
    mapChart.on('selectchanged', (evt) => {

        if (!onMapSelectchanged) {
            return;
        }
        const params = evt as { fromActionPayload: { seriesIndex: number, dataIndexInside: number }, fromAction: 'select' | 'unselect', selected: Array<{ name: string }> };
        const { seriesIndex, dataIndexInside } = params?.fromActionPayload ?? {};
        // 库提供的ts类型与文档不一致，需要强制转换
        const option = mapChart.getOption() as EChartsOption;
        const seriesType = Array.isArray(option.series) ? option.series[seriesIndex]?.type : option.series?.type;
        const dataArray = (Array.isArray(option.series) ? option.series[seriesIndex].data : option.series?.data) as Array<{ cityCode: string, apiData: Record<string, unknown> }>;
        const data = dataArray[dataIndexInside];

        if (seriesType == 'map') {
            const properties = registerMapInfo?.mappingFeatures[data?.cityCode] ?? {};
            if (params.fromAction === 'select' && params?.selected?.length > 0) {
                onMapSelectchanged(properties, 'select', seriesType);
            } else if (params.fromAction === 'unselect') {
                onMapSelectchanged(properties, 'unselect', seriesType);
            }
        } else {
            onMapSelectchanged(data?.apiData, 'unselect', seriesType || '');
        }
    });

    // 清除监听
    // 地图右键返回功能
    backElement &&
        backElement.addEventListener('contextmenu', function (evt) {
            evt.preventDefault();
            if (!onGoBack) {
                return;
            }
            const features = registerMapInfo?.geoJsonMapData?.features[0];
            if (!features) {
                return;
            }
            const { pcode, level, treeId } = features?.properties ?? {};
            const { maxLevel } = config?.drillLevel ?? {};
            if (!maxLevel || (Number(level) - 1) < maxLevel) {
                return;
            }

            if (pcode && level && treeId) {
                onGoBack({
                    code: pcode,
                    treeId: treeId,
                    level: Number(level) - 1,
                });
            }
        });
}
