/*
 * @Author: sungy
 * @Date: 2024-01-25 17:54:41
 * @LastEditors: sungy
 * @LastEditTime: 2024-09-19 16:24:00
 * @Description: 指标及图标结合使用
 */
import React, { ReactElement } from 'react';
import {
    Flc,
    IndTitle8,
    GrValUnit2,
    GrZs2,
    GrPm2,
    Flr,
    IndCssLgText10,
    FlaIndCardBg1Ac,
    FlaIndCardBg1,
    GrValUnitProgress1,
    FlaIndCardBg2,
    FlaIndCardBg2Ac,
    FlaIndCardBg3,
    FlaIndCardBg3Ac,
    cssBgStyle1,
    TrIndExplain,
} from '@/components/Indicator';

import { TrHbfgIndLayout, useSingleSelect } from './TrHbfgIndLayout';
import { trIndDataToArr } from './utils';
import { HgjjCardArrProps, HgjjCardProps } from './IndProps';
import trApiFieldData from '@/components/trApiFieldData';

export function getTypeName(data: any, trDataArr: any) {
    const { index_code, index_code_full_type_name, index_code_cname, index_code_full_cname, type_code, time_freq } =
        data ?? {};
    let name = '';
    if (type_code == 'ZB') {
        name = '比重';
    } else if (index_code == 'ZB00480201') {
        if (trDataArr?.length > 1) {
            name = index_code_cname;
        }
    } else if (
        index_code == 'ZB0048100201' ||
        index_code == 'ZB0048100101' ||
        index_code == 'ZB0048100102' ||
        index_code == 'ZB0048100103' ||
        index_code == 'ZB0048100104'
    ) {
        name = index_code_full_cname;
    } else {
        name = index_code_full_type_name;
    }
    //在年度统计中处理trData的期末值与累计值 =》 绝对值
    return name;
}

function getTrTitleByField(field: string | ReactElement, trData: any) {
    let title: any;
    if (typeof field == 'object') {
        title = field;
    } else {
        title = trApiFieldData(trData?.[0]?.[field], trData?.[0], field);
        if (title == '') {
            return title;
        } else {
            title = title || trData?.[0]?.[field];
        }
    }
    return title || field;
}

export function getTrTitle(
    titleField: string | Array<string | ReactElement> | ReactElement = 'index_code_cname',
    trData: any,
) {
    const titleArr: any = [];
    if (Array.isArray(titleField)) {
        titleField?.forEach((field: any) => {
            titleArr.push(getTrTitleByField(field, trData));
        });
    } else {
        titleArr.push(getTrTitleByField(titleField, trData));
    }
    return <>{titleArr.map((item: any) => item)}</>;
}

// 映射展示组件
export const mappingInd: any = {
    LX0101: GrValUnit2,
    LX0201: GrValUnit2,
    LX0301: GrValUnit2, //变成绝对值  根据code来 变为绝对值
    LX0105: GrValUnit2,
    LX0305: GrValUnit2,
    LX0306: GrValUnit2,
    LX0205: GrValUnit2,
    LX0207: GrValUnit2,
    LX0209: GrValUnit2,
    LX0316: GrValUnit2,
    LX0102: GrZs2,
    LX0103: GrZs2,
    LX0203: GrZs2,
    LX0303: GrZs2,
    LX0126: GrZs2,
    LX0127: GrZs2,
    LX0319: GrZs2,
    LX0503: GrZs2,
    ZB00120101: GrZs2,
    ZB00120102: GrZs2,
    LX11010201: GrPm2,
    LX11010202: GrPm2,
    LX11010102: GrPm2,
    // 比重 index_code
    ZB00480201: GrZs2,
    LX11010101: GrValUnit2,
    // 特殊类型占比
    ZB: GrValUnitProgress1,
};

function EmpytCard(props: any) {
    return <></>;
}

export const getMappingComponent = (data: any) => {
    const { index_code, type_code } = data;
    let P: any;
    if (mappingInd[index_code]) {
        P = mappingInd[index_code];
    } else if (mappingInd[type_code]) {
        P = mappingInd[type_code];
    } else {
        P = EmpytCard;
    }
    return P;
};

