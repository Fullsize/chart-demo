/*
 * @Author: sungy
 * @Date: 2023-09-15 16:10:40
 * @LastEditors: zhipengHuang
 * @LastEditTime: 2024-08-14 11:04:55
 * @Description: 组合指标内容
 */
import React from 'react';
import { Flr, F14, F26B, IndCssLgText4, IGrValueUnitProps, F20 } from '@/components/Indicator';

export const GrPm = ({ value, ...style }: IGrValueUnitProps) => {
    return (
        <Flr alignItems="baseline" justifyContent="flex-start" gap={5} {...style}>
            <F14>第</F14>
            {
                <F26B overflow="visible">
                    <IndCssLgText4>{value ?? '--'}</IndCssLgText4>
                </F26B>
            }
            <F14>名</F14>
        </Flr>
    );
};

export const GrPm2 = ({ value, ...style }: IGrValueUnitProps) => {
    return (
        <Flr alignItems="baseline" justifyContent="flex-start" gap={5} {...style}>
            <F20 fontFamily="D-DIN" overflow="visible" color="#FFFFFF" textShadow="0 2px 3px #101715">
                {value || '--'}
            </F20>
        </Flr>
    );
};
