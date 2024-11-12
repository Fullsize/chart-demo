/*
 * @Author: sungy
 * @Date: 2023-09-15 17:17:51
 * @LastEditors: sungy
 * @LastEditTime: 2024-06-25 10:37:49
 * @Description: 标题指标类
 */
import React from 'react';
import { Flr, Flc, IFlaIndTitleProps, IndCssLgText7 } from '@/components/Indicator';
import titBgUrl from './tit_bg.png';
import LinkToJjtsgz from '@/components/nav/LinkJjtsgz';

export const GrIndTitle14: React.FC<IFlaIndTitleProps> = ({
    title,
    titleChildren,
    titleStyle,
    children,
    childrenStyle,
    bgStyle = {},
    ...props
}) => {
    return (
        <Flc
            justifyContent="normal"
            overflow="hidden"
            minHeight={200}
            color="#a4b4f4"
            background="linear-gradient( 180deg, rgba(97,135,222,0) 0%, rgba(39,63,150,0.2) 100%)"
            border="1px solid rgba(95, 151, 255, 0.25)"
            borderImage="linear-gradient(180deg, rgba(50, 79, 186, 0), rgba(95, 151, 255, 0.25)) 1 1"
            {...props}
            position="relative"
        >
            {
                <Flr
                    position="relative"
                    backgroundSize="auto 100%"
                    backgroundImage={`url(${titBgUrl})`}
                    backgroundRepeat="no-repeat"
                    paddingLeft="40px"
                    backgroundPositionX="4px"
                    lineHeight="24px"
                    {...titleStyle}
                >
                    <Flr>
                        <LinkToJjtsgz title={title}>
                            <IndCssLgText7 fontSize="16px" color="#FFF" marginLeft="5px" minWidth={80}>
                                {title}
                            </IndCssLgText7>
                        </LinkToJjtsgz>
                    </Flr>
                    <Flr position="absolute" right={10}>
                        {titleChildren}
                    </Flr>
                </Flr>
            }
            <Flc width="100%" flex={1} overflow="hidden">
                <Flc flex={1} margin="20px 20px 20px 20px" justifyContent="normal" {...childrenStyle}>
                    {children}
                </Flc>
            </Flc>
        </Flc>
    );
};
