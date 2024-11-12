/*
 * @Author: sungy
 * @Date: 2023-09-15 17:17:51
 * @LastEditors: sungy
 * @LastEditTime: 2024-06-24 18:45:00
 * @Description: 标题指标类
 */
import React from 'react';
import { Flr, Flc, IFlaIndTitleProps, IndCssLgText7, F16, F14 } from '@/components/Indicator';
import bgUrl from './bg.png';

export const FlaIndTitle11: React.FC<IFlaIndTitleProps> = ({
    title,
    titleChildren,
    titleStyle,
    children,
    childrenStyle,
    ...props
}) => {
    return (
        <Flc
            justifyContent="normal"
            overflow="hidden"
            backgroundSize="100% 100%"
            backgroundImage={`url(${bgUrl})`}
            width={300}
            height={200}
            boxShadow="rgba(15, 19, 58, 0.6) 0px 5px 10px 0px"
            borderRadius="30px 30px 0px 30px"
            color="#a4b4f4"
            {...props}
        >
            {
                <Flr margin="8px 0px 0px 45px" position="relative">
                    <Flr>
                        <IndCssLgText7 fontSize="20px" fontWeight="bold">
                            {title}
                        </IndCssLgText7>
                    </Flr>
                    <Flr position="absolute" right={10}>
                        {titleChildren}
                    </Flr>
                </Flr>
            }
            <Flc width="100%" flex={1} overflow="hidden">
                <Flc
                    margin="20px 20px 10px 20px"
                    justifyContent="normal"
                    boxSizing="border-box"
                    overflow="hidden auto"
                    {...childrenStyle}
                >
                    <F14 textAlign="justify" lineHeight="24px" whiteSpace="unset" overflow="auto">
                        {children}
                    </F14>
                </Flc>
            </Flc>
        </Flc>
    );
};
