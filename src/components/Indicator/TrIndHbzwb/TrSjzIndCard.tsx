/*
 * @Author: sungy
 * @Date: 2023-09-19 15:46:06
 * @LastEditors: sungy
 * @LastEditTime: 2024-04-11 09:57:27
 * @Description: 卡片指标类
 */
import React from 'react';
import { F12, F16, F16B, Flr, Flc, IndIco01, IndLineBg, SingleSelect, F26BL2 } from '@/components/Indicator';
import { GrZs, GrValUnit } from '@/components/Indicator';
import Empty from '@/components/Empty';

const IndCompaniesInfo = ({ apiData }: any) => {
    const { trTitle, icon, index_code_full_cname, val, unit_name, sumVal } = apiData ?? {};
    return (
        <Flc>
            {trTitle && (
                <F16B marginBottom={3} color="#FFF">
                    {trTitle}
                </F16B>
            )}
            <Flr justifyContent="flex-start">
                {icon ?? <IndIco01 />}
                <Flc marginLeft={8}>
                    <div>
                        <F16 color="#95C8FD">{index_code_full_cname ?? '--'}</F16>
                        <GrValUnit color="#D8F0FFFF" value={sumVal ?? val ?? '--'} unit={unit_name}></GrValUnit>
                    </div>
                </Flc>
            </Flr>
        </Flc>
    );
};

export const TrIndCompaniesInfoYj = ({ apiData, style, ...props }: any) => {
    return (
        <>
            <Flc height="100%" width="100%" overflow="hidden" gap={10} {...style}>
                {apiData?.map?.((data: any, i: any) => {
                    return (
                        <SingleSelect key={i} style={{ flex: 1, padding: 10 }} data={data} {...props}>
                            <Flr alignItems="flex-end" height="100%">
                                <IndCompaniesInfo apiData={data} />
                                <Flc flexDirection="row" alignItems="flex-end" marginRight="40px" marginBottom="20px">
                                    <F16B color="#FF5E60FF" marginRight="6px">
                                        预警
                                    </F16B>
                                    <F26BL2 color="#FF5E60FF" marginRight="6px" lineHeight="20px">
                                        {data.val ?? '--'}
                                    </F26BL2>
                                    <F16B color="#FF5E60FF">{data.unit_name}</F16B>
                                </Flc>
                            </Flr>
                        </SingleSelect>
                    );
                })}
                {!apiData || (apiData?.length <= 0 && <Empty />)}
            </Flc>
        </>
    );
};

// 企业监测-单项
export const TrIndCompaniesInfo = ({ apiData, style, ...props }: any) => {
    return (
        <SingleSelect style={{ flex: 1, padding: 10, ...style }} data={apiData} {...props}>
            <IndCompaniesInfo apiData={apiData} />
        </SingleSelect>
    );
};
// 企业监测-卡片-指标-二维结构
export const TrIndCardQyjc = ({ apiData, style, ...props }: any) => {
    return (
        <Flc height="100%" overflow="hidden auto" {...style} gap={8} paddingRight={5}>
            {' '}
            {apiData?.map?.((item: any, i: number) => {
                const { val, unit_name } = item[1] ?? {};
                return (
                    <Flc key={i}>
                        <Flr alignItems="flex-end" height="100%">
                            <TrIndCompaniesInfo apiData={item[0]} {...props}></TrIndCompaniesInfo>
                            {i === 0 ? (
                                val && <GrZs value={val} unit={unit_name} flex={1}></GrZs>
                            ) : (
                                <TrIndCompaniesInfo apiData={item[1]} {...props}></TrIndCompaniesInfo>
                            )}
                        </Flr>
                        <IndLineBg marginTop={6} />
                    </Flc>
                );
            })}
        </Flc>
    );
};

// 企业预测-左侧指标
export const TrIndCardQyyc = ({ apiData, style, ...props }: any) => {
    return (
        <Flc height="100%" overflow="hidden auto" justifyContent="flex-start" gap={8} paddingRight={5}>
            {' '}
            {apiData?.map?.((item: any, i: number) => {
                const { index_name1, val1, unit_name1, time_code } = item ?? {};
                return (
                    <Flc key={i}>
                        <SingleSelect style={{ flex: 1, padding: '10px 10px 12px 10px' }} data={item} {...props}>
                            <Flc>
                                <Flr justifyContent="center">
                                    <IndIco01></IndIco01>
                                    <Flc marginLeft={8}>
                                        <F16 color="#95C8FD">{index_name1 ?? '--'}</F16>
                                        <GrValUnit color="#D8F0FFFF" value={val1 ?? '--'} unit={unit_name1}></GrValUnit>
                                        <F12
                                            background="rgba(0, 0, 0, 0.30)"
                                            textAlign="center"
                                            borderRadius={6}
                                            padding="0 7px"
                                        >
                                            {time_code}
                                        </F12>
                                    </Flc>
                                </Flr>
                            </Flc>
                        </SingleSelect>
                        <IndLineBg marginTop={20} />
                    </Flc>
                );
            })}
        </Flc>
    );
};

export const TrIndZdQy = ({ data, ...props }: any) => {
    return (
        <SingleSelect {...props}>
            <Flc gap={20} {...props} paddingTop={10}>
                {' '}
                {data?.map?.((item: any, i: number) => {
                    return (
                        <Flc key={i}>
                            <Flr alignItems="flex-end" height="100%">
                                <TrIndCompaniesInfo flex={1} data={item[0]}></TrIndCompaniesInfo>
                            </Flr>
                            <IndLineBg marginTop={12} />
                        </Flc>
                    );
                })}
            </Flc>
        </SingleSelect>
    );
};
