import heibeiImg from './img/heibei.png';
import shijiazhuangImg from './img/shijiazhuang.jpg';
import xinjiangImg from './img/xinjiang.jpg';
import hebeiFGWImg from './img/hebeiFGW.png';
import shanxiImg_140000 from './img/shanxi_140000.jpg'; // 山西省纹理，_140000 为了很陕西区分
import { EChartsOption, GeoComponentOption } from 'echarts';
import { EchartMapProps, MapApiIndicatorData } from '..';
import type { IterableElement } from 'type-fest';
import { MapRegisterInfo } from './apiDataTransform';

export default getOptionShanXi_140000_Geo;

export type GeoRegionsOptions = Exclude<GeoComponentOption['regions'], undefined>;
export type GeoRegionsOption = IterableElement<GeoRegionsOptions>;

function getNhRegion(color = '#33333300'): GeoRegionsOption {
    const itemStyle = {
        areaColor: color,
        color: color,
        borderColor: color,
        borderWidth: 1,
    };
    return {
        name: '南海诸岛',
        itemStyle: itemStyle,
        emphasis: {
            itemStyle: itemStyle,
        },
    };
}

// 石家庄地图样式
export async function getOptionSjzGeo(
    mapName: string,
    mapData?: MapApiIndicatorData[],
    config?: EchartMapProps['config'],
    registerMap?: MapRegisterInfo,
): Promise<EChartsOption['geo']> {
    const imageDom = new Image();
    await new Promise((resolve) => {
        imageDom.onload = resolve;
        imageDom.src = shijiazhuangImg;
    });
    const geoMap = {
        selectedMode: false,
        silent: true,
        map: mapName,
        roam: false,
        zoom: 1,
        layoutSize: '85%',
    };

    const resGeo: GeoComponentOption[] = [
        {
            ...geoMap,
            zlevel: -9,
            layoutCenter: ['50%', '50%'],
            silent: false,
            label: {
                show: true,
                fontSize: 16,
                fontWeight: 'bold',
                color: '#b7dbff', //省份标签字体颜色
                formatter(p) {
                    return p.name;
                },
            },
            itemStyle: {
                areaColor: {
                    type: 'radial',
                    x: 0.5,
                    y: 0.5,
                    r: 1,
                    colorStops: [
                        {
                            offset: 0,
                            color: 'rgb(5 30 55 / 0%)' /* 0% 处的颜色*/,
                        },
                        {
                            offset: 0.8,
                            color: 'rgb(0 0 0 / 100%)' /* 100% 处的颜色*/,
                        },
                        {
                            offset: 1,
                            color: 'rgb(0 0 0 / 100%)' /* 100% 处的颜色*/,
                        },
                    ],
                    // globalCoord: true /* 缺省为 false*/,
                },
                borderColor: '#B6E4FB',
                borderType: 'solid',
                borderDashOffset: 5,
                borderWidth: 1,
            },
            emphasis: {
                label: {
                    show: true,
                    color: '#FFFFFFCC',
                },
                itemStyle: {
                    areaColor: mapData ? '#ffbe4de6' : 'rgb(5 65 120 / 10%)',
                    borderColor: '#ffffff1a',
                    borderType: 'solid',
                    borderWidth: 1,
                },
            },
            select: {
                itemStyle: {
                    areaColor: '#ffbe4d',
                    borderColor: 'rgb(255 255 255 / 40%)',
                    borderWidth: 1,
                    shadowColor: 'rgb(9 67 145 / 30%)',
                    shadowBlur: 5,
                    shadowOffsetX: 5,
                    shadowOffsetY: 4,
                },
            },
        },
        {
            ...geoMap,
            zlevel: -10,
            layoutCenter: ['50%', '50%'],
            itemStyle: {
                areaColor: {
                    image: imageDom,
                    repeat: 'repeat',
                },
                borderColor: '#FFFFFF33',
                borderWidth: 2,
            },
        },
        {
            ...geoMap,
            zlevel: -13,
            layoutCenter: ['50%', '51.5%'],
            itemStyle: {
                areaColor: 'rgba(79,244,252,0.7)',
                borderColor: '#AEF1FF',
                borderWidth: 1,
                shadowColor: '#0BD4FF',
                shadowBlur: 30,
                shadowOffsetX: 0,
                shadowOffsetY: 20,
            },
        },
        {
            ...geoMap,
            zlevel: -13,
            layoutCenter: ['50%', '51.5%'],
            itemStyle: {
                areaColor: 'rgba(79,244,252,0.7)',
                borderColor: '#AEF1FF',
                borderWidth: 1,
                shadowColor: 'rgb(0 0 0 / 80%)',
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowOffsetY: 10,
            },
        },
        {
            ...geoMap,
            zlevel: -15,
            layoutCenter: ['50%', '54.5%'],
            itemStyle: {
                borderWidth: 1,
                areaColor: 'rgba(0,115,255,0.3)',
                borderColor: 'rgba(76,244,255,0.8)',
            },
        },
    ];
    return resGeo;
}

