/*
 * @Description: geo地图数据Option 生成
 * @Version: 1.0
 * @Autor: Sungy
 * @Date: 2021-11-25 15:43:01
 * @LastEditors: sungy
 * @LastEditTime: 2023-12-21 19:27:19
 */

import {
    Color,
    EChartsOption,
    EffectScatterSeriesOption,
    LabelLayoutOptionCallback,
    LinearGradientObject,
    LinesSeriesOption,
    ScatterSeriesOption,
    SeriesOption,
    VisualMapComponentOption
} from 'echarts';
import { BarItemType, EchartMapProps } from '../index';
import symbolsIcon from './symbols';

export type LabelLayoutCallbackParams = Parameters<LabelLayoutOptionCallback>['0']


// 地图基础option
export function getDefaultOption(): Partial<EChartsOption> {
    return {
        title: {
            text: '',
            textStyle: {},
        },
        backgroundColor: '#ffffff00',
        tooltip: {
            show: true,
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
            },
            textStyle: {
                fontSize: 16,
            },
        },
        series: [],
    };
}

/**
 * 【opiton】 地图 visualMap样式
 * @param min 最小值
 * @param max 最大值
 * @param isPieces 连续映射 or 分段映射
 * @returns
 */
export function getOptionVisualMap(
    min: number,
    max: number,
    { isPieces = false, piecesColors = ['#E04E2080', '#F8CF3680', '#8ECA4380', '#129AE780'] },
): VisualMapComponentOption {
    // 默认行为
    if (!isPieces) {
        return {
            min: min,
            max: max,
            left: '3%',
            bottom: '5%',
            calculable: true,
            seriesIndex: [0],
            itemHeight: 100,
            outOfRange: {
                color: ['#FFFFFF00', '#FFFFFF00'],
            },
            inRange: {
                color: ['#0AB66380', '#0A95B680', '#0A32B680', '#9DB60A80', '#B6650A80', '#B63B0A80'],
                symbolSize: [30, 100],
            },
            textStyle: {
                color: '#FFF',
                fontSize: 16,
            },
        };
    } else {
        // #E04E20  #F8CF36  #8ECA43  #129AE7      高到低
        const pieces = getPieces(min, max, piecesColors);

        return {
            min: min,
            max: max,
            pieces: pieces,
            seriesIndex: [0],
            textStyle: {
                color: '#FFF',
                fontSize: 16,
            },
        };
    }
}

// 【effects-map】地图面数据渲染
// export function getSeriesMap(mapName: string, mapData: any) {
//     return {
//         type: 'map',
//         geoIndex: 0,
//         selectedMode: false,
//         map: mapName,
//         data: mapData,
//     };
// }

// 【effects-map】地图面 空数据渲染
// export function getSeriesEmptyMap(mapName: string, mapData: any, registerMapInfo: any, getMapPrams: any) {
//     const { selectedMapRegion } = getMapPrams;
//     const geoToData: any = [];
//     registerMapInfo?.mapData.forEach((element: any) => {
//         const { name, cityCode, properties } = element;
//         geoToData.push({
//             name: name,
//             cityCode: cityCode,
//             selected: selectedMapRegion == name || selectedMapRegion == cityCode ? true : false,
//             properties: properties,
//         });
//     });

//     return {
//         name: 'echarGeoSeriesEmpty',
//         type: 'map',
//         selectedMode: 'single',
//         geoIndex: 0,
//         map: mapName,
//         data: geoToData,
//     };
// }



// const getEffectScatterToolTip: TooltipComponentFormatterCallback<TooltipParams> = (params) => {
//     const { data } = params?.data?.properties ?? '';
//     return `<div style='text-align:left'>
//     ${params.name} <br />
//     ${data?.name ?? ''}&nbsp
//     ${data?.value ?? ''}
//     ${data?.unit ?? ''}
//     </div>`;
// }


export interface EffectScatterPointData {
    name: string;
    apiData: {
        name: string;
        value: string;
        unit: string;
        city_code: string
        id: string
        lat: number
        lon: number
        park_id: number
        pro_code: string
    }
}

