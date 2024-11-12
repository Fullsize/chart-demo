/*
 * @Author: sungy
 * @Date: 2023-09-19 15:46:06
 * @LastEditors: sungy
 * @LastEditTime: 2024-06-14 11:01:44
 * @Description: 卡片指标类
 */
import React from 'react';
import style from './baseSingleSelect.module.css';
import {
    Flr,
    Flc,
    F16,
    F16B,
    F14,
    F14B,
    F16BT,
    F18T,
    F26B,
    IndCssLgText4,
    IndLineBg,
    IndTitle5,
    SingleSelect,
    F26BL2,
    ElementOrEmpty,
    IndLineCss,
    F18,
} from '@/components/Indicator';
import { GrZs, GrZsF26, GrValUnit, GrValUnitF14 } from '@/components/Indicator';
import { EmptyOrInd } from '@/components/Indicator';

// 注意：[河北项目]-为了解决后端接口返回的数据，val，val1，val2等字段返回的意义不明确问题。判断出哪些字段是绝对值及增速。
/**
 * @deprecated 请使用新的函数 `trValueByTypecode` 代替。
 */
export const trValueOrZs = (data: any) => {
    const res: any = [[], [], []];
    for (let i = 0; i < 5; i++) {
        const attr = i > 0 ? i : '';
        const val = data['val' + attr];
        const unit_name = data['unit_name' + attr];
        const index_name = data['index_name' + attr];
        const index_full_code = data['index_full_code' + attr];
        const index_code_full_cname = data['index_code_full_cname' + attr];
        const index_code_full_type_name = data['index_code_full_type_name' + attr];
        const group_name = data['group_name' + attr];

        if (!index_full_code && !index_code_full_cname && !index_code_full_type_name) {
            if (i == 0) {
                continue;
            } else {
                break;
            }
        }

        const trData = {
            value: val,
            unit: unit_name,
            index_name,
            index_full_code,
            index_code_full_cname,
            index_code_full_type_name,
            group_name,
        };

        const markStr = index_full_code || index_code_full_cname || '';
        if (unit_name == '%' && markStr) {
            if (index_name == '占GDP比重') {
                res[2].push(trData);
            } else if (
                index_code_full_type_name?.includes('增速') ||
                index_code_full_type_name?.includes('环比') ||
                index_code_full_type_name?.includes('值') ||
                index_code_full_cname?.includes('增速') ||
                index_code_full_cname?.includes('环比')
            ) {
                res[1].push(trData);
            } else {
                res[2].push(trData);
            }
        } else if (
            index_code_full_type_name == '上月=100' ||
            index_code_full_type_name == '上年同月=100' ||
            index_code_full_type_name == '上年同期=100'
        ) {
            res[1].push(trData);
        } else if (markStr) {
            res[0].push(trData);
        }
    }
    return res;
};

// 指标卡通用-内容可自定义
export const TrIndCardLayout = ({ apiData, style, renderItem, childrenStyle, ...props }: any) => {
    return (
        <Flc flex="none" gap={10} {...style}>
            <EmptyOrInd apiData={apiData}>
                {apiData?.data?.map?.((data: any, i: number) => {
                    return (
                        <React.Fragment key={i}>
                            <SingleSelect
                                style={{
                                    display: 'flex',
                                    padding: '12px 12px 5px 12px',
                                    ...childrenStyle,
                                }}
                                layout="horizontal"
                                data={data}
                                {...props}
                            >
                                {renderItem?.(data)}
                            </SingleSelect>
                        </React.Fragment>
                    );
                })}
            </EmptyOrInd>
        </Flc>
    );
};