const TrHbfgIndCardContentV = ({
    titleField,
    titleChildren,
    data,
}: {
    titleField: string | Array<string | ReactElement> | ReactElement | undefined;
    data: Array<any>;
    titleChildren?: ReactElement;
}) => {
    return (
        <>
            {data?.map?.((item: any, i: number) => {
                const trData = trIndDataToArr(item);
                const title = getTrTitle(titleField, trData);
                return (
                    <Flc key={'IndTitle8' + i} gap={16}>
                        <IndTitle8
                            marginLeft={-15}
                            color="#fff"
                            title={title}
                        >
                            {titleChildren}
                        </IndTitle8>
                        <Flc padding="0px  5px  0px  25px" gap={16}>
                            {trData?.map((item: any, i: number) => {
                                const { val, unit_name, last_compare } = item;
                                const P = getMappingComponent(item);
                                const name = getTypeName(item, trData);
                                return (
                                    <Flc
                                        key={'TrHbfgIndCardContent' + i}
                                        gap={8}
                                        alignItems="baseline"
                                        justifyContent="flex-start"
                                        title={`${val ? val : ''} ${unit_name ? unit_name : ''}`}
                                    >
                                        <IndCssLgText10 fontSize="16px" color="#ADC0D3" fontWeight="400">
                                            {/* {name ?? ''} */}
                                            {name ? (name == '绝对值' ? '' : name) : ''}
                                        </IndCssLgText10>
                                        {P && <P value={val} unit={unit_name} lastCompare={last_compare}></P>}
                                    </Flc>
                                );
                            })}
                        </Flc>
                    </Flc>
                );
            })}
        </>
    );
};

const TrHbfgIndCardContentH = ({
    titleField,
    titleChildren,
    data,
}: {
    titleField: string | Array<string | ReactElement> | ReactElement | undefined;
    data: Array<any>;
    titleChildren?: ReactElement;
}) => {
    return (
        <>
            {data?.map?.((item: any, i: number) => {
                const trData = trIndDataToArr(item);
                const isMaxUnit = trData?.[0]?.unit_name?.length >= 4;
                const title = getTrTitle(titleField, trData);
                const explain_code = false;
                return (
                    <Flc key={'IndTitle8' + i} gap={12} style={{ width: '100%' }}>
                        <Flr marginLeft={-10} maxWidth="100%" overflow="hidden" justifyContent="flex-start" gap={2}>
                            <Flr overflow="hidden">
                                <IndTitle8
                                    title={title}
                                    titleStyle={{
                                        overflow: 'hidden',
                                        textWrap: 'nowrap',
                                        display: 'inline-block',
                                    }}
                                >
                                    {titleChildren}
                                </IndTitle8>
                            </Flr>

                            {explain_code && (
                                <i style={{ display: 'inline-block', marginLeft: 2 }}>
                                    <TrIndExplain style={{ fontSize: 20 }} desCode={explain_code}></TrIndExplain>
                                </i>
                            )}
                        </Flr>

                        <Flc padding="0px 10px 0px 30px" gap={5}>
                            {trData?.map((item: any, i: number) => {
                                let { val, unit_name, last_compare } = item;
                                let P = getMappingComponent(item);
                                if (mappingInd['ZB'] == P) {
                                    P = mappingInd['LX0103'];
                                    last_compare = '';
                                }
                                const name = getTypeName(item, trData);
                                return (
                                    <Flr
                                        flexDirection={isMaxUnit ? 'column' : 'row'}
                                        key={'TrHbfgIndCardContent' + i}
                                        gap={isMaxUnit ? 2 : 5}
                                        alignItems="baseline"
                                        justifyContent="space-between"
                                        title={`${val ? val : ''} ${unit_name ? unit_name : ''}`}
                                    >
                                        <IndCssLgText10 textWrap="nowrap" fontSize="16px" color="#ADC0D3">
                                            {/* {name ?? ''} */}
                                            {name ? (name == '绝对值' ? '' : name) : ''}
                                        </IndCssLgText10>

                                        {P && (
                                            <P
                                                overflow="hidden"
                                                justifyContent="flex-end"
                                                value={val}
                                                unit={unit_name}
                                                lastCompare={last_compare}
                                            ></P>
                                        )}
                                    </Flr>
                                );
                            })}
                        </Flc>
                    </Flc>
                );
            })}
        </>
    );
};

// 河北发改宏观通用指标卡一
export const TrHbfgIndCard1 = ({
    apiData,
    titleField,
    uniqueField,
    selected,
    onChange,
    style,
    titleChildren,
    ...props
}: HgjjCardProps) => {
    const select = useSingleSelect(apiData?.data, uniqueField, selected);
    const Ele = select ? FlaIndCardBg1Ac : FlaIndCardBg1;
    return (
        <TrHbfgIndLayout apiData={apiData} onChange={onChange}>
            {
                <Ele gap={25} {...props} {...style}>
                    {apiData?.data && (
                        <TrHbfgIndCardContentV
                            data={apiData?.data}
                            titleField={titleField}
                            titleChildren={titleChildren}
                        ></TrHbfgIndCardContentV>
                    )}
                </Ele>
            }
        </TrHbfgIndLayout>
    );
};
// 河北发改宏观通用指标卡一 - 数组
export const TrHbfgIndCard1Arr = ({ apiData, childrenStyle, style, ...props }: HgjjCardArrProps) => {
    return (
        <Flr gap={20} {...style}>
            {apiData?.data?.map?.((item: any, i: any) => {
                return (
                    <TrHbfgIndCard1
                        key={'TrHbfgIndCard1Arr' + i}
                        apiData={{
                            ...apiData,
                            data: Array.isArray(item) ? item : [item],
                        }}
                        style={{ ...childrenStyle }}
                        {...props}
                    ></TrHbfgIndCard1>
                );
            })}
        </Flr>
    );
};

