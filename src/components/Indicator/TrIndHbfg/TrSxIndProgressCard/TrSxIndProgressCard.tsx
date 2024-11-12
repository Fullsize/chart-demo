/*
 * @Author: zhipengHuang
 * @Date: 2024-08-06 19:14:03
 * @LastEditors: Fullsize
 * @LastEditTime: 2024-09-09 11:47:46
 * @Description: 圆形进度条指标卡
 */
import React, { ReactElement } from 'react';
import BaseCircleProgress from '@/components/BaseAntd/process';
import { Flc, Flr, FlaIndCardBg4, FlaIndCardBg4Ac, F16, F26B, F12, F20, F30, F26, F14 } from '@/components/Indicator';
import { TrHbfgIndLayout, useSingleSelect } from '../TrHbfgIndLayout';
import { trIndDataToArr } from '../utils';
import { HgjjCardArrProps, HgjjCardProps } from '../IndProps';
import ImageMapWrapper from './ImageMap';
import { getTrTitle } from '../TrHbfgIndCard1';
import bg from './image/bg.svg';
import bg3 from './image/bg3.png';
import single from './image/single.png';
import triangle from './image/triangle.png';
import checkSingle from "./image/checkSingle.png";

export const TrIndProgressCard = (props: HgjjCardProps) => {
    const { uniqueField, titleField, apiData, selected, onChange, style } = props;
    const select = useSingleSelect(apiData?.data, uniqueField, selected);
    const Ele = select ? FlaIndCardBg4Ac : FlaIndCardBg4;
    return (
        <TrHbfgIndLayout apiData={apiData} onChange={onChange}>
            {
                <Ele gap={25} {...props} {...style}>
                    {apiData?.data && (
                        <TrSxIndProgressContent data={apiData?.data} titleField={titleField}></TrSxIndProgressContent>
                    )}
                </Ele>
            }
        </TrHbfgIndLayout>
    );
};
export const TrIndProgressCardArr = ({ apiData, childrenStyle, style, ...props }: HgjjCardArrProps) => {
    return (
        <Flr gap={20} {...style}>
            {apiData?.data?.map?.((item: any, i: any) => {
                return (
                    <TrIndProgressCard
                        key={'TrIndProgressCard' + i}
                        apiData={{
                            ...apiData,
                            data: Array.isArray(item) ? item : [item],
                        }}
                        style={{ ...childrenStyle }}
                        {...props}
                    ></TrIndProgressCard>
                );
            })}
        </Flr>
    );
};

export const TrIndProgressCard2 = (props: HgjjCardProps) => {
    const { uniqueField, titleField, apiData, selected, onChange, style } = props;
    const select = useSingleSelect(apiData?.data, uniqueField, selected);
    return (
        <TrHbfgIndLayout apiData={apiData} onChange={onChange}>
            {
                <Flr gap={25} {...props} {...style}>
                    {apiData?.data && (
                        <TrSxIndProgressContent2 data={apiData?.data} titleField={titleField}></TrSxIndProgressContent2>
                    )}
                </Flr>
            }
        </TrHbfgIndLayout>
    );
};

export const TrIndProgressCard2Arr = ({ apiData, childrenStyle, style, ...props }: HgjjCardArrProps) => {
    return (
        <Flr gap={20} {...style}>
            {apiData?.data?.map?.((item: any, i: any) => {
                return (
                    <TrIndProgressCard2
                        key={'TrIndProgressCard2' + i}
                        apiData={{
                            ...apiData,
                            data: Array.isArray(item) ? item : [item],
                        }}
                        style={{ ...childrenStyle }}
                        {...props}
                    ></TrIndProgressCard2>
                );
            })}
        </Flr>
    );
};