// 【series-effectS】散点渲染
export function getSeriesEffectScatter(pointData: EffectScatterPointData[]): EffectScatterSeriesOption {
    return {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        showEffectOn: 'render',
        selectedMode: false,
        // geoIndex:0,
        symbol: 'circle',
        // hoverAnimation: true,
        symbolSize: 12,
        zlevel: 21,
        rippleEffect: {
            brushType: 'stroke',
        },
        itemStyle: {
            color: '#fbb801',
        },
        select: {
            itemStyle: {
                color: '#d3401d',
            },
        },
        tooltip: {
            trigger: 'item',
            formatter(p) {
                const { name, value, unit } = (p?.data as EffectScatterPointData).apiData ?? {};
                if (p.name) {
                    return `<div style='text-align:left;font-size:18px;'>
                    ${p.name}
                    ${name ? '<br />' : ''}
                    ${value ?? ''}
                    ${unit ?? ''}
                    </div>`;
                } else {
                    return '';
                }
            },
        },
        data: pointData,
    };
}

export interface EffectScatterPointDataTwo {
    name: string;
    apiData: {
        index_code_full_cname: string
        val: number | string,
        unit_name: string
    }
}
// 【series-effectS】散点渲染
export function getSeriesIcoEffectScatter(pointData: EffectScatterPointDataTwo[], symbol: string, symbolSize = 35): EffectScatterSeriesOption {
    return {
        // name: pointData?.name ?? '',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        showEffectOn: 'emphasis',
        selectedMode: 'single',
        symbol: symbol,
        symbolSize: symbolSize,
        symbolOffset: [0, '-50%'],
        rippleEffect: {
            brushType: 'stroke',
            period: 3,
            scale: 2,
        },
        itemStyle: {
            opacity: 1,
        },
        emphasis: {
            itemStyle: {
                opacity: 1,
            }
        },
        select: {
            itemStyle: {
                opacity: 1,
            },
        },
        zlevel: 22,
        tooltip: {
            trigger: 'item',
            formatter(p) {
                const { index_code_full_cname: name, val: value, unit_name: unit } = (p?.data as EffectScatterPointDataTwo)?.apiData ?? {};
                if (p.name) {
                    return `<div style='text-align:left'>
                    <b>${p.name}</b>
                    ${name ? '<br />' : ''}
                    ${name ?? ''}&nbsp
                    ${value ?? ''}
                    ${unit ?? ''}
                    </div>`;
                } else {
                    return '';
                }
            },
        },
        data: pointData,
    };
}

interface EffectScatterPointDataThree {
    name: string
    properties: {
        data: {
            name?: string;
            value?: string;
            unit?: string;
        }
    }
}

export function getSeriesIcoEffectScatter0(pointData: Array<EffectScatterPointDataThree>, symbol: string): EffectScatterSeriesOption {
    return {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        showEffectOn: 'emphasis',
        // hoverAnimation: true,
        selectedMode: 'single',
        // 火车
        symbol: symbol,
        symbolSize: 35,
        rippleEffect: {
            brushType: 'stroke',
            period: 2.5,
            scale: 2.5,
        },
        itemStyle: {
            opacity: 0.5,
        },
        emphasis: {
            itemStyle: {
                opacity: 0.3,
            }
        },
        select: {
            itemStyle: {
                opacity: 1,
            },
        },
        zlevel: 22,
        tooltip: {
            trigger: 'item',
            formatter(params) {
                const { data } = (params?.data as EffectScatterPointDataThree)?.properties ?? '';
                return `<div style='text-align:left'>
                ${params.name} <br />
                ${data?.name ?? ''}&nbsp
                ${data?.value ?? ''}
                ${data?.unit ?? ''}
                </div>`;
            },
        },
        data: pointData,
    };
}