// 山西地图样式，140000 区分陕西
export function getOptionShanXi_140000_Geo(
    mapName: string,
    mapData?: MapApiIndicatorData[],
    config?: EchartMapProps['config'],
    registerMap?: MapRegisterInfo,
): EChartsOption['geo'] {
    const imageDom = new Image();
    imageDom.src = shanxiImg_140000;

    const hiddenRegionStyle: Array<GeoRegionsOption> = [];

    if (config?.hiddenRegion == true) {
        const markObj: Record<string, MapApiIndicatorData> = {};
        mapData?.map((item) => {
            const { region_code, region_name } = item ?? {};
            markObj[region_code] = item;
            markObj[region_name] = item;
        });

        registerMap?.geoJsonMapData?.features?.map((feature) => {
            const { adcode = '', name } = feature?.properties ?? {};
            if (!(markObj[adcode] || markObj[name]) && name != '南海诸岛') {
                hiddenRegionStyle.push({
                    name: name,
                    label: {
                        show: false,
                    },
                    itemStyle: {
                        areaColor: {
                            image: imageDom,
                            repeat: 'repeat',
                        },
                        borderColor: 'rgba(148, 200, 254, 0.35)',
                        borderWidth: 1,
                        opacity: 0.12,
                    },
                });
            }
        });
    }

    // function getNhRegion(color = '#33333300') {
    //     const itemStyle = {
    //         areaColor: color,
    //         color: color,
    //         borderColor: color,
    //         borderWidth: 1,
    //     };
    //     return {
    //         name: '南海诸岛',
    //         itemStyle: itemStyle,
    //         normal: {
    //             itemStyle: itemStyle,
    //         },
    //         emphasis: {
    //             itemStyle: itemStyle,
    //         },
    //     };
    // }

    const options = Array.isArray(config?.option?.geo) ? config?.option?.geo[0] : config?.option?.geo;
    const { zoom = 1, layoutSize = '95%' } = options || {};
    const geoMap = {
        selectedMode: false,
        silent: true,
        map: mapName,
        roam: false,
        zoom: zoom,
        layoutSize: layoutSize,
        regions: [getNhRegion(), ...hiddenRegionStyle],
    };

    // 是否显示map data 的label，默认true
    const { showLabel = true } = config ?? {};

    // 地图layer， z-index 分层
    // 通过多层叠加，产生立体和阴影效果
    const resGeo: GeoComponentOption[] = [
        // label标签
        {
            ...geoMap,
            zlevel: -9,
            layoutCenter: ['50%', '50%'],
            silent: false,
            label: {
                show: showLabel ?? true,
                fontSize: 16,
                textShadowColor: 'rgba(0,0,0,0.5)',
                color: '#FFFFFF',
                textShadowBlur: 3,
                textShadowOffsetX: 1,
                textShadowOffsetY: 3,
                formatter(p) {
                    return p.name;
                },
            },
            itemStyle: {
                // 区域颜色
                areaColor: '#FFFFFF00',
                borderWidth: 1,
                borderColor: 'rgba(151, 157, 155, 1)',

                shadowBlur: 10,
                shadowColor: 'rgba(2, 249, 249, 0.5)',
                shadowOffsetX: 4,
                shadowOffsetY: 8,
            },
            emphasis: {
                label: {
                    show: true,
                    color: '#D3E7FBFF',
                },
                itemStyle: {
                    areaColor: mapData ? 'rgb(255 190 77 / 85%)' : 'rgb(5 65 120 / 15%)',
                    borderColor: 'rgba(111, 231, 218, 1)',
                    borderType: 'solid',
                    borderWidth: 2,
                    shadowColor: 'rgba(148, 200, 254, 0)',
                    shadowOffsetX: 4,
                    shadowOffsetY: 8,
                },
            },
            select: {
                label: {
                    show: true,
                    color: '#D3E7FBFF',
                },
                itemStyle: {
                    areaColor: 'rgb(255 190 77 / 85%)',
                    borderColor: 'rgba(148, 200, 254, 1)',
                    borderWidth: 2,
                    shadowBlur: 5,

                    shadowColor: 'rgb(9 67 145 / 0%)',
                    shadowOffsetX: 5,
                    shadowOffsetY: 4,
                },
            },
        },
        // 纹理
        {
            ...geoMap,
            zlevel: -10,
            layoutCenter: ['50%', '50%'],
            itemStyle: {
                areaColor: {
                    image: imageDom,
                    repeat: 'repeat',
                },
                borderColor: 'rgba(148, 200, 254, 0.2)',
                borderWidth: 0,
            },
        },
        // 边框
        {
            ...geoMap,
            zlevel: -12,
            layoutCenter: ['50%', '50%'],
            itemStyle: {
                // box-shadow: 0px 0px 9px 5px rgba(2,249,249,0.4), inset 0px 1px 45px 11px #3C696A;
                areaColor: 'rgba(60,105,106, 0.26)',
                borderColor: '#00FFFF',
                borderWidth: 3,

                shadowColor: 'rgba(0,255,255,0.8)',
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
            },
            regions: [...hiddenRegionStyle, getNhRegion('rgba(151, 157, 155, 1)')],
        },

        // 后面三层
        {
            ...geoMap,
            zlevel: -13,
            layoutCenter: ['50%', '52%'],
            itemStyle: {
                borderWidth: 1,
                areaColor: 'rgba(18, 21, 29, 1)',
                borderColor: 'rgba(18, 21, 29, 1)',
            },
        },
        {
            ...geoMap,
            zlevel: -14,
            layoutCenter: ['50%', '53%'],
            itemStyle: {
                borderWidth: 1,
                areaColor: 'rgba(40, 45, 59, 1)',
                borderColor: 'rgba(40, 45, 59, 1)',
            },
        },
        {
            ...geoMap,
            zlevel: -15,
            layoutCenter: ['50%', '55%'],
            itemStyle: {
                borderWidth: 1,
                areaColor: 'rgba(21, 30, 35, 1)',
                borderColor: 'rgba(31, 38, 37, 1)',
            },
        },
    ];
    return resGeo;
}