// 河北发改宏观通用指标卡二
export const TrHbfgIndCard2 = ({
    apiData,
    titleField,
    titleChildren,
    uniqueField,
    selected,
    onChange,
    style,
    ...props
}: HgjjCardProps) => {
    const select = useSingleSelect(apiData?.data, uniqueField, selected);
    const Ele = select ? FlaIndCardBg2Ac : FlaIndCardBg2;
    return (
        <TrHbfgIndLayout apiData={apiData} onChange={onChange}>
            {
                <Ele gap={25} {...props} {...style}>
                    {apiData?.data && (
                        <TrHbfgIndCardContentH
                            data={apiData?.data}
                            titleField={titleField}
                            titleChildren={titleChildren}
                        ></TrHbfgIndCardContentH>
                    )}
                </Ele>
            }
        </TrHbfgIndLayout>
    );
};
// 河北发改宏观通用指标卡二 - 数组
export const TrHbfgIndCard2Arr = ({ apiData, childrenStyle, style, ...props }: HgjjCardArrProps) => {
    return (
        <Flc gap={20} {...style}>
            {apiData?.data?.map?.((item: any, i: any) => {
                return (
                    <TrHbfgIndCard2
                        key={'TrHbfgIndCard2Arr' + i}
                        apiData={{
                            ...apiData,
                            data: Array.isArray(item) ? item : [item],
                        }}
                        style={{ ...childrenStyle }}
                        {...props}
                    ></TrHbfgIndCard2>
                );
            })}
        </Flc>
    );
};

// 河北发改宏观通用指标卡三
const mappingIndStyle: any = {
    LX0103: { height: 24, ...cssBgStyle1 },
    LX0203: { height: 24, ...cssBgStyle1 },
    LX0303: { height: 24, ...cssBgStyle1 },
    LX0126: { height: 24, ...cssBgStyle1 },
    LX0319: { height: 24, ...cssBgStyle1 },
};

export const TrHbfgIndCard3 = ({
    apiData,
    titleField,
    uniqueField,
    selected,
    onChange,
    style,
    ...props
}: HgjjCardProps) => {
    const select = useSingleSelect(apiData?.data, uniqueField, selected);
    const Ele = select ? FlaIndCardBg3Ac : FlaIndCardBg3;
    return (
        <TrHbfgIndLayout apiData={apiData} onChange={onChange}>
            {
                <Ele gap={25} {...props} {...style}>
                    {apiData?.data?.map?.((item: any, i: number) => {
                        const trData = trIndDataToArr(item);
                        const title = getTrTitle(titleField, trData);
                        return (
                            <Flc key={'IndTitle8' + i} gap={12}>
                                <IndTitle8
                                    marginLeft={-10}
                                    title={title}
                                    titleStyle={{
                                        overflow: 'hidden',
                                        textWrap: 'nowrap',
                                        display: 'inline-block',
                                    }}
                                ></IndTitle8>
                                <Flc padding="0px 10px 0px 18px" gap={2}>
                                    {trData?.map((item: any, i: number) => {
                                        const { val, unit_name, type_code, last_compare } = item;
                                        const P = getMappingComponent(item);
                                        const name = getTypeName(item, trData);
                                        return (
                                            <Flr
                                                key={'TrHbfgIndCardContent' + i}
                                                gap={5}
                                                flexDirection={name === "累计值" ? "column": "row"} 
                                                alignItems="baseline"
                                                justifyContent="space-between"
                                                title={`${val}${unit_name}`}
                                                {...mappingIndStyle[type_code]}
                                            >
                                                {<IndCssLgText10 textWrap="nowrap" fontSize="16px" >
                                                        {name ?? ''}
                                                </IndCssLgText10>}
                                                {P && (
                                                    <P
                                                        overflow="hidden"
                                                        justifyContent="flex-end"
                                                        value={val}
                                                        unit={unit_name}
                                                        lastCompare={last_compare}
                                                    ></P>
                                                )}
                                            </Flr>
                                        );
                                    })}
                                </Flc>
                            </Flc>
                        );
                    })}
                </Ele>
            }
        </TrHbfgIndLayout>
    );
};
// 河北发改宏观通用指标卡二 - 数组
export const TrHbfgIndCard3Arr = ({ apiData, childrenStyle, style, ...props }: HgjjCardArrProps) => {
    return (
        <Flc gap={20} {...style}>
            {apiData?.data?.map?.((item: any, i: any) => {
                return (
                    <TrHbfgIndCard3
                        key={'TrHbfgIndCard3Arr' + i}
                        apiData={{
                            ...apiData,
                            data: Array.isArray(item) ? item : [item],
                        }}
                        style={{ ...childrenStyle }}
                        {...props}
                    ></TrHbfgIndCard3>
                );
            })}
        </Flc>
    );
};