const TrSxIndProgressContent = ({
    titleField,
    data,
}: {
    titleField: string | Array<string | ReactElement> | ReactElement | undefined;
    data: Array<any>;
}) => {
    return (
        <Flr height={'100%'}>
            {data?.map?.((item: any, index: number) => {
                const trData = trIndDataToArr(item);
                const title: any = getTrTitle(titleField, trData);
                return (
                    <Flc height={'100%'} key={index}>
                        {trData?.map((item: any, index: number) => {
                            const { val, unit_name } = item;
                            return (
                                <Flc alignItems="center" gap={10} height={'100%'} justifyContent="center" key={index}>
                                    <BaseCircleProgress
                                        percent={val}
                                        size={80}
                                        strokeColor={{ 0: '#02FCD5', 100: '#051D2B' }}
                                        strokeWidth={8}
                                        customdom={<ImageMapWrapper title={title}></ImageMapWrapper>}
                                    />
                                    <F26B color="#fff" height="26px">
                                        {val}
                                        {unit_name}
                                    </F26B>
                                    <F16 whiteSpace="wrap" color="#D2E9FF" textAlign="center">
                                        {title}
                                    </F16>
                                </Flc>
                            );
                        })}
                    </Flc>
                );
            })}
        </Flr>
    );
};

const TrSxIndProgressContent2 = ({
    titleField,
    data,
}: {
    titleField: string | Array<string | ReactElement> | ReactElement | undefined;
    data: Array<any>;
}) => {
    return (
        <Flr height={'100%'}>
            {data?.map?.((item: any, index: number) => {
                const trData = trIndDataToArr(item);
                const title: any = getTrTitle(titleField, trData); //强行转一下
                return (
                    <Flc height={'100%'} key={index}>
                        {trData?.map((item: any, index: number) => {
                            const { val, unit_name } = item;
                            return (
                                <Flc alignItems="center" gap={3} height={'100%'} justifyContent="center" key={index}>
                                    <div
                                        style={{
                                            background: `url(${bg})`,
                                            backgroundSize: '100% 100%',
                                            padding: '7px',
                                        }}
                                    >
                                        <BaseCircleProgress
                                            percent={val}
                                            size={135}
                                            strokeColor={{ 0: '#02FCD5', 100: '#051D2B' }}
                                            strokeWidth={8}
                                            type={'dashboard'}
                                        />
                                    </div>
                                    <F16
                                        whiteSpace="wrap"
                                        color="#D2E9FF"
                                        textAlign="center"
                                        background={`url(${bg3})`}
                                        backgroundSize="100% 100%"
                                        padding="10px 5px"
                                        width="100%"
                                        overflow="hidden"
                                        textOverflow="ellipsis"
                                        white-space="nowrap"
                                    >
                                        {title}
                                    </F16>
                                </Flc>
                            );
                        })}
                    </Flc>
                );
            })}
        </Flr>
    );
};

export const TrIndProgressCard3Arr = ({ apiData, childrenStyle, style, ...props }: HgjjCardArrProps) => {
    return (
        <Flr gap={20} {...style}>
            {apiData?.data?.map?.((item: any, i: any) => {
                return (
                    <TrIndProgressCard3
                        key={'TrIndProgressCard3' + i}
                        apiData={{
                            ...apiData,
                            data: Array.isArray(item) ? item : [item],
                        }}
                        style={{ ...childrenStyle }}
                        {...props}
                    ></TrIndProgressCard3>
                );
            })}
        </Flr>
    );
};

export const TrIndProgressCard3 = (props: HgjjCardProps) => {
    const { uniqueField, titleField, apiData, selected, onChange, style } = props;
    return (
        <Flr gap={25} {...props} {...style}>
            <TrHbfgIndLayout apiData={apiData} onChange={onChange}>
                {apiData?.data && (
                    <TrSxIndProgressContent3 data={apiData?.data} titleField={titleField} selected={selected}></TrSxIndProgressContent3>
                )}
            </TrHbfgIndLayout>
        </Flr>
    );
};