// 新疆地图样式
export async function getOptionXjGeo(
    mapName: string,
    mapData?: MapApiIndicatorData[],
    config?: EchartMapProps['config'],
    registerMap?: MapRegisterInfo,
) {
    const imageDom = new Image();
    await new Promise((resolve) => {
        imageDom.onload = resolve;
        imageDom.src = xinjiangImg;
    });
    const geoMap = {
        selectedMode: false,
        silent: true,
        map: mapName,
        roam: false,
        zoom: 1,
        layoutSize: '90%',
        regions: [
            {
                name: '南海诸岛',
                itemStyle: {
                    areaColor: '#33333300',
                    color: '#33333300',
                    borderColor: '#33333300',
                    borderWidth: 1,
                },
                normal: {
                    itemStyle: {
                        areaColor: '#33333300',
                        color: '#33333300',
                        borderColor: '#33333300',
                        borderWidth: 1,
                    },
                },
                emphasis: {
                    itemStyle: {
                        areaColor: '#33333300',
                        color: '#33333300',
                        borderColor: '#33333300',
                        borderWidth: 1,
                    },
                },
            },
        ],
    };

    const resGeo: GeoComponentOption[] = [
        {
            ...geoMap,
            zlevel: -9,
            layoutCenter: ['50%', '50%'],
            silent: false,
            label: {
                show: true,
                fontSize: 16,
                textShadowColor: 'rgba(0,0,0,0.5)',
                color: '#FFFFFF',
                textShadowBlur: 3,
                textShadowOffsetX: 1,
                textShadowOffsetY: 3,
                formatter(p) {
                    return p.name;
                },
            },
            itemStyle: {
                areaColor: '#FFFFFF00',
                borderColor: '#FFFFFF',
                borderType: 'solid',
                borderDashOffset: 5,
                borderWidth: 1,

                shadowColor: 'rgba(15,110,158,0)',
                shadowBlur: 3,
                shadowOffsetX: 4,
                shadowOffsetY: 4,
            },
            emphasis: {
                label: {
                    show: true,
                    color: '#FFFFFF',
                },
                itemStyle: {
                    areaColor: mapData ? '#ffbe4de6' : 'rgb(5 65 120 / 10%)',
                    borderColor: '#FFFFFF',
                    borderType: 'solid',
                    borderWidth: 2,
                },
            },
            select: {
                itemStyle: {
                    areaColor: '#ffbe4d',
                    borderColor: '#FFFFFF',
                    borderWidth: 2,
                    shadowColor: 'rgb(9 67 145 / 30%)',
                    shadowBlur: 5,
                    shadowOffsetX: 5,
                    shadowOffsetY: 4,
                },
            },
        },
        {
            ...geoMap,
            zlevel: -10,
            layoutCenter: ['50%', '50%'],
            itemStyle: {
                areaColor: {
                    image: imageDom,
                    repeat: 'repeat',
                },
                borderColor: '#FFFFFF',
                borderWidth: 1,
            },
            regions: [],
        },
        {
            ...geoMap,
            zlevel: -12,
            layoutCenter: ['50%', '50%'],
            itemStyle: {
                areaColor: '#FFFFFF00',
                borderColor: '#FFFFFF',
                borderWidth: 3,
            },
        },
        {
            ...geoMap,
            zlevel: -13,
            layoutCenter: ['50%', '51.4%'],
            itemStyle: {
                areaColor: 'rgb(0 255 255 / 35%)',
                borderColor: 'rgb(0 255 255 / 40%)',
                borderWidth: 1,
            },
        },

        {
            ...geoMap,
            zlevel: -14,
            layoutCenter: ['50%', '53%'],
            itemStyle: {
                borderWidth: 1,
                areaColor: 'rgb(0 255 255 / 30%)',
                borderColor: 'rgb(0 255 255 / 40%)',
            },
        },

        {
            ...geoMap,
            zlevel: -15,
            layoutCenter: ['50%', '54.8%'],
            itemStyle: {
                areaColor: 'rgba(4, 0, 189, 0.9)',
                // shadowColor: 'rgb(18 42 131 / 50%)',
                shadowColor: 'rgb(18 42 131 / 100%)',
                shadowBlur: 30,
                shadowOffsetX: 0,
                shadowOffsetY: 10,
            },
        },
    ];
    return resGeo;
}

