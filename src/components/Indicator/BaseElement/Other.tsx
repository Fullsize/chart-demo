/*
 * @Author: sungy
 * @Date: 2023-08-19 17:56:25
 * @LastEditors: Fullsize
 * @LastEditTime: 2024-09-27 16:37:32
 * @Description: 指标元素
 */
import React from 'react';
import { transparentize, lighten } from 'color2k';
import { Flr } from './Layout';
import Empty from '@/components/Empty';
import { F14, IndCssLgText8, F16 } from '@/components/Indicator';
import indP2Bg01Url from '@images/ind-p2-bg-01.png';
import indP2Bg02Url from '@images/ind-p2-bg-02.png';
import indP2Bg03Url from '@images/ind-p2-bg-03.png';
import indP1BgUrl from '@images/ind-p1-bg.png';
import indLineBgUrl from '@images/ind-line-bg.png';

import iconN_bg0 from '@svg/iconNumber_bg0.svg';
import iconN_bg1 from '@svg/iconNumber_bg1.svg';
import iconN_bg2 from '@svg/iconNumber_bg2.svg';
import iconN_bg3 from '@svg/iconNumber_bg3.svg';

export const ElementOrEmpty = ({ data, Element, ...props }: any) => {
    if (Array.isArray(data)) {
        if (data.length <= 0) {
            return <Empty />;
        } else {
            return data?.map((item: any, i: any) => {
                return <Element key={i} data={item} {...props} />;
            });
        }
    } else if (data) {
        return <Element data={data} {...props} />;
    } else {
        return <Empty />;
    }
};

