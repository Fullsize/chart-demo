/*
 * @Author: zhipengHuang
 * @Date: 2024-07-22 14:43:48
 * @LastEditors: zhipengHuang
 * @LastEditTime: 2024-08-13 18:06:37
 * @Description:
 */
import React from 'react';
import { F20, Flr, IndBg, IndCssLgText13 } from '@/components/Indicator';

import bg from './bg.png';
import bg_active from './bg_active.png';

export const IndBtn02 = ({ children, active = false, reverse = false, ...style }: any) => {
    return (
        <Flr minWidth={150} height={34} position="relative" {...style}>
            <Flr width="100%" height="100%" justifyContent="center">
                {active ? (
                    <IndCssLgText13 fontSize="20px" fontWeight="600">
                        {children}
                    </IndCssLgText13>
                ) : (
                    <F20 color="#fff">{children}</F20>
                )}
            </Flr>
            <Flr
                width="100%"
                height={34}
                lineHeight={34}
                position="absolute"
                top={0}
                zIndex={-1}
                justifyContent="center"
                transform={!reverse ? 'scaleX(-1)' : 'rotateX(1)'}
            >
                <IndBg imgUrl={active ? bg_active : bg} height="100%" flex={1}></IndBg>
            </Flr>
        </Flr>
    );
};
