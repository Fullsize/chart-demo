import React, { Fragment } from 'react';
import { Flr, Flc, GrValUnit4, F16, GrZs3, F14, IndProgress2, GrDialogMrgz } from '@/components/Indicator';
import { trIndDataToArrSx } from '../utils';
import { DialogChildren3 } from './dialogChildren3';
import { DialogChildren } from './dialogChildren';

import icon0 from './icon0.png';
import icon1 from './icon1.png';
import icon2 from './icon2.png';
import icon3 from './icon3.png';
import icon4 from './icon4.png';
import icon5 from './icon5.png';
import icon6 from './icon6.png';
import icon7 from './icon7.png';
import icon8 from './icon8.png';
import icon9 from './icon9.png';
import icon10 from "./icon10.png";
import icon11 from "./icon11.png";
import dayjs from 'dayjs';
import dayofYear from "dayjs/plugin/dayOfYear";
// const dayOfYear = require('dayjs/plugin/dayOfYear')
dayjs.extend(dayofYear)
import type { PresetType } from '@/components/BaseAntd';
const getYearWeep = (time: string) => {
    if(!time) {
        return;
    }
    const t1 = dayjs(time.slice(0,4)).dayOfYear((Number(time.slice(5,7))-1)*7).add(1, "day").format("M.DD");
    const t2 = dayjs(time.slice(0,4)).dayOfYear((Number(time.slice(5,7)))*7).format("M.DD") 
    return `${t1}-${t2}`
}
const mapIco: any = [icon0, icon1, icon2, icon3, icon4, icon5, icon6, icon7, icon8, icon9, icon10, icon11];

function getIcon(index: number) {
    const icon = mapIco[index];
    if (icon) {
        return icon;
    }
    return icon0;
}

export type grNameValueType = {
    apiData: any;
    iconNum?: number;
    fieldNames?: any;
    presetType?: PresetType;
    showLX0101?: boolean;
    renderSearch?: React.ReactNode;
    [key: string]: any;
};