// 宏观经济-通用指标-2
const TrLayoutCardHgjj = ({ data, valLayout = 'horizontal' }: any) => {
    const {
        index_code_full_cname,
        index_code_full_cname1,
        index_code_full_cname2,
        index_code_full_type_name1,
        index_code_full_type_name2,
        val,
        unit_name,
        val1,
        val2,
        unit_name1,
        unit_name2,
    } = data ?? {};
    return (
        <Flr flex={1} alignItems="flex-end">
            <Flc flex={1} alignItems="flex-start">
                <F16B>{index_code_full_cname}</F16B>
                <GrValUnit marginTop={4} value={val} layout={valLayout} unit={unit_name}></GrValUnit>
            </Flc>
            <Flc flex={1} alignItems="flex-end">
                <Flr
                    flex={1}
                    marginTop={4}
                    flexDirection={valLayout == 'horizontal' ? 'row' : 'column'}
                    justifyContent="flex-start"
                    alignItems="flex-end"
                >
                    <F14>{index_code_full_type_name1 || index_code_full_cname1}</F14>
                    <GrZs marginLeft={8} value={val1} unit={unit_name1}></GrZs>
                </Flr>
                {/* 这个可能有，没有就不显示 */}
                {(index_code_full_type_name2 || index_code_full_cname2) && (
                    <Flr
                        marginTop={4}
                        flexDirection={valLayout == 'horizontal' ? 'row' : 'column'}
                        justifyContent="flex-start"
                        alignItems="flex-end"
                    >
                        <F14>{index_code_full_type_name2 || index_code_full_cname2}</F14>
                        <GrZs marginLeft={8} value={val2} unit={unit_name2}></GrZs>
                    </Flr>
                )}
            </Flc>
        </Flr>
    );
};

// 宏观经济-通用指标1
export const TrIndCardHgjj1 = ({ apiData, style, itemStyle, ...props }: any) => {
    return (
        <Flr flex={1} gap={10} justifyContent="flex-start" alignItems="flex-start" {...style}>
            <EmptyOrInd apiData={apiData}>
                {apiData?.data?.map((data: any, i: number) => {
                    const { index_code_full_cname, index_full_code, time_name } = data ?? {};
                    const [valueArr, zsArr, otArr] = trValueOrZs(data);
                    return (
                        <SingleSelect
                            key={i}
                            style={{
                                flex: 1,
                                height: '100%',
                                overflow: 'hidden',
                                ...itemStyle,
                            }}
                            data={data}
                            {...props}
                        >
                            <Flc flex={1}>
                                {
                                    <Flr gap={10} overflow="hidden">
                                        <F16BT>{index_code_full_cname}</F16BT>
                                        {(index_full_code == 'F0301ZB001201LX0103' ||
                                            index_full_code == 'F0301&F020201ZB00300111LX0301' ||
                                            index_full_code == 'F01ZB001601LX0301' ||
                                            index_full_code == 'F0801ZB001601LX0301') && (
                                            <F14 overflow="visible">{time_name}</F14>
                                        )}
                                    </Flr>
                                }

                                {valueArr.map((item: any, i: number) => {
                                    const { value, unit } = item;
                                    return <GrValUnit key={i} marginTop={4} value={value} unit={unit}></GrValUnit>;
                                })}

                                {zsArr.length > 0 && (
                                    <Flc
                                        // flexDirection={valueArr.length > 0 ? "row" : "column"}
                                        // alignItems={valueArr.length > 0 ? "flex-end" : "flex-start"}
                                        marginTop={12}
                                        gap={4}
                                        flex={1}
                                    >
                                        {zsArr.map((item: any, i: number) => {
                                            const { value, unit, index_code_full_type_name, index_code_full_cname } =
                                                item;
                                            return (
                                                <Flr key={i} flex={1}>
                                                    <F14>{index_code_full_type_name || index_code_full_cname}</F14>
                                                    <GrZs value={value} unit={unit}></GrZs>
                                                </Flr>
                                            );
                                        })}
                                    </Flc>
                                )}

                                {otArr?.map((item: any, i: number) => {
                                    const { value, unit, index_name } = item;
                                    return (
                                        <Flr key={i} marginTop={8}>
                                            <F14>{index_name}</F14>
                                            <F14B overflow="visible">
                                                <IndCssLgText4>
                                                    {value ?? '--'}
                                                    {unit}
                                                </IndCssLgText4>
                                            </F14B>
                                        </Flr>
                                    );
                                })}
                            </Flc>
                        </SingleSelect>
                    );
                })}
            </EmptyOrInd>
        </Flr>
    );
};
// 宏观经济-通用指标2
export const TrIndCardHgjj2 = ({ apiData, valLayout = 'horizontal', style, ...props }: any) => {
    return (
        <Flc flex={1} gap={10} {...style}>
            <EmptyOrInd apiData={apiData}>
                {apiData?.data?.map((data: any, i: number) => {
                    return (
                        <React.Fragment key={i}>
                            {i > 0 && <IndLineCss />}
                            <SingleSelect
                                style={{
                                    flex: 1,
                                    height: '100%',
                                    display: 'flex',
                                }}
                                data={data}
                                {...props}
                            >
                                <Flr flex={1} gap={20} justifyContent="flex-start">
                                    <TrLayoutCardHgjj key={i} valLayout={valLayout} data={data}></TrLayoutCardHgjj>
                                </Flr>
                            </SingleSelect>
                        </React.Fragment>
                    );
                })}
            </EmptyOrInd>
        </Flc>
    );
};

