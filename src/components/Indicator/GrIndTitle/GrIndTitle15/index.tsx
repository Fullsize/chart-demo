/*
 * @Author: sungy
 * @Date: 2023-09-15 17:17:51
 * @LastEditors: sungy
 * @LastEditTime: 2024-06-17 15:56:42
 * @Description: 标题指标类
 */
import React from 'react';
import { Flr, Flc, IFlaIndTitleProps, IndCssLgText7 } from '@/components/Indicator';
import titBgUrl from './tit_bg.png';
import bgUrl from './bg.png';
import LinkToJjtsgz from '@/components/nav/LinkJjtsgz';

export const GrIndTitle15: React.FC<IFlaIndTitleProps> = ({
    title,
    titleChildren,
    titleStyle,
    children,
    childrenStyle,
    bgStyle = {},
    ...props
}) => {
    return (
        <Flc justifyContent="normal" overflow="hidden" minHeight={200} color="#a4b4f4" {...props} position="relative">
            {/* 背景 模拟伪元素 */}
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    backgroundImage: `url(${bgUrl})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100% 100%',
                    ...bgStyle,
                }}
            ></div>

            {
                <Flr
                    position="relative"
                    backgroundSize="auto 100%"
                    backgroundImage={`url(${titBgUrl})`}
                    backgroundRepeat="no-repeat"
                    paddingLeft="60px"
                    backgroundPositionX="4px"
                    lineHeight="24px"
                    {...titleStyle}
                >
                    <Flr>
                        <LinkToJjtsgz title={title}>
                            <IndCssLgText7 fontSize="20px" fontWeight="bold" marginLeft="10px" minWidth={80}>
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
                <Flc flex={1} margin="40px 20px 40px 20px" justifyContent="normal" {...childrenStyle}>
                    {children}
                </Flc>
            </Flc>
        </Flc>
    );
};