export const TrSxMrgzIndCard2 = ({
    iconNum = 0,
    fieldNames = {},
    apiData,
    presetType,
    requestParams = {},
    showLX0101 = false,
    renderSearch,
    isRow = false,
    showMore = true,
    showTime = false,
    ...style
}: grNameValueType) => {
    const data = apiData?.data?.[0];
    const trData = trIndDataToArrSx(data);

    const subTrData = showLX0101
        ? [trData[1], trData[2]]
        : [trData[1], trData[2]].filter((item: any) => item && item?.type_code !== 'LX0101');

    const {
        name: nameKey = 'index_code_full_cname',
        typeName: typeNameKey = 'index_code_full_type_name',
        val: valKey = 'val',
        unit: unitKey = 'unit_name',
        code: codeKey = 'index_full_code',
    } = fieldNames;

    const indexFullCodeList = trData.reduce((pre: any, cur: any) => pre + cur?.index_full_code + ',', '');
    const size: any = trData?.length === 1 ? 'small' : '';
    const imgHeight = size === 'small' ? 86 : 100;
    // console.log(trData?.[0]?.time_name, getYearWeep(trData?.[0]?.time_name))
    // console.log(trData, getYearWeep(trData?.time_name),"222")
    return (
        <Flr
            style={{
                ...style.style,
            }}
            gap={14}
        >
            <Flc
                style={{
                    width: 78,
                    background:
                        'linear-gradient(140deg, rgba(86, 111, 141, 0.3) 0%, rgba(48, 62, 85, 0.3) 40%, rgba(31, 32, 38, 0.3) 100%)',
                    borderRadius: '6px',
                    border: '1px solid #2F3C52',
                    boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.12)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: imgHeight,
                }}
            >
                <img
                    src={getIcon(iconNum)}
                    style={{
                        width: 64,
                    }}
                />
            </Flc>

            <Flc flex={1} height="100%" gap={18} justifyContent='center'>
                <Flr justifyContent="flex-start" gap={12}>
                    <F16 lineHeight="18px" whiteSpace="break-spaces">
                        {trData?.[0]?.[nameKey] ?? '--'} {showTime && `(${getYearWeep(trData?.[0]?.time_name)})`}
                    </F16>
                    {trData?.[0]?.[codeKey] && (
                        <>
                            <GrDialogMrgz
                                title={trData?.[0]?.[nameKey] ?? '--'}
                                icon={
                                    <span
                                        style={{
                                            display: 'inline-block',
                                            width: 37,
                                            height: 16,
                                            lineHeight: '17px',
                                            textAlign: 'center',
                                            backgroundColor: '#445362',
                                            fontSize: '12px',
                                            transform: 'translateX(4px)',
                                            borderRadius: '6px 0 6px 0',
                                        }}
                                    >
                                        详情
                                    </span>
                                }
                            >
                                <DialogChildren3
                                    indexData={trData?.[0]}
                                    indexFullCodeList={indexFullCodeList}
                                    presetType={presetType}
                                    requestParams={requestParams}
                                    renderSearch={renderSearch}
                                />
                            </GrDialogMrgz>
                        </>
                    )}
                </Flr>
                {isRow ? <Flr gap={10}>
                    {<GrValUnit4 value={trData?.[0]?.[valKey]} unit={trData?.[0]?.[unitKey]}></GrValUnit4>}
                    {showMore && subTrData.map((item: any, i: number) => (
                        <Fragment key={i}>
                            <Flr key={i} gap={6} alignItems='baseline' marginTop={"4px"}>
                                <F14 color="rgba(224,244,255,0.8)">{item?.[typeNameKey] ?? '--'}</F14>
                                <GrZs3 value={item?.[valKey]} unit={item?.[unitKey]} lastCompare="up"></GrZs3>
                            </Flr>
                            {/* {i === 0 && item?.type_code === 'LX0103' && (
                                <IndProgress2 width={'100%'} percent={item?.[valKey]} color="#00FCE3" />
                            )} */}
                        </Fragment>
                    ))}
                </Flr>: 
                <>
                    <GrValUnit4 value={trData?.[0]?.[valKey]} unit={trData?.[0]?.[unitKey]}></GrValUnit4>
                    {showMore && subTrData.map((item: any, i: number) => (
                        <Fragment key={i}>
                            <Flr key={i} gap={6}>
                                <F14 color="rgba(224,244,255,0.8)">{item?.[typeNameKey] ?? '--'}</F14>
                                <GrZs3 value={item?.[valKey]} unit={item?.[unitKey]} lastCompare="up"></GrZs3>
                            </Flr>
                        </Fragment>
                    ))}
                </>}
             
            </Flc>
        </Flr>
    );
};

export const TrSxMrgzIndCardArr2 = ({ apiData, fieldNames = {}, childrenStyle, style, ...props }: any) => {
    return (
        <Flr
            style={{
                ...style,
            }}
        >
            {apiData?.data?.map?.((item: any, i: any) => {
                return (
                    <TrSxMrgzIndCard2
                        key={'TrSxMrgzIndCard2' + i}
                        apiData={{
                            ok: true,
                            data: Array.isArray(item) ? item : [item],
                            sign: apiData?.sign,
                        }}
                        style={{ ...childrenStyle }}
                        fieldNames={fieldNames}
                        iconNum={i}
                        presetType="week"
                        {...props}
                    ></TrSxMrgzIndCard2>
                );
            })}
        </Flr>
    );
};


