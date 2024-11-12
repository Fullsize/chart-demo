/*
 * @Author: zhipengHuang
 * @Date: 2024-07-30 10:41:57
 * @LastEditors: zhipengHuang
 * @LastEditTime: 2024-08-13 17:56:17
 * @Description:
 */
import React from 'react';
import { Flr, IndCssLgText11, IndBg, F60L20, F54 } from '@/components/Indicator';
// import navTopBar01Url from './top-bar1.png';
// import navTopBar02Url from './top-bar2.png';
// import navTopBar03Url from './top-bar3.png';
import center_bg from './center_bg.png';

export default function NavTopBar({ title, leftNav, rightNav }: any) {
    const FText = title?.length > 15 ? F54 : F60L20;

    return (
        <Flr width="100%" height={100}>
            <IndBg imgUrl={null} height={90} flex={1} overflow="visible">
                {leftNav}
            </IndBg>
            <IndBg imgUrl={center_bg} height={90} padding={'0px 150px'}>
                <div style={{ position: 'relative', marginTop: title?.length > 15 ? 10 : 0, zIndex: 10 }}>
                    {
                        <FText>
                            <IndCssLgText11>{title}</IndCssLgText11>
                        </FText>
                    }
                    <FText
                        position="absolute"
                        top={0}
                        textShadow="rgb(15 19 58 / 70%) 0px 10px 8px"
                        zIndex={-1}
                        fontWeight="700"
                    >
                        {title}
                    </FText>
                </div>
            </IndBg>
            <IndBg imgUrl={null} height={90} flex={1} overflow="visible">
                {rightNav}
            </IndBg>
        </Flr>
    );
}
