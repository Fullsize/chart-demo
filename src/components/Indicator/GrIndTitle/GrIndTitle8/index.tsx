/*
 * @Author: sungy
 * @Date: 2023-09-15 17:17:51
 * @LastEditors: sungy
 * @LastEditTime: 2024-08-27 13:52:41
 * @Description: 标题指标类
 */
import React from 'react';
import { Flr, Flc, F18, F16, IFlaIndTitleProps, IIndTitleProps, F20, F20T, F18T } from '@/components/Indicator';
import icon_url from './icon.png';
import bg_url from './bg.png';
import bg_ac_url from './bg-ac.png';

export const IndGrIndTitle8Bg = ({ children, ...props }: any) => {
    return (
        <div
            style={{
                minHeight: 20,
                width: '100%',
                backgroundImage: `url(${icon_url})`,
                backgroundSize: '18px 18px',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '15px 2px',
                boxSizing: 'border-box',
                paddingLeft: 40,
                paddingTop: 0,
                ...props,
            }}
        >
            <Flr alignItems="flex-start">{children}</Flr>
        </div>
    );
};

export const IndTitle8 = ({ title, titleStyle, children, ...props }: IIndTitleProps) => {
    return (
        <IndGrIndTitle8Bg {...props}>
            <F18T overflow="visible" whiteSpace="break-spaces" {...titleStyle}>
                {title}
            </F18T>
            {children}
        </IndGrIndTitle8Bg>
    );
};

export const FlaIndTitle8 = ({ title, titleChildren, children, childrenStyle, ...props }: IFlaIndTitleProps) => {
    return (
        <Flc
            gap={20}
            overflow="hidden"
            height={183}
            width={440}
            backgroundImage={`url(${bg_url})`}
            backgroundSize="100% 100%"
            backgroundRepeat="no-repeat"
            boxSizing="border-box"
            color="#FFF"
            {...props}
        >
            <Flr justifyContent="flex-start">
                <IndTitle8 title={title} width={190}></IndTitle8>
                <div
                    style={{
                        width: 1,
                        height: 12,
                        background: '#5F97FF',
                        opacity: 0.5,
                        marginRight: 15,
                    }}
                ></div>
                <F16>{titleChildren}</F16>
            </Flr>
            <Flc
                width="100%"
                flex={1}
                justifyContent="flex-start"
                padding="0 20px"
                boxSizing="border-box"
                overflow="hidden"
                {...childrenStyle}
            >
                {children}
            </Flc>
        </Flc>
    );
};

export const FlaIndTitle8Ac = ({ ...props }: any) => {
    return <FlaIndTitle8 backgroundImage={`url(${bg_ac_url})`} {...props}></FlaIndTitle8>;
};