// 河北地图样式
export async function getOptionHbGeo(
    mapName: string,
    mapData?: MapApiIndicatorData[],
    config?: EchartMapProps['config'],
    registerMap?: MapRegisterInfo,
) {
    const imageDom = new Image();
    await new Promise((resolve) => {
        imageDom.onload = resolve;
        imageDom.src = heibeiImg;
    });
    const hiddenRegionStyle: GeoRegionsOption[] = [];
    if (config?.hiddenRegion == true) {
        const markObj: Record<string, MapApiIndicatorData> = {};
        mapData?.map((item) => {
            const { region_code, region_name } = item ?? {};
            markObj[region_code] = item;
            markObj[region_name] = item;
        });
        registerMap?.geoJsonMapData?.features?.map((feature) => {
            const { adcode = '', name } = feature?.properties ?? {};
            if (!(markObj[adcode] || markObj[name]) && name != '南海诸岛') {
                hiddenRegionStyle.push({
                    name: name,
                    label: {
                        show: false,
                    },
                    itemStyle: {
                        areaColor: {
                            image: imageDom,
                            repeat: 'repeat',
                        },
                        borderColor: 'rgba(148, 200, 254, 0.35)',
                        borderWidth: 1,
                        opacity: 0.12,
                    },
                });
            }
        });
    }

    // function getNhRegion(color = '#33333300') {
    //     const itemStyle = {
    //         areaColor: color,
    //         color: color,
    //         borderColor: color,
    //         borderWidth: 1,
    //     };
    //     return {
    //         name: '南海诸岛',
    //         itemStyle: itemStyle,
    //         normal: {
    //             itemStyle: itemStyle,
    //         },
    //         emphasis: {
    //             itemStyle: itemStyle,
    //         },
    //     };
    // }

    const options = Array.isArray(config?.option?.geo) ? config?.option?.geo[0] : config?.option?.geo;
    const { zoom = 1, layoutSize = '85%' } = options || {};
    const geoMap = {
        selectedMode: false,
        silent: true,
        map: mapName,
        roam: false,
        zoom: zoom,
        layoutSize: layoutSize,
        regions: [getNhRegion(), ...hiddenRegionStyle],
    };

    const resGeo: GeoComponentOption[] = [
        {
            ...geoMap,
            zlevel: -9,
            layoutCenter: ['50%', '50%'],
            silent: false,
            label: {
                show: true,
                fontSize: 16,
                textShadowColor: 'rgba(0,0,0,0.5)',
                color: '#D3E7FBFF',
                textShadowBlur: 3,
                textShadowOffsetX: 1,
                textShadowOffsetY: 3,
                formatter(p) {
                    return p.name;
                },
            },
            itemStyle: {
                areaColor: '#FFFFFF00',
                borderWidth: 1,
                borderColor: 'rgba(148, 200, 254, 0.25)',

                shadowBlur: 0,
                shadowColor: 'rgba(0, 0, 0, 0)',
                shadowOffsetX: 4,
                shadowOffsetY: 8,
            },
            emphasis: {
                label: {
                    show: true,
                    color: '#D3E7FBFF',
                },
                itemStyle: {
                    areaColor: mapData ? 'rgb(255 190 77 / 85%)' : 'rgb(5 65 120 / 15%)',
                    borderColor: 'rgba(148, 200, 254, 0.8)',
                    borderType: 'solid',
                    borderWidth: 2,
                    shadowColor: 'rgba(148, 200, 254, 0)',
                    shadowOffsetX: 4,
                    shadowOffsetY: 8,
                },
            },
            select: {
                label: {
                    show: true,
                    color: '#D3E7FBFF',
                },
                itemStyle: {
                    areaColor: 'rgb(255 190 77 / 85%)',
                    borderColor: 'rgba(148, 200, 254, 1)',
                    borderWidth: 2,
                    shadowBlur: 5,

                    shadowColor: 'rgb(9 67 145 / 0%)',
                    shadowOffsetX: 5,
                    shadowOffsetY: 4,
                },
            },
        },
        {
            ...geoMap,
            zlevel: -10,
            layoutCenter: ['50%', '50%'],
            itemStyle: {
                areaColor: {
                    image: imageDom,
                    repeat: 'repeat',
                },
                borderColor: 'rgba(148, 200, 254, 0.2)',
                borderWidth: 0,
            },
        },
        {
            ...geoMap,
            zlevel: -12,
            layoutCenter: ['50%', '50%'],
            itemStyle: {
                areaColor: 'rgba(148, 200, 254, 1)',
                borderColor: 'rgba(148, 200, 254, 1)',
                borderWidth: 1,
            },
            regions: [...hiddenRegionStyle, getNhRegion('rgba(148, 200, 254, 1)')],
        },
        {
            ...geoMap,
            zlevel: -12,
            layoutCenter: ['50%', '50%'],
            itemStyle: {
                areaColor: 'rgba(148, 200, 254, 1)',
                borderColor: 'rgba(148, 200, 254, 1)',
                borderWidth: 4,
            },
        },
        {
            ...geoMap,
            zlevel: -13,
            layoutCenter: ['50%', '52%'],
            itemStyle: {
                borderWidth: 1,
                areaColor: 'rgba(3, 27, 50, 1)',
                borderColor: 'rgba(71,175,255,0.6)',
            },
        },

        {
            ...geoMap,
            zlevel: -14,
            layoutCenter: ['50%', '55%'],
            itemStyle: {
                borderWidth: 1,
                areaColor: 'rgba(3, 27, 50, 1)',
                borderColor: 'rgba(71,175,255,0.6)',
            },
        },
    ];
    return resGeo;
}