export interface EffectScatterPointDataFour {
    name: string,
    properties: {
        name: string,
        val: string,
        unit_name: string,
        region_name: string
    }
}
// 【series-effectS】散点渲染
export function getSeriesODEffectScatter(pointData: EffectScatterPointDataFour[], color: Color): EffectScatterSeriesOption {
    return {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        showEffectOn: 'render', //加载完毕显示特效
        symbol: 'circle',
        symbolSize: 8,
        // hoverAnimation: true,
        zlevel: 21,
        rippleEffect: {
            brushType: 'stroke',
        },
        itemStyle: {
            color: color,
        },
        tooltip: {
            trigger: 'item',
            formatter(p) {
                let content = '';
                const item = (p?.data as EffectScatterPointDataFour)?.properties;
                content += item?.name ?? '';
                item?.name && (content += '&nbsp');
                content += item?.val ?? '';
                content += item?.unit_name ?? '';
                content += '<br/>';
                return `<div style='text-align:left;'>
                <b>${item?.region_name} </b> 
                <br />
                <div style='margin-top:5px'>
                ${content}
            <div>
                </div>`;
            },
        },
        data: pointData,
    };
}


export interface FluidEffectLineData {
    name: string
    fromProperties: {
        name: string;
        val: string;
        unit_name: string;
        region_name: string;
        lng?: number;
        lat?: number; 
        properties: {
            name: string,
            val: string,
            unit_name: string,
            region_name: string
        }
    },
    toProperties: {
        name: string;
        val: string;
        unit_name: string;
        region_name: string;
        lng?: number;
        lat?: number; 
    }
}

// 【series-lines】od 线流动效果
export function getSeriesLines(lineData: Array<FluidEffectLineData>, color: string): LinesSeriesOption {
    return {
        type: 'lines',
        zlevel: 22,
        // showEffectOn: 'render',
        coordinateSystem: 'geo',
        effect: {
            show: true,
            period: 5,
            trailLength: 0.2,
            symbol: 'arrow',
            symbolSize: 4,
            color: color,
        },
        lineStyle: {
            color: color,
            width: 0.6,
            opacity: 0.2,
            curveness: 0.3,
        },
        tooltip: {
            trigger: 'item',
            formatter(p) {
                const { fromProperties, toProperties } = (p?.data as FluidEffectLineData) ?? {};
                let content = '';
                {
                    content += fromProperties?.name ?? '';
                    fromProperties?.name && (content += '&nbsp');
                    content += fromProperties?.val ?? '';
                    content += fromProperties?.unit_name ?? '';
                    content != '' && (content += '<br/>');
                }
                {
                    content += toProperties?.name ?? '';
                    toProperties?.name && (content += '&nbsp');
                    content += toProperties?.val ?? '';
                    content += toProperties?.unit_name ?? '';
                }
                return `<div style='text-align:left'>
                <b> ${fromProperties.region_name} ---> ${toProperties.region_name} </b>
                <br/>
                <div style='margin-top:5px'>
                    ${content}
                <div>
                </div>`;
            },
        },
        data: lineData,
    };
}

// 【series-effectS】柱子1
// export function getSeriesGeoBar(barData: any, config?: EchartMapProps['config']): SeriesOption {
//     let maxValue = Math.max(...barData.map((item: any) => item.data[0].value));

//     const { maxBarFactor = 0.5 } = config ?? {};
//     maxValue = maxBarFactor / maxValue;
//     // 柱状体的主干
//     function lineData() {
//         return barData.map((item: any) => {
//             let [g1, g2] = item?.centroid ?? {};
//             let v = item?.data[0]?.value;
//             g1 = parseFloat(g1);
//             g2 = parseFloat(g2);
//             v = parseFloat(v);
//             return {
//                 coords: [
//                     [g1, g2],
//                     [g1, g2 + v * maxValue],
//                 ],
//             };
//         });
//     }
//     // 柱状体的顶部
//     function scatterData() {
//         return barData.map((item: any) => {
//             let [g1, g2] = item?.centroid ?? {};
//             let v = item?.data[0]?.value;
//             g1 = parseFloat(g1);
//             g2 = parseFloat(g2);
//             v = parseFloat(v);
//             return [g1, g2 + v * maxValue, item];
//         });
//     }


