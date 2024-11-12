/*
 * @Author: sungy
 * @Date: 2023-09-15 16:10:40
 * @LastEditors: zhipengHuang
 * @LastEditTime: 2024-08-14 11:05:18
 * @Description: 组合指标内容
 */
import React from 'react';
import {
    Flr,
    F14,
    F16,
    F26B,
    IndCssLgText4,
    IndCssLgText6,
    F24,
    IGrValueUnitProps,
    Flc,
    F20B,
    IndProgress,
    IndProgress2,
    F26,
    F14B,
    F16B,
} from '@/components/Indicator';

export const GrValUnit = ({ value, unit, ...style }: IGrValueUnitProps) => {
    return (
        <Flr fontFamily="D-DIN" alignItems="baseline" justifyContent="flex-start" gap={10} maxWidth="100%" {...style}>
            <IndCssLgText4
                fontSize={26}
                fontWeight="bold"
                flex={1}
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                color="#fff"
                textShadow="none"
            >
                {value ?? '--'}
            </IndCssLgText4>
            {unit && <F14 color="#ADC0D3">{unit}</F14>}
        </Flr>
    );
};

export const GrValUnit2 = ({ value, unit, fontStyle, ...style }: IGrValueUnitProps) => {
    return (
        <Flr fontFamily="D-DIN" alignItems="baseline" justifyContent="flex-start" maxWidth="100%" {...style}>
            <F26B color="#fff" textShadow="0 2px 3px #101715">
                {value || '--'}
            </F26B>
            {unit && (
                <F16 overflow="visible" margin="0 0 4px 4px">
                    {unit}
                </F16>
            )}
        </Flr>
    );
};
export const GrValUnit3 = ({ value, unit, ...style }: IGrValueUnitProps) => {
    return (
        <Flr fontFamily="D-DIN" alignItems="baseline" justifyContent="flex-start" maxWidth="100%" {...style}>
            <IndCssLgText6 fontSize={28} flex={1} whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
                {value ?? '--'}
            </IndCssLgText6>
            {unit && (
                <F14 overflow="visible" margin="0 0 4px 4px">
                    {unit}
                </F14>
            )}
        </Flr>
    );
};

export const GrValUnit4 = ({ value, unit, ...style }: IGrValueUnitProps) => {
    return (
        <Flr fontFamily="D-DIN" alignItems="baseline" justifyContent="flex-start" maxWidth="100%" {...style}>
            <F24 color="#FFF">{value ?? '--'}</F24>
            {unit && (
                <F14 overflow="visible" margin="0 0 4px 4px">
                    {unit}
                </F14>
            )}
        </Flr>
    );
};
export const GrValUnit5 = ({ value, unit, ...style }: IGrValueUnitProps) => {
    return (
        <Flr fontFamily="D-DIN" alignItems="baseline" justifyContent="flex-start" maxWidth="100%" {...style}>
            <F26B>{value ?? '--'}</F26B>
            {unit && (
                <F14 overflow="visible" margin="0 0 4px 4px">
                    {unit}
                </F14>
            )}
        </Flr>
    );
};

export const GrValUnit6 = ({ value, unit, ...style }: IGrValueUnitProps) => {
    return (
        <Flr fontFamily="D-DIN" alignItems="baseline" justifyContent="flex-start" maxWidth="100%" {...style}>
            <F20B color="#fff">{value ?? '--'}</F20B>
            {unit && (
                <F14 overflow="visible" margin="0 0 4px 4px">
                    {unit}
                </F14>
            )}
        </Flr>
    );
};

export const GrValUnit7 = ({ value, unit, ...style }: IGrValueUnitProps) => {
    return (
        <Flr fontFamily="D-DIN" alignItems="baseline" justifyContent="flex-start" maxWidth="100%" {...style}>
            <F16B>{value ?? '--'}</F16B>
            {unit && (
                <F14 overflow="visible" margin="0 0 4px 4px">
                    {unit}
                </F14>
            )}
        </Flr>
    );
};

export const GrValUnitProgress1 = ({ value, unit, ...style }: IGrValueUnitProps) => {
    return (
        <Flc
            fontFamily="D-DIN"
            alignItems="baseline"
            justifyContent="flex-start"
            maxWidth="130px"
            width="100%"
            gap={10}
            {...style}
        >
            <F20B flex={1} whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
                {value ? value + unit : '--'}
            </F20B>
            <IndProgress2 width="100%" color="#84DDEA" percent={value} />
        </Flc>
    );
};
