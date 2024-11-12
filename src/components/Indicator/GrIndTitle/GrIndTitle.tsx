/*
 * @Author: sungy
 * @Date: 2023-09-15 17:17:51
 * @LastEditors: sungy
 * @LastEditTime: 2024-04-28 15:48:35
 * @Description: 标题指标类
 */
import React from 'react';
import {
    Flr,
    Flc,
    IndImgBg1,
    IndImgBg2,
    F16,
    F18,
    F20,
    F20B,
    F28B,
    IndSvgLgText,
    IndSvgLgText4,
    IIndTitleProps,
    IFlaIndTitleProps,
} from '@/components/Indicator';

import indImgBg01Url from '@images/ind_img_bg_01.png';
import indImgBg02Url from '@images/ind_img_bg_02.png';
import indImgBg03Url from '@images/ind_img_bg_03.png';

export const IndTitle1 = ({ title, children, ...props }: IIndTitleProps) => {
    return (
        <IndImgBg1 {...props}>
            <F28B marginLeft={25}>
                <IndSvgLgText>{title}</IndSvgLgText>
            </F28B>
            <Flr marginRight={10}>{children}</Flr>
        </IndImgBg1>
    );
};
export const FlaIndTitle1 = ({ title, children, childrenStyle, ...props }: IFlaIndTitleProps) => {
    return (
        <Flc gap={10} justifyContent="normal" overflow="hidden" {...props}>
            <IndTitle1 title={title}></IndTitle1>
            <Flc height="100%" width="100%" overflow="hidden auto">
                <Flc flex={1} marginRight={10} justifyContent="normal" {...childrenStyle}>
                    {children}
                </Flc>
            </Flc>
        </Flc>
    );
};

export const IndTitle2 = ({ title, children, ...props }: IIndTitleProps) => {
    return (
        <IndImgBg2 {...props}>
            <F20 marginLeft={25}>
                <IndSvgLgText>{title}</IndSvgLgText>
            </F20>
            <Flr marginRight={10}>{children}</Flr>
        </IndImgBg2>
    );
};
export const FlaIndTitle2 = ({ title, titleChildren, children, childrenStyle, ...props }: IFlaIndTitleProps) => {
    return (
        <Flc gap={10} justifyContent="normal" overflow="hidden" {...props}>
            <IndTitle2 title={title}>{titleChildren}</IndTitle2>
            <Flc width="100%" height="100%" overflow="hidden auto">
                <Flc flex={1} marginRight={10} justifyContent="normal" {...childrenStyle}>
                    {children}
                </Flc>
            </Flc>
        </Flc>
    );
};

export const IndImgBg3 = ({ children, ...props }: any) => {
    return (
        <div
            style={{
                position: 'relative',
                height: 36,
                minHeight: 36,
                ...props,
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    display: 'flex',
                    height: 36,
                    width: '100%',
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        backgroundImage: `url(${indImgBg01Url})`,
                        backgroundSize: '100% 100%',
                        maxWidth: 36,
                        width: 36,
                    }}
                ></div>
                <div
                    style={{
                        backgroundImage: `url(${indImgBg02Url})`,
                        backgroundSize: '100% 100%',
                        maxWidth: 50,
                        width: 50,
                        position: 'absolute',
                        height: '100%',
                        left: 0,
                    }}
                ></div>
                <div
                    style={{
                        backgroundImage: `url(${indImgBg03Url})`,
                        backgroundSize: 'cover',
                        flex: 1,
                        marginLeft: 14,
                    }}
                ></div>
            </div>
            <div
                style={{
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: '100%',
                    width: '100%',
                }}
            >
                {children}
            </div>
        </div>
    );
};
export const IndTitle3 = ({ title, children, ...props }: any) => {
    return (
        <IndImgBg3 {...props}>
            <F20B marginLeft={45} overflow="visible">
                <IndSvgLgText4>{title}</IndSvgLgText4>
            </F20B>
            <Flr marginRight={10} overflow="hidden" flex={1} flexDirection="row-reverse">
                {children}
            </Flr>
        </IndImgBg3>
    );
};
export const FlaIndTitle3 = ({ title, titleChildren, children, childrenStyle, ...props }: IFlaIndTitleProps) => {
    return (
        <Flc gap={10} justifyContent="normal" overflow="hidden" width="100%" {...props}>
            <IndTitle3 title={title}>{titleChildren}</IndTitle3>
            <Flc width="100%" flex={1} overflow="hidden auto">
                <Flc flex={1} margin="0px 10px 10px 10px" justifyContent="normal" {...childrenStyle}>
                    {children}
                </Flc>
            </Flc>
        </Flc>
    );
};

export const IndTitle4 = ({ title, children, ...props }: IIndTitleProps) => {
    return (
        <Flr
            {...props}
            borderRadius="20px 0 0 20px"
            padding="4px 0"
            background="linear-gradient(90deg, rgba(21, 77, 160, 0.12) 0%, rgba(21, 77, 160, 0) 100%), linear-gradient(270deg, rgba(21, 77, 160, 0) 0%, rgba(21, 119, 179, 0.12) 18%, rgba(21, 132, 185, 0.5) 100%)"
        >
            <F16 marginLeft={20}>{title}</F16>
            {children}
        </Flr>
    );
};

export const IndTitle5 = ({ title, children, ...props }: IIndTitleProps) => {
    return (
        <Flr {...props}>
            <Flr justifyContent="normal">
                <div
                    style={{
                        width: 8,
                        height: 8,
                        margin: '0px 6px',
                        borderRadius: '50%',
                        background: 'rgba(0,145,255,0.8)',
                    }}
                ></div>
                <F18 lineHeight="26px">{title}</F18>
            </Flr>
            {children}
        </Flr>
    );
};

export const FlaIndTitle5: React.FC<IFlaIndTitleProps> = ({
    title,
    titleChildren,
    children,
    childrenStyle,
    ...props
}: any) => {
    return (
        <Flc gap={10} justifyContent="normal" overflow="hidden" width="100%" {...props}>
            <IndTitle5 title={title}>{titleChildren}</IndTitle5>
            <Flc width="100%" height="100%" overflow="hidden auto">
                <Flc flex={1} justifyContent="normal" margin="0px 10px 10px 10px" {...childrenStyle}>
                    {children}
                </Flc>
            </Flc>
        </Flc>
    );
};