// 相城区地图样式
export async function getOptionXcGeo(
    mapName: string,
    mapData?: MapApiIndicatorData[],
    config?: EchartMapProps['config'],
    registerMap?: MapRegisterInfo,
) {
    const imageDom = new Image();
    await new Promise((resolve) => {
        imageDom.onload = resolve;
        imageDom.src = shijiazhuangImg;
    });
    const geoMap = {
        selectedMode: false,
        silent: true,
        map: mapName,
        roam: false,
        zoom: 1,
        layoutSize: '85%',
    };

    const resGeo: GeoComponentOption[] = [
        {
            ...geoMap,
            zlevel: -9,
            layoutCenter: ['50%', '50%'],
            silent: false,
            label: {
                show: true,
                fontSize: 16,
                fontWeight: 'bold',
                color: '#b7dbff',
                formatter(p) {
                    return p.name;
                },
            },
            itemStyle: {
                areaColor: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        {
                            offset: 0,
                            color: 'rgb(34 255 250 / 100%)', // 0% 处的颜色
                        },
                        {
                            offset: 1,
                            color: 'rgb(0 131 255 / 40%)', // 100% 处的颜色
                        },
                    ],
                    // globalCoord: true /* 缺省为 false*/,
                },
                borderColor: 'rgb(24 235 255 / 80%)',
                borderType: 'solid',
                borderDashOffset: 5,
                borderWidth: 1,
            },
            emphasis: {
                label: {
                    show: true,
                    color: '#FFFFFFCC',
                },
                itemStyle: {
                    areaColor: mapData ? '#ffbe4de6' : 'rgb(0 131 255 / 40%)',
                    borderColor: '#ffffff1a',
                    borderType: 'solid',
                    borderWidth: 1,
                },
            },
            select: {
                itemStyle: {
                    areaColor: '#ffbe4d',
                    borderColor: 'rgb(255 255 255 / 40%)',
                    borderWidth: 1,
                    shadowColor: 'rgb(9 67 145 / 30%)',
                    shadowBlur: 5,
                    shadowOffsetX: 5,
                    shadowOffsetY: 4,
                },
            },
        },
        {
            ...geoMap,
            zlevel: -10,
            layoutCenter: ['50%', '50%'],
            itemStyle: {
                areaColor: {
                    image: imageDom,
                    repeat: 'repeat',
                },
                borderColor: 'rgb(25 235 255 / 40%)',
                borderWidth: 0,
            },
        },
        {
            ...geoMap,
            zlevel: -13,
            layoutCenter: ['50%', '52.5%'],
            itemStyle: {
                areaColor: 'rgba(79,244,252,0)',
                borderColor: 'rgb(25 235 255 / 30%)',
                borderWidth: 1,
                shadowColor: 'rgb(25 235 255 / 0%)',
                shadowBlur: 30,
                shadowOffsetX: 0,
                shadowOffsetY: 20,
            },
        },
        {
            ...geoMap,
            zlevel: -15,
            layoutCenter: ['50%', '54.5%'],
            itemStyle: {
                borderWidth: 1,
                areaColor: 'rgba(104,190,254,0.07)',
                borderColor: 'rgba(25,235,255,0.1)',
                shadowColor: 'rgba(4,19,32,0.6)',
                shadowBlur: 30,
                shadowOffsetX: 0,
                shadowOffsetY: 20,
            },
        },
    ];
    return resGeo;
}