// 居民消费指数等内容
export const TrIndCardHgjj3 = ({ apiData, style, ...props }: any) => {
    return (
        <Flr flex={1} gap={10} {...style}>
            <EmptyOrInd apiData={apiData}>
                {apiData?.data?.map((data: any, i: number) => {
                    const {
                        index_code_full_type_name,
                        index_code_full_type_name1,
                        index_code_full_type_name2,
                        val,
                        val1,
                        val2,
                        unit_name,
                        unit_name1,
                        unit_name2,
                    } = data;
                    return (
                        <SingleSelect key={i} style={{ flex: 1, height: '100%' }} data={data} {...props}>
                            <Flr flex={1}>
                                <Flc>
                                    <F16B>{index_code_full_type_name}</F16B>
                                    <GrZsF26 marginTop={4} value={val} unit={unit_name}></GrZsF26>
                                </Flc>
                                {index_code_full_type_name1 && (
                                    <Flc alignItems="center">
                                        <F16B>{index_code_full_type_name1}</F16B>
                                        <GrZsF26 marginTop={4} value={val1} unit={unit_name1}></GrZsF26>
                                    </Flc>
                                )}
                                {index_code_full_type_name2 && (
                                    <Flc alignItems="center">
                                        <F16B>{index_code_full_type_name2}</F16B>
                                        <GrZsF26 marginTop={4} value={val2} unit={unit_name2}></GrZsF26>
                                    </Flc>
                                )}
                            </Flr>
                        </SingleSelect>
                    );
                })}
            </EmptyOrInd>
        </Flr>
    );
};

// 宏观经济-通用指标4
export const TrIndCardHgjj4 = ({ apiData, valLayout = 'horizontal', style, ...props }: any) => {
    return (
        <Flc flex={1} gap={10} {...style}>
            <EmptyOrInd apiData={apiData}>
                {apiData?.data?.map((data: any, i: number) => {
                    const [valArr, zsArr, otArr] = trValueOrZs(data);
                    return (
                        <React.Fragment key={i}>
                            <SingleSelect
                                style={{
                                    flex: 1,
                                    height: '100%',
                                    display: 'flex',
                                }}
                                layout="horizontal"
                                data={data}
                                {...props}
                            >
                                <Flc flex={1} gap={20} justifyContent="flex-start">
                                    <Flr>
                                        <F16B>{data?.index_code_cname1 ?? ''}</F16B>
                                        <F14>{data?.time_name1 ?? ''}</F14>
                                    </Flr>
                                    <Flr gap={10} justifyContent="space-between" alignItems="flex-end">
                                        {valArr?.map((item: any, i: any) => {
                                            return (
                                                <GrValUnit key={i} value={item?.value} unit={item?.unit}></GrValUnit>
                                            );
                                        })}
                                        <Flr>
                                            {zsArr?.map((item: any, i: any) => {
                                                return (
                                                    <Flr key={i}>
                                                        <F14>{item?.index_code_full_type_name}</F14>
                                                        <GrZs
                                                            marginLeft={5}
                                                            value={item?.value}
                                                            unit={item?.unit}
                                                        ></GrZs>
                                                    </Flr>
                                                );
                                            })}
                                        </Flr>
                                    </Flr>
                                </Flc>
                            </SingleSelect>
                        </React.Fragment>
                    );
                })}
            </EmptyOrInd>
        </Flc>
    );
};