//     const barColor: LinearGradientObject = {
//         //线性渐变
//         type: 'linear',
//         x: 0,
//         y: 0,
//         x2: 0,
//         y2: 1,
//         colorStops: [
//             {
//                 offset: 0,
//                 color: 'rgba(1, 255, 255, 0.8)', // 0% 处的颜色
//             },
//             {
//                 offset: 1,
//                 color: 'rgba(1, 255, 255,0)', // 100% 处的颜色
//             },
//         ],
//         global: false, // 缺省为 false
//     };
//     const barTopColor: LinearGradientObject = {
//         //线性渐变
//         type: 'linear',
//         x: 0,
//         y: 0,
//         x2: 0,
//         y2: 1,
//         colorStops: [
//             {
//                 offset: 0,
//                 color: 'rgb(22,255,255, 1)', // 0% 处的颜色
//             },
//             {
//                 offset: 1,
//                 color: 'rgb(22,255,255, 1)', // 100% 处的颜色
//             },
//         ],
//     };
//     const barShadowColor: LinearGradientObject = {
//         type: 'linear',
//         x: 0,
//         x2: 1,
//         y: 0,
//         y2: 0,
//         colorStops: [
//             { offset: 0, color: 'rgba(0, 0, 0, 0.30)' },
//             { offset: 0.5, color: 'rgba(0, 0, 0, 0.30)' },
//             { offset: 0.5, color: 'rgba(0, 0, 0, 0)' },
//             { offset: 1, color: 'rgba(0, 0, 0, 0)' },
//         ],
//         global: false,
//     }

//     return [
//         {
//             type: 'lines',
//             zlevel: 31,
//             effect: {
//                 show: false,
//             },
//             lineStyle: {
//                 width: 30, // 尾迹线条宽度
//                 color: barShadowColor,
//                 opacity: 1, // 尾迹线条透明度
//                 curveness: 0, // 尾迹线条曲直度
//             },
//             silent: true,
//             data: lineData(),
//         },
//         {
//             type: 'lines',
//             zlevel: 31,
//             effect: {
//                 show: false,
//             },
//             lineStyle: {
//                 width: 30, // 尾迹线条宽度
//                 color: barColor,
//                 opacity: 1, // 尾迹线条透明度
//                 curveness: 0, // 尾迹线条曲直度
//             },
//             silent: true,
//             data: lineData(),
//         },
//         // 柱状体的顶部
//         {
//             type: 'scatter',
//             coordinateSystem: 'geo',
//             geoIndex: 0,
//             zlevel: 31,
//             symbol: 'diamond',
//             symbolPosition: 'end',
//             symbolOffset: [0, 0],
//             symbolSize: [30, 20],
//             itemStyle: {
//                 color: barTopColor,
//                 opacity: 1,
//             },
//             silent: true,
//             data: scatterData(),
//         },
//         {
//             type: 'scatter',
//             coordinateSystem: 'geo',
//             geoIndex: 0,
//             zlevel: 31,
//             label: {
//                 show: true,
//                 position: [40, 0],
//                 formatter(params) {
//                     const { value, unit } = params?.data[2]?.data[0] ?? {};
//                     return value + ' ' + unit;
//                 },
//                 padding: [12, 10, 10, 10],
//                 backgroundColor: '#0000008c',
//                 borderRadius: 0,
//                 borderColor: '#0000008c',
//                 borderWidth: 0,
//                 color: '#FFF',
//                 fontSize: 16,
//             },
//             symbol: 'circle',
//             symbolSize: [35, 5],
//             itemStyle: {
//                 color: '#FFFFFF00',
//                 opacity: 1,
//             },
//             silent: true,
//             data: scatterData(),
//         },
//     ];
// }

export type BarDateItem = {
    centroid: [number | string, number | string];
    data: [{ value: number }];
};

/**
 * 【series-effectS】柱子3， 河北发改委使用，
 * TODO：数据结构可能会变化,需要适配新的数据结构。
 * @param barData
 * @param config
 * @returns
 */