// 河北发改委地图样式，from getOptionHbGeo
export function getOptionHbFGWGeoWorld(
    mapName: string,
    mapData?: MapApiIndicatorData[],
    config?: EchartMapProps['config'],
    registerMap?: MapRegisterInfo,
): EChartsOption['geo'] {
    const imageDom = new Image();
    imageDom.src = hebeiFGWImg;

    const hiddenRegionStyle: GeoRegionsOption[] = [];

    if (config?.hiddenRegion == true) {
        const markObj: Record<string, MapApiIndicatorData> = {};
        mapData?.map((item) => {
            const { region_code, region_name } = item ?? {};
            markObj[region_code] = item;
            markObj[region_name] = item;
        });

        registerMap?.geoJsonMapData?.features?.map((feature) => {
            const { adcode = '', name } = feature?.properties ?? {};
            if (!(markObj[adcode] || markObj[name]) && name != '南海诸岛') {
                hiddenRegionStyle.push({
                    name: name,
                    label: {
                        show: false,
                    },
                    itemStyle: {
                        areaColor: {
                            image: imageDom,
                            repeat: 'repeat',
                        },
                        borderColor: 'rgba(148, 200, 254, 0.35)',
                        borderWidth: 1,
                        opacity: 0.12,
                    },
                });
            }
        });
    }

    /**
     * 获取南海诸岛绘制参数
     * @param color
     * @returns
     */
    function getNhRegion(color = '#33333300'): GeoRegionsOption {
        const itemStyle: GeoRegionsOption['itemStyle'] = {
            areaColor: color,
            color: color,
            borderColor: color,
            borderWidth: 1,
        };
        return {
            name: '南海诸岛',
            itemStyle: itemStyle,
            emphasis: {
                itemStyle: itemStyle,
            },
        };
    }

    const options = Array.isArray(config?.option?.geo) ? config?.option?.geo[0] : config?.option?.geo;
    const { zoom = 1, layoutSize = '85%' } = options || {};
    const geoMap = {
        selectedMode: false,
        silent: true,
        map: mapName,
        roam: false,
        zoom: zoom,
        layoutSize: layoutSize,
        regions: [getNhRegion(), ...hiddenRegionStyle],
    };

    // 是否显示map data 的label，默认true
    const { showLabel = true } = config ?? {};

    // 地图layer， z-index 分层
    const resGeo: GeoComponentOption[] = [
        {
            ...geoMap,
            zlevel: -9,
            layoutCenter: ['50%', '50%'],
            silent: false,
            label: {
                show: showLabel ?? true,
                fontSize: 16,
                textShadowColor: 'rgba(0,0,0,0.5)',
                color: '#D3E7FBFF',
                textShadowBlur: 3,
                textShadowOffsetX: 1,
                textShadowOffsetY: 3,
                formatter: (p) => {
                    return p.name;
                },
            },
            itemStyle: {
                // 区域颜色
                areaColor: '#FFFFFF00',
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.1)',

                shadowBlur: 0,
                shadowColor: 'rgba(0, 0, 0, 0)',
                shadowOffsetX: 4,
                shadowOffsetY: 8,
            },
            emphasis: {
                label: {
                    show: true,
                    color: '#D3E7FBFF',
                },
                itemStyle: {
                    areaColor: mapData ? 'rgb(255 190 77 / 85%)' : 'rgb(5 65 120 / 15%)',
                    borderColor: 'rgba(148, 200, 254, 0.8)',
                    borderType: 'solid',
                    borderWidth: 2,
                    shadowColor: 'rgba(148, 200, 254, 0)',
                    shadowOffsetX: 4,
                    shadowOffsetY: 8,
                },
            },
            select: {
                label: {
                    show: true,
                    color: '#D3E7FBFF',
                },
                itemStyle: {
                    areaColor: 'rgb(255 190 77 / 85%)',
                    borderColor: 'rgba(148, 200, 254, 1)',
                    borderWidth: 2,
                    shadowBlur: 5,

                    shadowColor: 'rgb(9 67 145 / 0%)',
                    shadowOffsetX: 5,
                    shadowOffsetY: 4,
                },
            },
        },
        {
            ...geoMap,
            zlevel: -10,
            layoutCenter: ['50%', '50%'],
            itemStyle: {
                areaColor: {
                    image: imageDom,
                    repeat: 'repeat',
                },
                borderColor: 'rgba(148, 200, 254, 0.2)',
                borderWidth: 0,
            },
        },
        {
            ...geoMap,
            zlevel: -12,
            layoutCenter: ['50%', '50%'],
            itemStyle: {
                areaColor: 'rgba(148, 200, 254, 1)',
                borderColor: 'rgba(148, 200, 254, 1)',
                borderWidth: 1,
            },
            regions: [...hiddenRegionStyle, getNhRegion('rgba(148, 200, 254, 1)')],
        },
        {
            ...geoMap,
            zlevel: -13,
            layoutCenter: ['50%', '52%'],
            itemStyle: {
                borderWidth: 0,
                areaColor: '#5068FA',
                borderColor: 'rgba(71,175,255,0.6)',
            },
        },
    ];
    return resGeo;
}