// 宏观经济-通用指标6
export const TrIndCardHgjj6 = ({ ...props }: any) => {
    return (
        <TrIndCardLayout
            {...props}
            renderItem={(data: any) => {
                const [valueArr, zsArr, otArr] = trValueOrZs(data);
                const titleField = props?.titleField || 'index_code_cname1';
                return (
                    <Flc flex={1} gap={15} justifyContent="flex-start">
                        <Flr>
                            <IndTitle5 title={data?.[titleField] ?? ''} />
                            <F14>{data?.time_name1 ?? ''}</F14>
                        </Flr>
                        <Flc justifyContent="space-evenly" gap={2}>
                            {valueArr?.map?.((item: any, i: any) => {
                                const { group_name, value, unit } = item;
                                return (
                                    <Flr key={i} gap={8} alignItems="baseline">
                                        <F16>{group_name} </F16>
                                        <GrValUnit value={value} unit={unit}></GrValUnit>
                                    </Flr>
                                );
                            })}
                            {zsArr?.map?.((item: any, i: any) => {
                                const { group_name, value, unit } = item;
                                return (
                                    <Flr key={i} gap={8} alignItems="baseline">
                                        <F16>{group_name} </F16>
                                        <GrZsF26 value={value} unit={unit}></GrZsF26>
                                    </Flr>
                                );
                            })}
                        </Flc>
                    </Flc>
                );
            }}
        ></TrIndCardLayout>
    );
};

// 宏观经济-通用指标5
export const TrIndCardHgjj5 = ({ ...props }: any) => {
    return (
        <TrIndCardLayout
            {...props}
            renderItem={(data: any) => {
                const [valueArr, zsArr, otArr] = trValueOrZs(data);
                const titleField = props?.titleField || 'index_code_cname1';
                return (
                    <Flc flex={1} gap={15} justifyContent="flex-start" padding="0 0 10px 0">
                        <Flr>
                            <IndTitle5 title={data?.[titleField] ?? ''} />
                            <F14>{data?.time_name1 ?? ''}</F14>
                        </Flr>
                        <Flr justifyContent="space-evenly" gap={10}>
                            {valueArr?.map?.((item: any, i: any) => {
                                const { index_code_full_type_name, value, unit } = item;
                                return (
                                    <Flr key={i} gap={8} alignItems="baseline">
                                        <F16>{index_code_full_type_name} </F16>
                                        <GrValUnit value={value} unit={unit}></GrValUnit>
                                    </Flr>
                                );
                            })}
                            {zsArr?.map?.((item: any, i: any) => {
                                const { index_code_full_type_name, value, unit } = item;
                                return (
                                    <Flr key={i} gap={8} alignItems="baseline">
                                        <F16>{index_code_full_type_name} </F16>
                                        <GrZsF26 value={value} unit={unit}></GrZsF26>
                                    </Flr>
                                );
                            })}
                        </Flr>
                    </Flc>
                );
            }}
        ></TrIndCardLayout>
    );
};

// 宏观经济-通用指标5
export const TrIndCardHgjj5_1 = ({ childrenStyle, style, ...props }: any) => {
    return (
        <TrIndCardHgjj5
            childrenStyle={{
                background: 'rgba(37, 75, 128, 0.3)',
                borderRadius: 8,
                flex: 1,
                ...childrenStyle,
            }}
            style={{
                flexDirection: 'row',
                ...style,
            }}
            {...props}
        ></TrIndCardHgjj5>
    );
};

// 宏观经济-流动人口
export const TrIndCardLdrk = ({ apiData, ...style }: any) => {
    return (
        <Flc flex={1} {...style}>
            <Flr flex={1}>
                {apiData?.data?.map?.((item: any, i: number) => {
                    if (i == 0) {
                        return <TrLayoutCardHgjj key={i} data={item}></TrLayoutCardHgjj>;
                    }
                    return <React.Fragment key={i}></React.Fragment>;
                })}
            </Flr>
            {apiData?.data?.length > 1 && <IndLineCss />}
            <Flr flex={1} gap={30}>
                {apiData?.data?.map?.((item: any, i: number) => {
                    if (i > 0) {
                        return <TrLayoutCardHgjj key={i} valLayout="vertical" data={item}></TrLayoutCardHgjj>;
                    }
                    return <React.Fragment key={i}></React.Fragment>;
                })}
            </Flr>
        </Flc>
    );
};

