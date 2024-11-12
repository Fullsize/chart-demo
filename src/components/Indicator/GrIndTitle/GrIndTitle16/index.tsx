/*
 * @Author: sungy
 * @Date: 2023-09-15 17:17:51
 * @LastEditors: sungy
 * @LastEditTime: 2024-05-20 15:09:48
 * @Description: 标题指标类
 */
import React from 'react';
import { Flr, Flc, IFlaIndTitleProps, IndCssLgText7 } from '@/components/Indicator';
import titBgUrl1 from './bg1.png';
import titBgUrl2 from './bg2.png';

export const GrIndTitle16: React.FC<IFlaIndTitleProps> = ({
    title,
    titleStyle,
    children,
    childrenStyle,
    size = 'small',
    ...props
}) => {
    return (
        <Flc justifyContent="normal" overflow="hidden" height="100%" width="100%" {...props}>
            <Flr
                backgroundSize="auto 100%"
                backgroundImage={`url(${size === 'small' ? titBgUrl2 : titBgUrl1})`}
                backgroundRepeat="no-repeat"
                justifyContent="center"
                backgroundPositionX="center"
                height={size === 'small' ? '30px' : '40px'}
                paddingTop={size === 'small' ? '3px' : '0px'}
                {...titleStyle}
            >
                <IndCssLgText7 fontSize={size === 'small' ? '16px' : '20px'} fontWeight="bold">
                    {title}
                </IndCssLgText7>
            </Flr>
            <Flr
                flex={1}
                padding="20px"
                justifyContent="normal"
                background="linear-gradient( 180deg, rgba(97,135,222,0) 0%, rgba(39,63,150,0.2) 100%)"
                border="1px solid"
                borderImage="linear-gradient(180deg, rgba(50, 79, 186, 0), rgba(95, 151, 255, 0.25)) 1 1"
                {...childrenStyle}
            >
                {children}
            </Flr>
        </Flc>
    );
};
