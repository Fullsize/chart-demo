/*
 * @Author: sungy
 * @Date: 2023-12-05 10:05:05
 * @LastEditors: zhipengHuang
 * @LastEditTime: 2024-08-26 16:29:43
 * @Description: 显示空指标组件
 */
import React from 'react';
import bg1Url from './bg1.png';
import bg1AcUrl from './bg1-ac.png';

import bg2Url from './bg2.png';
import bg2AcUrl from './bg2-ac.png';

import bg3Url from './bg3.png';
import bg3AcUrl from './bg3-ac.png';

import bg4Url from './progressCardBg.png';
import bg4AcUrl from './progressCardBg-ac.png';

import { Flc } from '@/components/Indicator';

const IndCardBg = ({ children, ...style }: { children?: React.ReactElement; [k: string]: any }) => {
    return (
        <Flc
            position="relative"
            justifyContent="flex-start"
            backgroundSize="100% 100%"
            backgroundRepeat="no-repeat"
            boxSizing="border-box"
            color="#FFF"
            height="fit-content"
            minHeight={236}
            width={200}
            padding="25px 15px 15px 15px"
            {...style}
        >
            {children}
        </Flc>
    );
};

export const FlaIndCardBg1 = ({ children, ...style }: { children?: React.ReactElement; [k: string]: any }) => {
    return (
        <IndCardBg backgroundImage={`url(${bg1Url})`} {...style}>
            {children}
        </IndCardBg>
    );
};

export const FlaIndCardBg1Ac = ({ children, ...style }: { children?: React.ReactElement; [k: string]: any }) => {
    return (
        <IndCardBg backgroundImage={`url(${bg1AcUrl})`} {...style}>
            {children}
        </IndCardBg>
    );
};

export const FlaIndCardBg2 = ({ children, ...style }: { children?: React.ReactElement; [k: string]: any }) => {
    return (
        <IndCardBg
            backgroundImage={`url(${bg2Url})`}
            width={260}
            minHeight={120}
            padding={`28px 15px 20px 15px`}
            {...style}
        >
            {children}
        </IndCardBg>
    );
};

export const FlaIndCardBg2Ac = ({ children, ...style }: { children?: React.ReactElement; [k: string]: any }) => {
    return (
        <IndCardBg backgroundImage={`url(${bg2AcUrl})`} width={260} minHeight={120} maxHeight={120} {...style}>
            {children}
        </IndCardBg>
    );
};

export const FlaIndCardBg3 = ({ children, ...style }: { children?: React.ReactElement; [k: string]: any }) => {
    return (
        <IndCardBg backgroundImage={`url(${bg3Url})`} width={330} minHeight={130} {...style}>
            {children}
        </IndCardBg>
    );
};

export const FlaIndCardBg3Ac = ({ children, ...style }: { children?: React.ReactElement; [k: string]: any }) => {
    return (
        <IndCardBg backgroundImage={`url(${bg3AcUrl})`} width={330} minHeight={130} {...style}>
            {children}
        </IndCardBg>
    );
};

const IndPrcessCardBg = ({ children, ...style }: { children?: React.ReactElement; [k: string]: any }) => {
    return (
        <Flc
            position="relative"
            justifyContent="flex-start"
            backgroundSize="100% 100%"
            backgroundRepeat="no-repeat"
            boxSizing="border-box"
            color="#FFF"
            padding="0 10px"
            width={130}
            height={190}
            {...style}
        >
            {children}
        </Flc>
    );
};

export const FlaIndCardBg4 = ({ children, ...style }: { children?: React.ReactElement; [k: string]: any }) => {
    return (
        <IndPrcessCardBg backgroundImage={`url(${bg4Url})`} width={130} minHeight={190} {...style}>
            {children}
        </IndPrcessCardBg>
    );
};

export const FlaIndCardBg4Ac = ({ children, ...style }: { children?: React.ReactElement; [k: string]: any }) => {
    return (
        <IndPrcessCardBg backgroundImage={`url(${bg4AcUrl})`} width={130} minHeight={190} {...style}>
            {children}
        </IndPrcessCardBg>
    );
};