export function getSeriesGeoBar3(barData: Array<BarItemType>, config?: EchartMapProps['config']): Array<SeriesOption> {

    let maxValue = Math.max(...barData.map((item) => item.data[0].value));

    const { maxBarFactor = 0.5 } = config ?? {};
    maxValue = maxBarFactor / maxValue;
    // 柱状体的主干
    function lineData() {
        return barData.map((item) => {
            let [g1, g2] = item?.centroid ?? [0, 0];
            let v = item?.data[0]?.value;
            const unit = item?.data[0]?.unit;
            g1 = Number(g1);
            g2 = Number(g2);
            v = Number(v);
            return {
                coords: [
                    [g1, g2],
                    [g1, g2 + v * maxValue],
                ],
                // 给formatter 使用
                value: v,
                unit: unit,
                ...item,
            };
        });
    }
    // 柱状体的顶部
    function scatterData() {
        return barData.map((item) => {
            let [g1, g2] = item?.centroid ?? {};
            let v = item?.data[0]?.value;
            g1 = Number(g1);
            g2 = Number(g2);
            v = Number(v);
            return [g1, g2 + v * maxValue, item];
        });
    }

    const barShadowColor: LinearGradientObject = {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        // 0-100 ，自底向上配置
        colorStops: [
            {
                offset: 0,
                color: 'rgba(18, 214, 187, 0.40)', // 0% 处的颜色
            },
            {
                offset: 0.4,
                color: 'rgba(18, 214, 187, 0.40)', // 0% 处的颜色
            },
            {
                offset: 0.7,
                color: 'rgba(18, 214, 187, 0)', // 100% 处的颜色
            },
            {
                offset: 1,
                color: 'rgba(18, 214, 187, 0)', // 100% 处的颜色
            },
        ],
        global: false, // 缺省为 false
    }

    return [
        {
            type: 'lines',
            zlevel: 5,
            effect: {
                show: false,
            },
            lineStyle: {
                width: 18,
                color: barShadowColor,
                opacity: 1, // 尾迹线条透明度
                curveness: 0, // 尾迹线条曲直度
            },
            label: {
                show: false,
                position: 'end',
            },
            emphasis: {
                label: {
                    show: true,
                    formatter(params) {
                        const { name = '', value = '', unit = '' } = (params?.data as { name: string, value: string, unit: string }) ?? {};
                        const str = `${name}: ${value}${unit}`;
                        return str;
                    },
                    // position: [100, 0],
                    padding: [12, 10, 10, 10],
                    backgroundColor: '#0000008c',
                    borderRadius: 0,
                    borderColor: '#0000008c',
                    borderWidth: 0,
                    color: '#FFF',
                    fontSize: 16,
                },
            },
            silent: false,
            data: lineData(),
        },
        // 柱状体的顶部
        {
            type: 'scatter',
            coordinateSystem: 'geo',
            geoIndex: 0,
            zlevel: 31,
            // symbol: 'diamond',
            symbol: symbolsIcon.normalIcon,
            // symbolPosition: 'end',
            symbolOffset: [0, 0],
            symbolSize: [18, 18],
            silent: true,
            data: scatterData() as ScatterSeriesOption['data'],
        },
    ];
}

// 【series-effectS】柱子1
// export function getSeriesGeoBar2(pointData: any) {
//     // 动态计算柱形图的高度（定一个max）
//     let maxValue = Math.max(...pointData.map((item: any) => item.data.value));
//     maxValue = 1 / maxValue;

//     // 柱状体的主干
//     function lineData() {
//         return pointData.map((item: any) => {
//             let [g1, g2, v] = item.value;
//             g1 = parseFloat(g1);
//             g2 = parseFloat(g2);
//             v = parseFloat(v);
//             return {
//                 coords: [
//                     [g1, g2],
//                     [g1, g2 + v * maxValue],
//                 ],
//             };
//         });
//     }
//     // 柱状体的顶部
//     function scatterData() {
//         return pointData.map((item: any) => {
//             let [g1, g2, v] = item.value;
//             g1 = parseFloat(g1);
//             g2 = parseFloat(g2);
//             v = parseFloat(v);
//             return [g1, g2 + v * maxValue];
//         });
//     }

