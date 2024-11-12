/*
 * @Author: sungy
 * @Date: 2023-09-15 16:10:40
 * @LastEditors: Fullsize
 * @LastEditTime: 2024-08-26 11:50:31
 * @Description: 组合指标内容
 */
import React from 'react';
import equalSvg from './sx_equal.png';
import sxUp from './sx_up.png';
import sxDown from './sx_down.png';
import styles from './index.module.css';
import { isEmptyValue } from '@/utils';
import { Flr, F16B, F16, F26B, F20, IGrValueUnitProps } from '@/components/Indicator';

// 根据后端接口返回的状态映射颜色。
function getLastCompareColor(lastCompare?: string) {
    switch (lastCompare) {
        case 'up':
            // return '#71FF5E';
            return '#FFF';
        case 'down':
            // return '#FF5E60';
            return '#FFF';
        case 'equal':
            return '#FFF';
        default:
            return '#FFF';
    }
}

const getLastCompareFromValue = (value: any) => {
    const formatValue = Number(value);
    if(formatValue == 0) {
        return "equal"
    } else if(formatValue > 0) {
        return "up"
    } else if(formatValue < 0) {
        return "down"
    }
}
const ImgCompareSvg = ({ lastCompare }: any) => {
    return (
        <>
            {lastCompare == 'up' && <img alt="" src={sxUp} className={styles['image-icon-style']}></img>}
            {lastCompare == 'down' && <img alt="" src={sxDown} className={styles['image-icon-style']}></img>}
            {lastCompare == 'equal' && <img alt="" src={equalSvg}></img>}
        </>
    );
};

export const GrZs = ({ value, unit, lastCompare, ...style }: IGrValueUnitProps) => {
    const isNnum = !isNaN(value) && value !== null;
    return (
        <Flr alignItems="center" justifyContent="flex-start" {...style}>
            <ImgCompareSvg lastCompare={getLastCompareFromValue(value)}></ImgCompareSvg>
            <F16B fontFamily="D-DIN" marginLeft={4} color={isNnum ? (value > 0 ? '#FF5E60' : '#71FF5E') : ''}>
                {isEmptyValue(value) ? '--' : value}
                {unit}
            </F16B>
        </Flr>
    );
};

export const GrZsF26 = ({ value, unit, lastCompare, ...style }: IGrValueUnitProps) => {
    const isNnum = !isNaN(value) && value !== null;
    return (
        <Flr alignItems="center" justifyContent="flex-start" {...style}>
            <ImgCompareSvg lastCompare={getLastCompareFromValue(value)}></ImgCompareSvg>
            <F26B fontFamily="D-DIN" marginLeft={4} color={isNnum ? (value > 0 ? '#FF5E60' : '#71FF5E') : ''}>
                {isEmptyValue(value) ? '--' : value}
                {unit}
            </F26B>
        </Flr>
    );
};

export const GrZs2 = ({ value, unit, lastCompare, ...style }: IGrValueUnitProps) => {
    return (
        <Flr alignItems="center" justifyContent="flex-start" gap={5} maxWidth="100%" {...style}>
            <F20 fontFamily="D-DIN" color="#fff" textShadow="0 2px 3px #101715">
                {isEmptyValue(value) ? '--' : value}
                {unit}
            </F20>
            <ImgCompareSvg lastCompare={getLastCompareFromValue(value)}></ImgCompareSvg>
        </Flr>
    );
};

export const GrZs2Bg = ({ ...props }: IGrValueUnitProps) => {
    return (
        <GrZs2
            background="linear-gradient( 90deg, rgba(156,203,255,0.15) 0%, rgba(0,120,255,0.15) 49%, rgba(0,120,255,0) 100%)"
            borderRadius="100px"
            paddingLeft={10}
            {...props}
        ></GrZs2>
    );
};
export const GrZs3 = ({ value, unit, lastCompare, ...style }: IGrValueUnitProps) => {
    lastCompare = getLastCompareFromValue(value);
    return (
        <Flr alignItems="center" justifyContent="flex-start" gap={5} maxWidth="100%" {...style}>
            <F16 fontFamily="D-DIN">
                {isEmptyValue(value) ? '--' : value}
                {unit}
            </F16>
            {lastCompare == 'up' && <img alt="" style={{ transform: 'translateY(2px)' }} src={sxUp}></img>}
            {lastCompare == 'down' && <img alt="" style={{ transform: 'translateY(2px)' }} src={sxDown}></img>}
        </Flr>
    );
};