// 河北发改委地图样式，from getOptionHbGeo
export async function getOptionHbFGWGeoChina(
    mapName: string,
    mapData?: MapApiIndicatorData[],
    config?: EchartMapProps['config'],
    registerMap?: MapRegisterInfo,
) {
    const imageDom = new Image();
    await new Promise((resolve) => {
        imageDom.onload = resolve;
        imageDom.src = hebeiFGWImg;
    });
    const hiddenRegionStyle: GeoRegionsOption[] = [];

    if (config?.hiddenRegion == true) {
        const markObj: Record<string, MapApiIndicatorData> = {};
        mapData?.map((item) => {
            const { region_code, region_name } = item ?? {};
            markObj[region_code] = item;
            markObj[region_name] = item;
        });

        registerMap?.geoJsonMapData?.features?.map((feature) => {
            const { adcode = '', name } = feature?.properties ?? {};
            if (!(markObj[adcode] || markObj[name]) && name != '南海诸岛') {
                hiddenRegionStyle.push({
                    name: name,
                    label: {
                        show: false,
                    },
                    itemStyle: {
                        areaColor: {
                            image: imageDom,
                            repeat: 'repeat',
                        },
                        borderColor: 'rgba(148, 200, 254, 0.35)',
                        borderWidth: 1,
                        opacity: 0.12,
                    },
                });
            }
        });
    }

    function getNhRegion(color = '#33333300') {
        const itemStyle = {
            areaColor: color,
            color: color,
            borderColor: color,
            borderWidth: 1,
        };
        return {
            name: '南海诸岛',
            itemStyle: itemStyle,
            normal: {
                itemStyle: itemStyle,
            },
            emphasis: {
                itemStyle: itemStyle,
            },
        };
    }

    const options = Array.isArray(config?.option?.geo) ? config?.option?.geo[0] : config?.option?.geo;
    const { zoom = 1, layoutSize = '85%' } = options || {};
    const geoMap = {
        selectedMode: false,
        silent: true,
        map: mapName,
        roam: false,
        zoom: zoom,
        layoutSize: layoutSize,
        regions: [getNhRegion(), ...hiddenRegionStyle],
    };

    // 是否显示map data 的label，默认true
    const { showLabel = true } = config ?? {};

    // 地图layer， z-index 分层
    const resGeo: GeoComponentOption[] = [
        {
            ...geoMap,
            zlevel: -9,
            layoutCenter: ['50%', '50%'],
            silent: false,
            label: {
                show: showLabel ?? true,
                fontSize: 16,
                textShadowColor: 'rgba(0,0,0,0.5)',
                color: '#D3E7FBFF',
                textShadowBlur: 3,
                textShadowOffsetX: 1,
                textShadowOffsetY: 3,
                formatter(p) {
                    return p.name;
                },
            },
            itemStyle: {
                // 区域颜色
                areaColor: '#FFFFFF00',
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.3)',

                shadowBlur: 0,
                shadowColor: 'rgba(0, 0, 0, 0)',
                shadowOffsetX: 4,
                shadowOffsetY: 8,
            },
            emphasis: {
                label: {
                    show: true,
                    color: '#D3E7FBFF',
                },
                itemStyle: {
                    areaColor: mapData ? 'rgb(255 190 77 / 85%)' : 'rgb(5 65 120 / 15%)',
                    borderColor: 'rgba(148, 200, 254, 0.8)',
                    borderType: 'solid',
                    borderWidth: 2,
                    shadowColor: 'rgba(148, 200, 254, 0)',
                    shadowOffsetX: 4,
                    shadowOffsetY: 8,
                },
            },
            select: {
                label: {
                    show: true,
                    color: '#D3E7FBFF',
                },
                itemStyle: {
                    areaColor: 'rgb(255 190 77 / 85%)',
                    borderColor: 'rgba(148, 200, 254, 1)',
                    borderWidth: 2,
                    shadowBlur: 5,

                    shadowColor: 'rgb(9 67 145 / 0%)',
                    shadowOffsetX: 5,
                    shadowOffsetY: 4,
                },
            },
        },
        {
            ...geoMap,
            zlevel: -10,
            layoutCenter: ['50%', '50%'],
            itemStyle: {
                areaColor: {
                    image: imageDom,
                    repeat: 'repeat',
                },
                borderColor: 'rgba(148, 200, 254, 0.2)',
                borderWidth: 0,
            },
        },
        {
            ...geoMap,
            zlevel: -12,
            layoutCenter: ['50%', '50%'],
            itemStyle: {
                areaColor: 'rgba(148, 200, 254, 1)',
                borderColor: 'rgba(148, 200, 254, 1)',
                borderWidth: 1,
            },
            regions: [...hiddenRegionStyle, getNhRegion('rgba(148, 200, 254, 1)')],
        },
        {
            ...geoMap,
            zlevel: -12,
            layoutCenter: ['50%', '50%'],
            itemStyle: {
                areaColor: 'rgba(148, 200, 254, 1)',
                borderColor: '#C0FFDC',
                borderWidth: 4,
            },
        },
        {
            ...geoMap,
            zlevel: -13,
            layoutCenter: ['50%', '52%'],
            itemStyle: {
                borderWidth: 1,
                areaColor: '#5068FA',
                borderColor: 'rgba(71,175,255,0.6)',
            },
        },

        {
            ...geoMap,
            zlevel: -14,
            layoutCenter: ['50%', '53%'],
            itemStyle: {
                borderWidth: 1,
                areaColor: '#263CC5',
                borderColor: 'rgba(71,175,255,0.6)',
            },
        },
        {
            ...geoMap,
            zlevel: -15,
            layoutCenter: ['50%', '55%'],
            itemStyle: {
                borderWidth: 1,
                areaColor: 'rgba(3, 27, 50, 1)',
                borderColor: 'rgba(71,175,255,0.6)',
            },
        },
    ];
    return resGeo;
}