//     return [
//         {
//             type: 'lines',
//             zlevel: 31,
//             effect: {
//                 show: false,
//             },
//             lineStyle: {
//                 width: 32, // 尾迹线条宽度
//                 color: {
//                     //线性渐变
//                     type: 'linear',
//                     x: 0,
//                     x2: 1,
//                     y: 0,
//                     y2: 0,
//                     colorStops: [
//                         { offset: 0, color: 'rgba(0, 0, 0, 0.30)' },
//                         { offset: 0.5, color: 'rgba(0, 0, 0, 0.30)' },
//                         { offset: 0.5, color: 'rgba(0, 0, 0, 0)' },
//                         { offset: 1, color: 'rgba(0, 0, 0, 0)' },
//                     ],
//                     global: false, // 缺省为 false
//                 },
//                 opacity: 1, // 尾迹线条透明度
//                 curveness: 0, // 尾迹线条曲直度
//             },
//             silent: true,
//             data: lineData(),
//         },
//         {
//             type: 'lines',
//             zlevel: 32,
//             effect: {
//                 show: false,
//             },
//             lineStyle: {
//                 width: 30, // 尾迹线条宽度
//                 color: {
//                     //线性渐变
//                     type: 'linear',
//                     x: 0,
//                     y: 0,
//                     x2: 0,
//                     y2: 1,
//                     colorStops: [
//                         {
//                             offset: 0,
//                             color: 'rgba(66, 159, 245, 0.8)', // 0% 处的颜色
//                         },
//                         {
//                             offset: 1,
//                             color: 'rgba(66, 159, 245,0)', // 100% 处的颜色
//                         },
//                     ],
//                     global: false, // 缺省为 false
//                 },
//                 opacity: 1, // 尾迹线条透明度
//                 curveness: 0, // 尾迹线条曲直度
//             },
//             silent: true,
//             data: lineData(),
//         },
//         // 柱状体的顶部
//         {
//             type: 'scatter',
//             coordinateSystem: 'geo',
//             geoIndex: 0,
//             zlevel: 32,
//             symbol: 'diamond',
//             symbolPosition: 'end',
//             symbolOffset: [0, 0],
//             symbolSize: [30, 20],
//             itemStyle: {
//                 color: 'rgb(152,206,255,1)',
//                 opacity: 1,
//             },
//             silent: true,
//             data: scatterData(),
//         },
//     ];
// }

interface Piece {
    color: string;
    lte?: number;
    gt?: number;
    [x: string]: number | string | undefined;
}

/**
 * 获取分段颜色
 * @param min 最小值
 * @param max 最大值
 * @param pieces 分段颜色数组
 * @returns
 */
function getPieces(min: number, max: number, pieces: string[]) {
    if (!Array.isArray(pieces) || pieces.length === 0) {
        throw new TypeError('getPieces:pieces 有误');
    }
    if (typeof min !== 'number' || typeof max !== 'number') {
        throw new TypeError('getPieces:min,max 必须是数字');
    }

    const len = pieces.length;
    const step = Math.ceil((max - min) / len);

    const res: Piece[] = pieces.map((item, index) => {
        return {
            color: item,
            lte: max - step * index,
            gte: Math.max(max - step * (index + 1), min),
        };
    });

    return res;
}

/**
 * topK 排名数据转换
 * @param rankData
 * @returns
 */
const convertRankData = (rankData: EchartMapProps['rankData'] = []) => {
    const res = rankData.map((item) => {
        const { name, lon, lat, rank, value } = item ?? {};
        return {
            ...item,
            name,
            value: [lon, lat, rank, value],
        };
    });

    return res;
};

/**
 * 计算symbol size 大小
 * val = k * val + b;
 * 可以按照排名获取不同大小symbol
 * @param param0
 */
const getSymbolSize = ({ symbolSizeMax = 50, symbolSizeMin = 50, rankMax = -1, rankMin = -1 }) => {
    //  计算比例
    const k = (symbolSizeMax - symbolSizeMin) / (rankMax - rankMin);
    const b = symbolSizeMin;

    return {
        k: k,
        b: b,
    };
};

