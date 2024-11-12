/*
 * @Author: sungy
 * @Date: 2023-09-15 17:17:51
 * @LastEditors: sungy
 * @LastEditTime: 2024-07-02 15:25:06
 * @Description: 标题指标类
 */
import React from 'react';
import {
    Flr,
    Flc,
    IndCssLgText5,
    F18,
    IIndTitleProps,
    IFlaIndTitleProps,
    cssBgStyle6,
    F16,
} from '@/components/Indicator';

import bg_url from './bg.png';
import icon_url from './icon.png';
import LinkToJjtsgz from '@/components/nav/LinkJjtsgz';

export const IndImgBg7 = ({ children, ...props }: any) => {
    return (
        <div
            style={{
                height: 32,
                width: '100%',
                display: 'flex',
                position: 'relative',
                minWidth: '100%', //TODO之前是500
                ...props,
            }}
        >
            <div
                style={{
                    height: 32,
                    width: '100%',
                    backgroundImage: `url(${bg_url})`,
                    backgroundSize: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <div
                    style={{
                        height: 32,
                        width: 32,
                        backgroundImage: `url(${icon_url})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center center',
                    }}
                ></div>
                <div
                    style={{
                        height: 32,
                    }}
                >
                    {children}
                </div>
                <div
                    style={{
                        height: 32,
                        width: 32,
                        backgroundImage: `url(${icon_url})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center center',
                        transform: 'rotate(180deg)',
                    }}
                ></div>
            </div>
        </div>
    );
};
export const IndTitle7 = ({ title, children, tools, ...props }: IIndTitleProps) => {
    return (
        <Flr position="relative">
            <IndImgBg7 {...props}>
                <IndCssLgText5 marginTop={5}>
                    <LinkToJjtsgz title={title}>
                        <F18 fontWidth={500} marginLeft={8} overflow="visible">
                            {title}
                        </F18>
                    </LinkToJjtsgz>
                </IndCssLgText5>
            </IndImgBg7>
            <Flr position="absolute" right={20}>
                {children}
            </Flr>
            {tools && (
                <Flr position="absolute" left={20}>
                    {tools}
                </Flr>
            )}
        </Flr>
    );
};

/**
 * 标题7 文字提取
 * @param param0
 * @returns
 */
export const IndTitle7NoBg = ({ title, children, ...props }: IIndTitleProps) => {
    return (
        <Flr position="relative" {...props}>
            <IndCssLgText5 marginTop={5}>
                <F16 fontWidth={400} marginLeft={8} overflow="visible" color="#5f97ff">
                    {title}
                </F16>
            </IndCssLgText5>

            <Flr position="absolute" right={20}>
                {children}
            </Flr>
        </Flr>
    );
};

export const FlaIndTitle7: React.FC<IFlaIndTitleProps> = ({
    title,
    titleChildren,
    children,
    childrenStyle,
    noBg = false, //去掉背景
    tools,
    ...props
}) => {
    return (
        <Flc gap={20} justifyContent="normal" overflow="hidden" width="100%" {...(noBg ? {} : cssBgStyle6)} {...props}>
            {!!title && (
                <IndTitle7 title={title} tools={tools}>
                    {titleChildren}
                </IndTitle7>
            )}

            <Flc width="100%" flex={1} overflow="hidden">
                <Flc
                    flex={1}
                    margin={noBg ? '' : '0px 20px 20px 20px'}
                    justifyContent="normal"
                    overflow="hidden"
                    {...childrenStyle}
                >
                    {children}
                </Flc>
            </Flc>
        </Flc>
    );
};
