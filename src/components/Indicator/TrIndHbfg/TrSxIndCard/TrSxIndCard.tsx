/*
 * @Author: zhipengHuang
 * @Date: 2024-08-02 09:47:07
 * @LastEditors: zhipengHuang
 * @LastEditTime: 2024-09-05 17:56:53
 * @Description: 根据UI讨论设计该组件只提供最基本的文字+icon组合
 */
import React, { ReactElement } from 'react';
import { Flc, Flr, F16, GrValUnit2, F16T } from '@/components/Indicator';
import { TrHbfgIndLayout, useSingleSelect } from '../TrHbfgIndLayout';
import { trIndDataToArr } from '../utils';
import { HgjjCardArrProps, HgjjCardProps } from '../IndProps';
import ImageWrapper from './GetImageTemplate';
import styles from './index.module.css';
import { getTrTitle, getMappingComponent } from '../TrHbfgIndCard1';

/**
 * 默认指标卡
 */
export const TrSxIndCard1 = (props: HgjjCardProps) => {
    const { uniqueField, titleField, apiData, selected, onChange, style } = props;
    const select = useSingleSelect(apiData?.data, uniqueField, selected);
    return (
        <Flr
            justifyContent={'center'}
            style={{ ...style }}
            className={`${styles.trsx_card1} ${select ? styles.trsx_card_selected : ''}`}
        >
            <TrHbfgIndLayout apiData={apiData} onChange={onChange}>
                {apiData?.data && (
                    <TrSxIndCardContent data={apiData?.data} titleField={titleField} type={'1'}></TrSxIndCardContent>
                )}
            </TrHbfgIndLayout>
        </Flr>
    );
};

export const TrSxIndCard1Arr = ({ apiData, childrenStyle, style, ...props }: HgjjCardArrProps) => {
    return (
        <Flr  gap={10} flexWrap={'wrap'} width="100%" {...style}>
            {apiData?.data?.map?.((item: any, i: any) => {
                return (
                    <TrSxIndCard1
                        key={'TrSxIndCard1' + i}
                        apiData={{
                            ...apiData,
                            data: Array.isArray(item) ? item : [item],
                        }}
                        style={{ ...childrenStyle }}
                        {...props}
                    ></TrSxIndCard1>
                );
            })}
        </Flr>
    );
};
const TrSxIndCardContent = ({
    titleField,
    data,
    style,
    type,
}: {
    titleField: string | Array<string | ReactElement> | ReactElement | undefined;
    data: Array<any>;
    style?: any;
    type?: any;
}) => {
    return (
        <Flr height={'100%'} {...style}>
            {data?.map?.((item: any, index: number) => {
                const trData = trIndDataToArr(item);
                const title: any = getTrTitle(titleField, trData);
                return (
                    <React.Fragment key={'TrSxIndCardContentFragment' + index}>
                        {trData?.map((item: any, index: number) => {
                            const P = getMappingComponent(item);
                            const { val, unit_name, last_compare } = item;
                            return (
                                <Flr
                                    key={'TrSxIndCardContent' + index}
                                    alignItems="center"
                                    gap={10}
                                    height={'100%'}
                                    justifyContent="center"
                                >
                                    <ImageWrapper indexCode={item?.index_code || item?.index_code_full_cname} type={type} />
                                    <Flc justifyContent="center">
                                        <F16T color="#D2E9FF" whiteSpace="wrap" paddingRight="10px"> {title}</F16T>
                                        {P && <P value={val} unit={unit_name} lastCompare={last_compare}></P>}
                                    </Flc>
                                </Flr>
                            );
                        })}
                    </React.Fragment>
                );
            })}
        </Flr>
    );
};

export const TrSxIndCard2 = (props: HgjjCardProps) => {
    const { uniqueField, titleField, apiData, selected, onChange, style } = props;
    const select = useSingleSelect(apiData?.data, uniqueField, selected);
    return (
        <Flr {...style} className={`${styles.trsx_card2} ${select ? styles.trsx_card_selected : ''}`}>
            <TrHbfgIndLayout apiData={apiData} onChange={onChange}>
                {apiData?.data && (
                    <TrSxIndCardContent
                        data={apiData?.data}
                        titleField={titleField}
                        style={{
                            flexWrap: 'wrap',
                            gap: '10px',
                        }}
                        type={'2'}
                    ></TrSxIndCardContent>
                )}
            </TrHbfgIndLayout>
        </Flr>
    );
};

export const TrSxIndCard2Arr = ({ apiData, childrenStyle, style, ...props }: HgjjCardArrProps) => {
    return (
        <Flr {...style} gap={10} flexWrap={'wrap'} width="100%">
            {apiData?.data?.map?.((item: any, i: any) => {
                return (
                    <TrSxIndCard2
                        key={'TrSxIndCard2' + i}
                        apiData={{
                            ...apiData,
                            data: Array.isArray(item) ? item : [item],
                        }}
                        style={{ ...childrenStyle }}
                        {...props}
                    ></TrSxIndCard2>
                );
            })}
        </Flr>
    );
};