// 经济对比分析 / 重点在建项目
export const TrIndCardJjdbfx = ({ apiData, style, ...props }: any) => {
    return (
        <Flc flex={1} gap={10} {...style}>
            <EmptyOrInd apiData={apiData}>
                {apiData?.data?.map((data: any, i: number) => {
                    const { index_code_full_cname, index_code_cname1, time_name, time_name1 } = data;
                    const [valueArr, zsArr] = trValueOrZs(data);
                    return (
                        <SingleSelect key={i} style={{ flex: 1 }} layout="horizontal" data={data} {...props}>
                            <Flr
                                flex={1}
                                justifyContent="flex-start"
                                alignItems="flex-start"
                                padding={10}
                                overflow="hidden"
                            >
                                <div
                                    style={{
                                        width: 8,
                                        height: 8,
                                        background: 'rgba(0,145,255,0.8)',
                                        borderRadius: '50%',
                                        margin: '6px 8px 0px 0px',
                                    }}
                                ></div>
                                <Flc flex={1} gap={10} overflow="hidden">
                                    <Flr>
                                        <F18T>{index_code_full_cname || index_code_cname1}</F18T>
                                        <F14 overflow="visible">{time_name || time_name1}</F14>
                                    </Flr>

                                    {valueArr?.map((item: any, i: number) => {
                                        const { value, unit, index_code_full_type_name } = item;
                                        return (
                                            <React.Fragment key={i}>
                                                <F16>{index_code_full_type_name}</F16>
                                                <GrValUnit key={i} value={value} unit={unit}></GrValUnit>
                                            </React.Fragment>
                                        );
                                    })}

                                    {zsArr?.map((item: any, i: number) => {
                                        const { value, unit, index_code_full_type_name } = item;
                                        return (
                                            <Flr key={i}>
                                                <F16>{index_code_full_type_name}</F16>
                                                <GrZs value={value} unit={unit}></GrZs>
                                            </Flr>
                                        );
                                    })}
                                </Flc>
                            </Flr>
                        </SingleSelect>
                    );
                })}
            </EmptyOrInd>
        </Flc>
    );
};

// 商圈分析-通用指标
export const TrIndCardSqfx1 = ({ apiData, style, itemStyle, ...props }: any) => {
    return (
        <Flr flex={1} gap={10} justifyContent="flex-start" alignItems="flex-start" {...style}>
            <EmptyOrInd apiData={apiData}>
                {apiData?.data?.map((data: any, i: number) => {
                    const {
                        index_code_full_cname1,
                        time_name,
                        val1,
                        unit_name1,
                        index_code_full_cname2,
                        val2,
                        unit_name2,
                    } = data ?? {};
                    return (
                        <SingleSelect
                            key={i}
                            style={{
                                flex: 1,
                                height: '100%',
                                overflow: 'hidden',
                                ...itemStyle,
                            }}
                            data={data}
                            {...props}
                        >
                            <Flc flex={1} gap={10}>
                                <Flr gap={10} overflow="hidden">
                                    <F16BT>{index_code_full_cname1}</F16BT>
                                    <F14 overflow="visible">{time_name}</F14>
                                </Flr>
                                <GrValUnit key={i} marginTop={4} value={val1} unit={unit_name1}></GrValUnit>

                                {index_code_full_cname2 && (
                                    <Flr key={i} flex={1}>
                                        <F14>{index_code_full_cname2}</F14>
                                        <GrZs value={val2} unit={unit_name2}></GrZs>
                                    </Flr>
                                )}
                            </Flc>
                        </SingleSelect>
                    );
                })}
            </EmptyOrInd>
        </Flr>
    );
};

// 房地产开发投资
export const TrIndCardFdctz = ({ ...props }) => {
    return (
        <TrIndCardLayout
            {...props}
            renderItem={(data: any) => {
                const [valueArr, zsArr] = trValueOrZs(data);
                return (
                    <Flc flex={1} gap={20} justifyContent="flex-start" padding="0 0 10px 0">
                        <Flr>
                            <F16B>{data?.index_code_cname2 ?? ''}</F16B>
                            <F14>{data?.time_name1 ?? ''}</F14>
                        </Flr>
                    </Flc>
                );
            }}
        ></TrIndCardLayout>
    );
};
