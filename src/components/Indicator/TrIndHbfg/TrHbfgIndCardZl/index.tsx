/*
 * @Author: sungy
 * @Date: 2024-01-25 17:54:41
 * @LastEditors: sungy
 * @LastEditTime: 2024-06-12 11:25:00
 * @Description: 指标及图标结合使用
 */
import React from 'react';
import {
    FlaIndTitle8,
    Flr,
    F16,
    mappingInd,
    IndCssLgText10,
    Flc,
    cssBgStyle1,
    cssBgStyle2,
    FlaIndTitle8Ac,
} from '@/components/Indicator';
import styles from './index.module.css';

import { TrHbfgIndLayout, useSingleSelect } from '../TrHbfgIndLayout';
import { trIndDataToArr } from '@/components/Indicator/TrIndHbfg/utils';

import p1Url from './1.webp';
import p2Url from './2.webp';
import p3Url from './3.webp';
import p4Url from './4.webp';
import p5Url from './5.png';
import p6Url from './6.webp';
import p7Url from './7.png';
import p8Url from './8.webp';

// 总览指标卡
export type HgjjZlCardProps = {
    apiData: any;
    title?: any;
    titleField?: string | Array<string>;
    uniqueField?: Array<any> | string | number;
    selected?: any;
    onChange?: (v: any) => void;
    details?: React.ReactNode;
    style?: React.CSSProperties;
    childrenContent?: React.ReactNode;
    [key: string]: any;
};

const mappingIndStyle: any = {
    LX0103: { height: 24, ...cssBgStyle1 },
    LX0303: { height: 24, ...cssBgStyle1 },
    LX0126: { height: 24, ...cssBgStyle1 },
    LX0319: { height: 24, ...cssBgStyle1 },
};

const mappingIcon: any = {
    地区生产总值: p1Url,
    产业发展: p2Url,
    固定资产投资: p3Url,
    国内贸易: p4Url,
    对外贸易: p5Url,
    财政金融: p6Url,
    人民生活: p7Url,
    劳动就业: p8Url,
};

export const DetailsIcon = ({ title }: any) => {
    return (
        <Flc
            className={styles['details']}
            width={200}
            justifyContent="flex-start"
            gap={20}
            marginBottom={10}
            borderRadus={4}
            boxSizing="border-box"
        >
            <IndCssLgText10 width="fit-content" height={20} boxSizing="border-box" paddingTop={2} {...cssBgStyle2}>
                详情
            </IndCssLgText10>
            {mappingIcon[title] && <img width={200} height={80} src={mappingIcon[title]}></img>}
        </Flc>
    );
};

// 河北发改宏观通用指标卡
export const TrHbfgIndCardZl = ({
    title,
    apiData,
    uniqueField,
    selected,
    onChange,
    style,
    childrenContent,
    details,
    ...props
}: HgjjZlCardProps) => {
    const { data } = apiData;
    const select = useSingleSelect(data, uniqueField, selected);
    const Ele = select ? FlaIndTitle8Ac : FlaIndTitle8;
    const trData = trIndDataToArr(apiData?.data?.[0]);

    return (
        <TrHbfgIndLayout apiData={apiData} onChange={onChange} {...props}>
            <Ele
                className={styles['card']}
                title={title}
                titleChildren={trData?.[0]?.time_name}
                childrenStyle={{ flexDirection: 'row', gap: 10 }}
                flex={1}
            >
                <Flc flex={1} gap={20} justifyContent="flex-start" overflow="hidden">
                    {childrenContent}
                    {trData?.map((item: any, i: number) => {
                        const { val, unit_name, type_code, index_code_full_type_name, last_compare } = item;
                        const P = mappingInd[type_code];

                        return (
                            <Flr
                                key={'TrHbfgIndCard1' + i}
                                gap={10}
                                justifyContent="flex-start"
                                overflow="hidden"
                                title={`${val} ${unit_name}`}
                                {...mappingIndStyle[type_code]}
                            >
                                {P !== mappingInd['LX0101'] && <F16>{index_code_full_type_name ?? ''}</F16>}
                                <Flr flex={1} overflow="hidden">
                                    {P && <P value={val} unit={unit_name} lastCompare={last_compare}></P>}
                                </Flr>
                            </Flr>
                        );
                    })}
                </Flc>
                {details}
            </Ele>
        </TrHbfgIndLayout>
    );
};
