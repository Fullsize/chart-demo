/*
 * @Author: sungy
 * @Date: 2023-09-15 16:10:40
 * @LastEditors: sungy
 * @LastEditTime: 2024-03-27 16:23:09
 * @Description: 组合指标内容
 */
import React from 'react';
import indIcoYjSvg from '@svg/ind-ico-yj.svg';

import { F14, F20B, F26BL2, IndBtn2Bg, IndBtn3Bg, IndBtn4Bg } from '@/components/Indicator';
import { MapIcon, RankIcon } from './GrSvgIcon';

export const GrQylb = ({ name, value, unit, ...props }: any) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', ...props }}>
            <F26BL2 color={value > 0 ? '#FF5E60FF' : '#44d8be'}>
                {value ?? '--'}
                {unit}
            </F26BL2>
        </div>
    );
};

export const GrValUnitF14 = ({ name, value, unit, ...props }: any) => {
    return (
        <div style={{ ...props }}>
            <F20B>{value}</F20B>
            {unit && <F14 marginLeft={4}>{unit}</F14>}
        </div>
    );
};

export const GrIndYjR = ({ ...props }: any) => {
    return (
        <IndBtn2Bg width={22} maxWidth={22} minWidth={22} lineHeight="22px" {...props}>
            <img alt="" src={indIcoYjSvg}></img>
        </IndBtn2Bg>
    );
};
export const GrIndYjB = ({ ...props }: any) => {
    return (
        <IndBtn3Bg width={22} maxWidth={22} minWidth={22} lineHeight="22px" {...props}>
            <img alt="" src={indIcoYjSvg}></img>
        </IndBtn3Bg>
    );
};
export const GrIndYjG = ({ ...props }: any) => {
    return (
        <IndBtn4Bg width={22} maxWidth={22} minWidth={22} lineHeight="22px" {...props}>
            <img alt="" src={indIcoYjSvg}></img>
        </IndBtn4Bg>
    );
};

/**
 * 地图图标svg
 * @returns
 */
export const GrIndMapRed = (props: any) => {
    return (
        <MapIcon
            style={{
                fontSize: 22,
                color: 'rgba(103, 19, 29,1)',
                width: 22,
                height: 22,
                ...props,
            }}
        />
    );
};

/**
 * 地图图标svg
 * @returns
 */
export const GrIndMapGreen = (props: any) => {
    return (
        <MapIcon
            style={{
                fontSize: 22,
                color: 'rgba(17, 226, 215, 1)',
                width: 22,
                height: 22,
                ...props,
            }}
        />
    );
};

/**
 * 地图图标svg
 * @returns
 */
export const GrIndMapBlue = (props: any) => {
    return (
        <MapIcon
            style={{
                fontSize: 22,
                color: 'rgba(17, 123, 226, 1)',
                width: 22,
                height: 22,
                ...props,
            }}
        />
    );
};

/**
 * 地图图标svg
 * @returns
 */
export const GrIndRankRed = (props: any) => {
    return (
        <RankIcon
            style={{
                fontSize: 22,
                color: 'rgba(103, 19, 29,1)',
                width: 22,
                height: 22,
                ...props,
            }}
        />
    );
};

/**
 * 地图图标svg
 * @returns
 */
export const GrIndRankGreen = (props: any) => {
    console.log('props', props);
    return (
        <RankIcon
            style={{
                fontSize: 22,
                color: 'rgba(17, 226, 215, 1)',
                width: 22,
                height: 22,
                ...props,
            }}
        />
    );
};

/**
 * 地图图标svg
 * @returns
 */
export const GrIndRankBlue = (props: any) => {
    return (
        <RankIcon
            style={{
                fontSize: 22,
                color: 'rgba(17, 123, 226, 1)',
                width: 22,
                height: 22,
                ...props,
            }}
        />
    );
};
