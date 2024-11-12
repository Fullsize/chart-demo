import React from 'react';
import { F16 } from './Text';
export const IndCssLgText4 = ({ children, ...style }: any) => {
    return (
        <div
            style={{
                color: 'transparent',
                fontWeight: 'bold',
                background:
                    'linear-gradient(rgb(255, 255, 255) 0%, rgb(255, 255, 255) 50%, rgb(174, 212, 254) 100%) text',
                ...style,
            }}
        >
            {children}
        </div>
    );
};

export const IndCssLgText5 = ({ children, ...style }: any) => {
    return (
        <div
            style={{
                color: '#fff',
                ...style,
            }}
        >
            {children}
        </div>
    );
};

export const IndCssLgText6 = ({ children, style, ...css }: any) => {
    return (
        <div
            style={{
                color: 'transparent',
                background: 'linear-gradient(180deg, #FFFFFF 0%, #FFD769 100%) text',
                ...css,
                ...style,
            }}
        >
            {children}
        </div>
    );
};

export const IndCssLgText7 = ({ children, ...style }: any) => {
    return (
        <div
            style={{
                color: 'transparent',
                background: 'linear-gradient(180deg, #FFFFFF 0%,#FFFFFF 50%,#5F97FF 100%) text',
                ...style,
            }}
        >
            {children}
        </div>
    );
};

export const IndCssLgText8 = ({ children, color = '#2230D6', ...style }: any) => {
    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                ...style,
            }}
        >
            <div
                style={{
                    width: '100%',
                    position: 'absolute',
                    color: color,
                    textShadow: `1px 1px 0px #000`,
                }}
            >
                {children}
            </div>
            <div
                style={{
                    width: '100%',
                    position: 'absolute',
                    color: 'transparent',
                    background: `linear-gradient(60deg, #FFFFFF 0%,${color} 100%) text`,
                }}
            >
                {children}
            </div>
        </div>
    );
};

export const IndCssLgText9 = ({ children, ...style }: any) => {
    return (
        <div
            style={{
                fontWeight: 500,
                textShadow: '0px 0px 5px #5F97FF',
                ...style,
            }}
        >
            {children}
        </div>
    );
};

export const IndCssLgText10 = ({ children, ...style }: any) => {
    return (
        <div
            style={{
                color: '#BFD5FF',
                ...style,
            }}
        >
            {children}
        </div>
    );
};

export const IndCssLgText11 = ({ children, ...style }: any) => {
    return (
        <div
            style={{
                color: 'transparent',
                background: 'linear-gradient(180deg, #FFFFFF 0%,#FFFFFF 50%,#7FE5FF 100%) text',
                ...style,
            }}
        >
            {children}
        </div>
    );
};

export const IndCssLgText12 = ({ children, ...style }: any) => {
    return (
        <div
            style={{
                color: 'transparent',
                background: 'linear-gradient(180deg, #FFFFFF 0%,#FFFFFF 5%,#00FFFF 100%) text',
                ...style,
            }}
        >
            {children}
        </div>
    );
};

export const IndCssLgText13 = ({ children, ...style }: any) => {
    return (
        <div
            style={{
                color: 'transparent',
                background: 'linear-gradient(180deg, #FFFFFF 0%,#FFFFFF 5%,#7DFFAF 100%) text',
                ...style,
            }}
        >
            {children}
        </div>
    );
};

export const IndCssLgText14 = ({ children, ...style }: any) => {
    return (
        <div
            style={{
                color: 'transparent',
                textAlign: 'center',
                fontWeight: 'bold',
                background: 'linear-gradient(180deg, #FFFFFF 0%,#FFFFFF 50%,rgba(174, 212, 254, 1) 100%) text',
                ...style,
            }}
        >
            {children}
        </div>
    );
};