export const IndImgBg1 = ({ children, ...props }: any) => {
    return (
        <div style={{ position: 'relative', height: 40, ...props }}>
            <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    display: 'flex',
                    height: 30,
                    width: '100%',
                    overflow: 'hidden',
                    alignItems: 'center',
                }}
            >
                <div
                    style={{
                        backgroundImage: `url(${indP1BgUrl})`,
                        backgroundSize: '100% 100%',
                        maxWidth: 128,
                        width: 128,
                        height: 10,
                    }}
                ></div>
                <div style={{ flex: 1 }}></div>
                <div
                    style={{
                        backgroundImage: `url(${indP1BgUrl})`,
                        backgroundSize: '100% 100%',
                        maxWidth: 128,
                        width: 128,
                        height: 10,
                        transform: 'scaleX(-1)',
                    }}
                ></div>
            </div>
            <div
                style={{
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    width: '100%',
                }}
            >
                {children}
            </div>
        </div>
    );
};
export const IndImgBg2 = ({ children, ...props }: any) => {
    return (
        <div
            style={{
                position: 'relative',
                height: 40,
                minHeight: 40,
                ...props,
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    display: 'flex',
                    height: 30,
                    width: '100%',
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        backgroundImage: `url(${indP2Bg01Url})`,
                        backgroundSize: '100% 100%',
                        maxWidth: 325,
                        width: 325,
                    }}
                ></div>
                <div style={{ backgroundImage: `url(${indP2Bg02Url})`, flex: 1 }}></div>
                <div
                    style={{
                        backgroundImage: `url(${indP2Bg03Url})`,
                        backgroundSize: '100% 100%',
                        maxWidth: 120,
                        width: 120,
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

export const IndLineBg = ({ ...style }: any) => {
    return (
        <div
            style={{
                backgroundImage: `url(${indLineBgUrl})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                borderImage:
                    'radial-gradient(circle, rgba(56, 126, 184, 1), rgba(56, 126, 184, 1), rgba(56, 126, 185, 0)) 1 1',
                borderTop: '1px solid',
                height: 8,
                width: '100%',
                ...style,
            }}
        ></div>
    );
};

export const IndLineCss = ({ ...style }: any) => {
    return (
        <div
            style={{
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                borderImage:
                    'linear-gradient(90deg, rgba(133, 168, 218, 0), rgba(133, 168, 218, 1), rgba(151, 151, 151, 0)) 1 1',
                borderTop: '1px solid',
                height: 8,
                width: '100%',
                ...style,
            }}
        ></div>
    );
};

export const IndBtn1Bg = ({ children, ...props }: any) => {
    return (
        <div
            style={{
                background: 'rgba(17, 123, 226, 0.25)',
                boxShadow: 'rgb(17 123 226 / 50%) 0px 0px 4px 1px inset',
                borderRadius: 13,
                border: '1px solid rgb(17 123 226 / 50%)',
                textAlign: 'center',
                ...props,
            }}
        >
            {children}
        </div>
    );
};
export const IndBtn2Bg = ({ children, ...props }: any) => {
    return (
        <div
            style={{
                background: 'rgba(103,19,29, 0.55)',
                boxShadow: 'rgb(103 19 29 / 100%) 0px 0px 4px 1px inset',
                borderRadius: 13,
                border: '1px solid rgb(103 19 29 / 100%)',
                textAlign: 'center',
                ...props,
            }}
        >
            {children}
        </div>
    );
};
export const IndBtn3Bg = ({ children, ...props }: any) => {
    return (
        <div
            style={{
                background: 'rgba(17,123,226,0.5)',
                boxShadow: 'inset 0px 0px 4px 1px #117BE2',
                borderRadius: 13,
                border: '1px solid #117BE2',
                textAlign: 'center',
                ...props,
            }}
        >
            {children}
        </div>
    );
};

export const IndBtn4Bg = ({ children, ...props }: any) => {
    return (
        <div
            style={{
                background: 'rgba(17,226,215,0.25)',
                boxShadow: 'rgb(17 226 216 / 50%) inset 0px 0px 4px 1px',
                borderRadius: 13,
                border: '1px solid rgb(17 226 216 / 50%)',
                textAlign: 'center',
                ...props,
            }}
        >
            {children}
        </div>
    );
};

export const IndPmNum = ({ children, color = '#7DF4FF', ...props }: any) => {
    return (
        <div
            style={{
                position: 'relative',
                padding: '0 10px',
                color: color,
                ...props,
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: 1,
                    background: `linear-gradient(291deg, rgba(170, 254, 255, 0) 0%, ${color} 54%, rgba(125, 252, 255, 0) 100%)`,
                    filter: 'blur(0px)',
                }}
            ></div>

            <div
                style={{
                    position: 'absolute',
                    bottom: 3,
                    left: 0,
                    width: '100%',
                    height: 2,
                    background: `linear-gradient(291deg, rgba(41, 229, 243, 0) 0%, ${color} 47%, rgba(195, 247, 248, 0) 100%)`,
                    filter: 'blur(3px)',
                }}
            ></div>
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {' '}
                {children}{' '}
            </div>
        </div>
    );
};

export const BaseBg01 = ({ ...styles }: any) => {
    return (
        <div
            style={{
                width: 1,
                height: 24,
                background: 'linear-gradient(291deg, rgba(170,254,255,0) 0%, #7DF4FF 54%, rgba(125,252,255,0) 100%)',
                filter: 'blur(0px)',
                ...styles,
            }}
        ></div>
    );
};

export const BaseBg02 = () => {
    return (
        <div
            style={{
                width: '100%',
                height: 1,
                borderBottom: '1px solid',
                borderImage:
                    'linear-gradient(270deg, rgba(107, 175, 242, 0), rgba(107, 175, 242, 1), rgba(107, 175, 242, 0)) 1 1',
            }}
        ></div>
    );
};

export const IndBg = ({ imgUrl, height, children, ...style }: any) => {
    return (
        <div
            style={{
                backgroundImage: `url(${imgUrl})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: `100% ${height}${!isNaN(height) ? 'px' : ''}`,
                display: 'flex',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                height: height,
                ...style,
            }}
        >
            {children}
        </div>
    );
};

export const IndButtonBg = ({ children, ...style }: any) => {
    return (
        <Flr
            style={{
                width: '100%',
                height: 32,
                background: 'rgba(17,49,85,0.25)',
                boxShadow: '0px 2px 0px 0px rgba(81,171,255,0.15), inset 0px 0px 2px 1px rgba(216,230,250,0.5)',
                borderRadius: 20,
                border: '1px solid rgba(215,230,249,0.5)',
                ...style,
            }}
        >
            {' '}
            {children}{' '}
        </Flr>
    );
};

export const IndProgress = ({ percent, color = '#00D5FF', ...style }: any) => {
    const num = Number(percent ?? 0);
    const width = num > 100 ? 100 : num;
    return (
        <div
            style={{
                height: 14,
                boxSizing: 'border-box',
                boxShadow: `0px 0px 6px 0px ${color}`,
                borderRadius: 7,
                padding: 3,
                border: `1px solid ${color}`,
                width: '100%',
                ...style,
            }}
        >
            <div
                style={{
                    width: `${width}%`,
                    height: '100%',
                    background: `linear-gradient( 270deg, ${color} 0%, rgba(95,184,255,0.1) 100%)`,
                    borderRadius: '4px',
                    position: 'relative',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        width: 6,
                        height: 6,
                        borderRadius: 3,
                        background: '#fff',
                        boxShadow: '-1px 0px 3px 0px #12D6FD',
                        right: 1,
                        top: 0,
                    }}
                ></div>
            </div>
        </div>
    );
};

export const IndProgress1 = ({ percent, color = '#0099FC', ...style }: any) => {
    const num = Number(percent ?? 0);
    const width = num > 100 ? 100 : num;
    const colorFade8 = transparentize(color, 0.8);

    return (
        <div
            style={{
                height: 14,
                boxSizing: 'border-box',
                padding: 3,
                border: `1px solid ${colorFade8}`,
                width: '100%',
                position: 'relative',
                ...style,
            }}
        >
            <div
                style={{
                    width: `100%`,
                    height: 6,
                    background: `${colorFade8}`,
                    borderRadius: '4px',
                }}
            >
                <div
                    style={{
                        width: `${width}%`,
                        height: '100%',
                        background: `linear-gradient( 270deg, ${color} 0%, rgba(95,184,255,0.1) 100%)`,
                        borderRadius: '4px',
                    }}
                ></div>
            </div>
        </div>
    );
};
export const IndProgress2 = ({ percent, color = '#F6D991', ...style }: any) => {
    const num = Number(percent ?? 0);
    const width = num > 100 ? 100 : num;
    const colorFade8 = lighten(color, 0.2);

    return (
        <div
            style={{
                height: 10,
                boxSizing: 'border-box',
                width: '100%',
                position: 'relative',
                boxShadow: 'inset 0px 2px 3px 0px rgba(0,0,0,0.5)',
                borderRadius: '8px',
                border: '1px solid #39485A',
                ...style,
            }}
        >
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    background: 'rgba(44,59,84,0.52)',
                    borderRadius: '4px',
                }}
            >
                <div
                    style={{
                        width: `${width}%`,
                        height: '100%',
                        background: `linear-gradient( 60deg, ${colorFade8} 0%, ${color} 70%, ${color} 100%)`,
                        borderRadius: '4px',
                    }}
                ></div>
            </div>
        </div>
    );
};

export const IndIconNumber = ({ number, ...style }: any) => {
    const num = Number(number ?? 0);
    const LIST = [
        { textColor: '#FFF', bgImg: iconN_bg0 },
        { textColor: '#FFF', bgImg: iconN_bg1 },
        { textColor: '#FFF', bgImg: iconN_bg2 },
        { textColor: '#FFF', bgImg: iconN_bg3 },
    ];
    const curObj = LIST[num] ?? LIST[0];
    return (
        <div
            style={{
                width: 28,
                height: 28,
                backgroundImage: `url(${curObj.bgImg})`,
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                ...style,
            }}
        >
            <F14 color={curObj.textColor} textShadow="0px 2px 0px rgb(0 0 0 / 50%)">
                {number}
            </F14>
        </div>
    );
};

import number_one from './number_one.png';
import number_two from './number_two.png';
import number_three from './number_three.png';

export const IndIconNumber2 = (props: any) => {
    const { number } = props;

    const getReactDom = () => {
        return <F16 fontFamily="D-DIN">{number}</F16>;
        if (number == 1) {
            return <img src={number_one}></img>;
        } else if (number == 2) {
            return <img src={number_two}></img>;
        } else if (number == 3) {
            return <img src={number_three}></img>;
        } else {
            return <F16 fontFamily="D-DIN">{number}</F16>;
        }
    };

    return <>{getReactDom()}</>;
};
