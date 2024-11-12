/*
 * @Author: sungy
 * @Date: 2023-09-15 17:17:51
 * @LastEditors: Fullsize
 * @LastEditTime: 2024-06-04 10:55:25
 * @Description: 标题指标类
 */
import React from 'react';
import { Flr, Flc, F20B, IIndTitleProps, IFlaIndTitleProps, cssBgStyle6 } from '@/components/Indicator';
import { IndCssLgText7 } from '@/components/Indicator';

import indImg6Bg01 from './indImg6Bg01.png';
import indImg6Bg03 from './indImg6Bg03.png';
import LinkToJjtsgz from '@/components/nav/LinkJjtsgz';

export const IndImgBg6 = ({ children, ...props }: any) => {
    return (
        <div
            style={{
                height: 40,
                width: '100%',
                display: 'flex',
                position: 'relative',
                ...props,
            }}
        >
            <div
                style={{
                    height: 40,
                    width: 400,
                    backgroundImage: `url(${indImg6Bg01})`,
                }}
            ></div>
            <div
                style={{
                    flex: 1,
                    height: '100%',
                    backgroundImage: `url(${indImg6Bg03})`,
                    backgroundSize: '100% 40px',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                {' '}
            </div>
            <div
                style={{
                    position: 'absolute',
                    height: '100%',
                    width: '100%',
                    boxSizing: 'border-box',
                    padding: '0 0 4px 40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                {children}
            </div>
        </div>
    );
};
export const IndTitle6 = ({ title, children, ...props }: IIndTitleProps) => {
    return (
        <IndImgBg6 {...props}>
            <F20B marginLeft={10} marginTop={4} overflow="visible">
                <LinkToJjtsgz title={title}>
                    <IndCssLgText7>{title}</IndCssLgText7>
                </LinkToJjtsgz>
            </F20B>
            <Flr marginRight={10} overflow="hidden" flex={1} flexDirection="row-reverse">
                {children}
            </Flr>
        </IndImgBg6>
    );
};
export const FlaIndTitle6 = ({ title, titleChildren, children, childrenStyle, ...props }: IFlaIndTitleProps) => {
    return (
        <Flc gap={20} justifyContent="normal" overflow="hidden" width="100%" {...props}>
            <IndTitle6 title={title}>{titleChildren}</IndTitle6>
            <Flc width="100%" flex={1} overflow="hidden">
                <Flc flex={1} justifyContent="normal" boxSizing="border-box" {...childrenStyle}>
                    {children}
                </Flc>
            </Flc>
        </Flc>
    );
};

export const FlaIndTitle6Bg = ({ childrenStyle, ...props }: IFlaIndTitleProps) => {
    return (
        <FlaIndTitle6
            {...cssBgStyle6}
            {...props}
            childrenStyle={{ margin: '0px 20px 20px', ...childrenStyle }}
        ></FlaIndTitle6>
    );
};