const getCurrentValue = (title: any, value: any, index_code: any) => {
   
    const qualityObj: any = {
        "F01ZB00282108LX0101": [0, 50, 100, 150, 200, 300],
        'F01ZB00282101LX0101': [0, 35, 75, 115, 150, 250],
        "F01ZB00280504LX0301": [0, 50, 150, 250, 350, 420],
        "F01ZB00282102LX0101": [0, 150, 300, 500, 650, 800],
        "F01ZB00280501LX0301":[0, 150, 300, 500, 650, 800],
        F01ZB00282103LX0101: [0, 100, 200, 700, 1200, 2340],
        F01ZB00280502LX0301: [0, 100, 200, 700, 1200, 2340],
        CO: [0, 5, 10, 35, 60, 90],
        O3: [0, 160, 200, 300, 400, 800],
    };
    const keys = ['F01ZB00282108LX0101', 'F01ZB00282101LX0101', 'F01ZB00280504LX0301', 'F01ZB00282102LX0101', 'F01ZB00282103LX0101', 'F01ZB00280502LX0301', 'F01ZB00282103LX0101', "F01ZB00280502LX0301", "CO", "O3"];
    const findObjIndex = keys.findIndex((item: string) => index_code.indexOf(item) > -1);
    const quality = qualityObj[keys[findObjIndex]]; //key
    if(!quality) {
        return {
            title: title,
            level: "优",
            angle: 37.5 
        }
    }
    const findValueIndex = quality?.findIndex((item: any) => value < item) - 1;
    const index = findValueIndex < 0 ? 5 : findValueIndex; //值所处于的区间
    const qualityLimit = ['优', '良', '轻度', '中度', '重度', '严重'];
    const colorArray = [
        '#00C872',
        '#F5D53F',
        '#FF783A',
        '#FF5B5C',
        '#A40017',
        '#6B001E',
    ];
    let angle = 37.5; // default
    if (value >= quality[quality.length - 1]) {
        angle = 300.5;
    } else {
        const range = [quality[index], quality[index + 1]];
        angle = 37.5 + 47.5 * index + ((value - range[0]) / (range[1] - range[0])) * 47.5;
    }
    return {
        color: colorArray[index],
        level: qualityLimit[index],
        angle: angle,
    };
};

const StepProgressContent = ({ title, value, index_code,selected }: any) => {
    
    const { color, level, angle } = getCurrentValue(title, value, index_code);

    return (
        <Flc
            style={{
                borderRadius: '50%',
                height: '100px',
                width: '100px',
                padding: '10px',
                transform: 'translateX(40px)',
                position: 'relative',
                color: `${selected ? "#00FDFD" : "#fff"}`,
                backgroundImage: `url(${selected ? checkSingle : single})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 100%'
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    width: '1px',
                    height: '60px',
                    background: 'transparent',
                    left: 'calc(50% - 1px)',
                    top: 'calc(50% - 1px)',
                    transformOrigin: '0px 0px',
                    transform: `rotate(${angle}deg)`, //calc
                }}
            >
                <span
                    style={{
                        display: 'block',
                        height: '14px',
                        width: '16px',
                        background: `url(${triangle})`,
                        backgroundSize: '100% 100%',
                        position: 'absolute',
                        bottom: '-9px',
                        left: '-10px',
                        transform: `rotate(${180}deg)`,
                    }}
                ></span>
            </div>
            <F14 paddingTop="10px">首要污染物</F14>
            <F16 maringTop="-10px">{title}</F16>
            <F16 paddingBottom="15px">
                <F20 fontFamily="D-DIN">{value}</F20>
                {level}
            </F16>
        </Flc>
    );
};

const TrSxIndProgressContent3 = ({
    titleField,
    data,
    selected,
}: {
    titleField: string | Array<string | ReactElement> | ReactElement | undefined;
    data: Array<any>;
    selected: any
}) => {
    return (
        <Flr height={'100%'}>
            {data?.map?.((item: any, index: number) => {
                const trData = trIndDataToArr(item);
                const title: any = getTrTitle(titleField, trData);
                return (
                    <Flc height={'100%'} key={index}>
                        {trData?.map((item: any, index: number) => {
                            const { val, unit_name } = item;
                            const isChecked = item.index_code === selected?.index_code;
                            return (
                                <Flc alignItems="center" gap={3} height={'100%'} justifyContent="center" key={index}>
                                    <BaseCircleProgress
                                        percent={val}
                                        size={200}
                                        strokeWidth={10}
                                        steps={6}
                                        type={'dashboard'}
                                        className="step-color"
                                        customdom={<StepProgressContent title={title} index_code={item?.index_full_code} value={val} selected={isChecked}/>}
                                    />
                                    <F16 whiteSpace="wrap" color="#6D7172" textAlign="center">
                                        {title}
                                    </F16>
                                </Flc>
                            );
                        })}
                    </Flc>
                );
            })}
        </Flr>
    );
};
