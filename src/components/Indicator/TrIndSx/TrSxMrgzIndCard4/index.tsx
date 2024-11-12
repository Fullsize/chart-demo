import React, { Fragment } from 'react';
import {
    Flr,
    Flc,
    GrValUnit4,
    F16,
    GrZs3,
    F14,
    IndProgress1,
    GrDialogMrgz,
    FlaIndTitle18,
} from '@/components/Indicator';
import { trIndDataToArrSx } from '../utils';
import { DialogChildren } from './dialogChildren';

import icon0 from './icon0.png';
import icon1 from './icon1.png';
import icon2 from './icon2.png';
import icon3 from './icon3.png';
import icon4 from './icon4.png';
import icon5 from './icon5.png';
import icon10 from "./icon10.png";
import icon11 from "./icon11.png";
import icon12 from "./icon12.png";
import icon13 from "./icon13.png";
import icon14 from "./icon14.png";
import icon15 from "./icon15.png";
import icon16 from "./icon16.png"


import type { PresetType } from '@/components/BaseAntd';

const mapIco: any = [icon0, icon1, icon2, icon3, icon4, icon5, icon10, icon11,icon12,icon13, icon14, icon15, icon16];

function getIcon(index: number) {
    const icon = mapIco[index];
    if (icon) {
        return icon;
    }
    return icon0;
}

type grNameValueType = {
    apiData: any;
    iconNum?: number;
    fieldNames?: any;
    presetType?: PresetType;
    imgStyle?: React.CSSProperties;
    [key: string]: any;
};

export const TrSxMrgzIndCard4 = ({ iconNum = 0, fieldNames = {}, apiData, presetType, ...style }: grNameValueType) => {
    const data = apiData?.data?.[0];
    const trData = trIndDataToArrSx(data);
    const {
        name: nameKey = 'index_code_full_cname',
        typeName: typeNameKey = 'index_code_full_type_name',
        val: valKey = 'val',
        unit: unitKey = 'unit_name',
        code: codeKey = 'index_full_code',
    } = fieldNames;

    const indexFullCodeList = trData.reduce((pre: any, cur: any) => pre + cur?.index_full_code + ',', '');
    return (
        <Flc
            style={{
                ...style.style,
                position: 'relative',
                zIndex: 1,
                marginTop: 40,
            }}
            className='retstte'
        >
            <img
                className="absolute  left-1/2 -translate-x-1/2  z-50 -top-[40px]"
                src={getIcon(iconNum)}
                style={{
                    width: 64,
                }}
            />
            <FlaIndTitle18
                style={{
                    ...style,
                    padding: '40px 14px 11px 14px',
                    height: 'fit-content',
                    background: "none",
                    border: "none",
                    boxShadow: "none"
                }}
                gap={14}
                title={null}
            >
                <Flc flex={1} gap={18} justifyContent="flex-start">
                    <Flr justifyContent="center">
                        <F16 lineHeight="18px" whiteSpace="break-spaces">
                            {trData?.[0]?.[nameKey] ?? '--'} {trData?.[0]?.[codeKey] && (
                            <>
                                <GrDialogMrgz
                                    title={trData?.[0]?.[nameKey] ?? '--'}
                                    iconStyle={{display: "inline-block"}}
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
                                    <DialogChildren
                                        indexData={trData?.[0]}
                                        indexFullCodeList={indexFullCodeList}
                                        presetType={presetType}
                                    />
                                </GrDialogMrgz>
                            </>
                        )}
                        </F16>
                        
                    </Flr>
                    {<GrValUnit4 value={trData?.[0]?.[valKey]} unit={trData?.[0]?.[unitKey]} justifyContent="center"></GrValUnit4>}
                    {/* <Flc justifyContent="flex-start" gap={12}>
                        {(trData.filter((v: any) => v?.type_code !== 'LX0101') ?? []).map((item: any, i: number) => (
                            <Fragment key={i}>
                                <Flr key={i} gap={6}>
                                    <F14 color="rgba(224,244,255,0.8)">{item?.[typeNameKey] ?? '--'}</F14>
                                    <GrZs3 value={item?.[valKey]} unit={item?.[unitKey]} lastCompare="up"></GrZs3>
                                </Flr>
                                {i === 0 && item?.type_code === 'LX0103' && (
                                    <IndProgress1 width={'100%'} percent={item?.[valKey]} color="#00FCE3" />
                                )}
                            </Fragment>
                        ))}
                    </Flc> */}
                </Flc>
            </FlaIndTitle18>
        </Flc>
    );
};

export const TrSxMrgzIndCardArr4 = ({ apiData, fieldNames = {}, childrenStyle, style,imageArray=[],presetType="week", ...props}: any) => {
    return (
            <Flr
                style={{
                    background: "linear-gradient(140deg, rgba(86, 111, 141, 0.3) 0%, rgba(48, 62, 85, 0.3) 40%, rgba(31, 32, 38, 0.3) 100%)",
                    boxShadow: "rgba(0, 0, 0, 0.17) 0px 6px 6px 0px",
                    borderRadius: "12px",
                    border: "1px solid rgba(64, 82, 114, 0.7)",
                    ...style,
                }}
            >
                {apiData?.data?.map?.((item: any, i: any) => {
                    return (
                        <TrSxMrgzIndCard4
                            key={'TrSxMrgzIndCard4' + i}
                            apiData={{
                                ok: true,
                                data: Array.isArray(item) ? item : [item],
                                sign: apiData?.sign,
                            }}
                            style={{ ...childrenStyle }}
                            fieldNames={fieldNames}
                            iconNum={imageArray[i] || i}
                            presetType={presetType}
                            {...props}
                        ></TrSxMrgzIndCard4>
                    );
                })}
            </Flr>
    );
};