/**
 * topK 排名series生成
 * @param rankData
 * @param config
 * @returns
 */
export function getSeriesGeoTopK(rankData: EchartMapProps['rankData'], config: EchartMapProps['config']): SeriesOption[] {
    const { rankSeriesConfig } = config ?? {};
    const modifiedRankData = convertRankData(rankData);
    const ranks = modifiedRankData.map((item) => item?.rank);
    const rankMax = Math.max(...ranks);
    const rankMin = Math.min(...ranks);

    return [
        {
            name: 'topK',
            type: 'scatter',
            coordinateSystem: 'geo',
            tooltip: {
                show: false,
            },
            symbol: 'pin',
            symbolSize: function (val: Array<number>) {
                const { k, b } = getSymbolSize({ ...rankSeriesConfig, rankMax, rankMin });
                return (rankMax - val[2]) * k + b;
            },
            label: {
                show: true,
                color: '#fff',
                fontSize: 14,
                // textStyle: {
                //     color: '#fff',
                //     fontSize: 14,
                // },
                // formatter: (params: Record<string, any>) => {
                //     //  value:[lon,lat,rank,value] , 目前需求显示rank
                //     return params.value[2];
                // },
                formatter(params) {
                    // value:[lon,lat,rank,value] , 目前需求显示rank
                    return Array.isArray(params.value) ? `${params.value[2]}` : '';
                },

                // normal: {
                //     show: true,
                //     textStyle: {
                //         color: '#fff',
                //         fontSize: 14,
                //     },
                //     formatter: (params: Record<string, any>) => {
                //         //  value:[lon,lat,rank,value] , 目前需求显示rank
                //         return params.value[2];
                //     },
                // },
            },
            itemStyle: {
                color: '#F62157', //颜色
                // normal: {
                //     color: '#F62157', //颜色
                // },
            },
            zlevel: 22,
            data: modifiedRankData as ScatterSeriesOption['data'],
        },
    ];
}

/**
 * 标签数据转换
 * @param labelData 原始标签数据数组
 * @returns 转换后的标签数据数组，适配ECharts散点图
 */
const convertLabelData = (labelData: EchartMapProps['labelData'] = []) => {
    const res = labelData.map((item) => {
        const { lon, lat, value, unit, name, children } = item ?? {};
        return {
            name,
            value: [lon, lat, name, value, unit, children],
        };
    });

    return res;
};

/**
 * 标签图层生成
 * @param labelData
 * @param config
 * @returns
 */
export function getSeriesGeoLabel(labelData: EchartMapProps['labelData'], config: EchartMapProps['config']): ScatterSeriesOption[] {
    // const { labelSeriesConfig } = config || {};
    const modifiedLabelData = convertLabelData(labelData) as ScatterSeriesOption['data'];

    return [
        {
            name: 'scatter-label',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: 'circle',
            tooltip: {
                show: false,
            },
            symbolSize: 10,
            label: {
                show: true,
                backgroundColor: '#347ff6',
                color: '#fff',
                formatter(params) {
                    if (!Array.isArray(params.value)) return '';
                    const [lon, lat, name, value, unit, children] = params.value as [number, number, string, number, string, Array<{ name: string, value: number, unit: string }>];

                    let str = `${name}  ${value}${unit}`;
                    children &&
                        children.map((item) => {
                            str += `\n    ${item.name}  ${item.value}${item.unit}`;
                        });

                    return str;
                },
                borderRadius: [0, 10, 0, 10],
                borderWidth: 1,
                padding: [15, 15],
            },
            labelLine: {
                show: true,
            },
            labelLayout: (params: LabelLayoutCallbackParams) => {
                return {
                    x: params.rect.x + 30,
                    y: params.rect.y - 30,
                    verticalAlign: 'middle',
                    align: 'left',
                    moveOverlap: 'shiftY',
                    hideOverlap: false,
                };
            },
            zlevel: 22,
            data: modifiedLabelData,
        },
    ];
}