export const TrSxMrgzIndCard21= ({
    iconNum = 0,
    fieldNames = {},
    apiData,
    presetType,
    requestParams = {},
    showLX0101 = false,
    renderSearch,
    isRow = false,
    showMore = true,
    dialogType="type2",
    ...style
}: grNameValueType) => {
    const data = apiData?.data?.[0];
    const trData = trIndDataToArrSx(data);

    const subTrData = showLX0101
        ? [trData[1], trData[2]]
        : [trData[1], trData[2]].filter((item: any) => item && item?.type_code !== 'LX0101');

    const {
        name: nameKey = 'index_code_full_cname',
        typeName: typeNameKey = 'index_code_full_type_name',
        val: valKey = 'val',
        unit: unitKey = 'unit_name',
        code: codeKey = 'index_full_code',
    } = fieldNames;

    const indexFullCodeList = trData.reduce((pre: any, cur: any) => pre + cur?.index_full_code + ',', '');
    const size: any = trData?.length === 1 ? 'small' : '';
    const imgHeight = size === 'small' ? 86 : 100;
    return (
        <Flr
            style={{
                ...style.style,
            }}
            gap={14}
        >
            <Flc
                style={{
                    width: 78,
                    background:
                        'linear-gradient(140deg, rgba(86, 111, 141, 0.3) 0%, rgba(48, 62, 85, 0.3) 40%, rgba(31, 32, 38, 0.3) 100%)',
                    borderRadius: '6px',
                    border: '1px solid #2F3C52',
                    boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.12)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: imgHeight,
                }}
            >
                <img
                    src={getIcon(iconNum)}
                    style={{
                        width: 64,
                    }}
                />
            </Flc>

            <Flr flex={1} height="100%" gap={18} justifyContent='space-between'>
                <Flc justifyContent='space-between' gap={20}>
                    <Flr justifyContent="flex-start" gap={12}>
                        <F16 lineHeight="18px" whiteSpace="break-spaces">
                            {trData?.[0]?.[nameKey] ?? '--'}
                        </F16>
                        {trData?.[0]?.[codeKey] && (
                            <>
                                <GrDialogMrgz
                                    title={trData?.[0]?.[nameKey] ?? '--'}
                                    icon={
                                        <span
                                            style={{
                                                display: 'inline-block',
                                                width: 37,
                                                height: 16,
                                                lineHeight: '17px',
                                                textAlign: 'center',
                                                backgroundColor: '#445362',
                                                fontSize: '12px',
                                                transform: 'translateX(4px)',
                                                borderRadius: '6px 0 6px 0',
                                            }}
                                        >
                                            详情
                                        </span>
                                    }
                                >
                                    {dialogType == "type1" ? <DialogChildren3
                                    indexData={trData?.[0]}
                                    indexFullCodeList={indexFullCodeList}
                                    presetType={presetType}
                                    requestParams={requestParams}
                                    renderSearch={renderSearch}
                                /> : <DialogChildren
                                indexData={trData?.[0]}
                                indexFullCodeList={indexFullCodeList}
                                presetType={presetType}
                                requestParams={requestParams}
                                renderSearch={renderSearch}
                            />}
                                </GrDialogMrgz>
                            </>
                        )}
                    </Flr>
                    <Flr gap={10}>
                        {<GrValUnit4 value={trData?.[0]?.[valKey]} unit={trData?.[0]?.[unitKey]}></GrValUnit4>}
                    </Flr>
                </Flc>
                {showMore && <Flc justifyContent='space-between' gap={20}>
                    {subTrData.map((item: any, i: number) => (
                            <Fragment key={i}>
                                <Flr key={i} gap={6}>
                                    <F14 color="rgba(224,244,255,0.8)">{item?.[typeNameKey] ?? '--'}</F14>
                                    <GrZs3 value={item?.[valKey]} unit={item?.[unitKey]} lastCompare="up"></GrZs3>
                                </Flr>
                            </Fragment>
                        ))}
                </Flc>}
                {/*  */}
            </Flr>
        </Flr>
    );
};

export const TrSxMrgzIndCardArr21 = ({ apiData, fieldNames = {}, childrenStyle, style, ...props }: any) => {
    return (
        <Flr
            style={{
                ...style,
            }}
        >
            {apiData?.data?.map?.((item: any, i: any) => {
                return (
                    <TrSxMrgzIndCard2
                        key={'TrSxMrgzIndCard2' + i}
                        apiData={{
                            ok: true,
                            data: Array.isArray(item) ? item : [item],
                            sign: apiData?.sign,
                        }}
                        style={{ ...childrenStyle }}
                        fieldNames={fieldNames}
                        iconNum={i}
                        presetType="week"
                        {...props}
                    ></TrSxMrgzIndCard2>
                );
            })}
        </Flr>
    );
};