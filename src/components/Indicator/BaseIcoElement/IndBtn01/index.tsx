import React from 'react';
import { F22B, F24B, Flr, IndBg } from '@/components/Indicator';
import btn1Url from './btn1.png';
import btn2Url from './btn2.png';
import btn3Url from './btn3.png';

import btnAc1Url from './btn-ac-1.png';
import btnAc2Url from './btn-ac-2.png';
import btnAc3Url from './btn-ac-3.png';

function IndBtn01({ children, backgroundStyle, ...style }: any) {
    return (
        <Flr minWidth={222} height={44} position="relative" {...style}>
            <Flr width="100%" height="100%" justifyContent="center">
                <F24B padding="0 60px" color="#5F97FF">
                    {children}
                </F24B>
            </Flr>
            <Flr
                width="100%"
                height={44}
                position="absolute"
                top={0}
                zIndex={-1}
                justifyContent="center"
                {...backgroundStyle}
            >
                <IndBg imgUrl={btnAc1Url} height="100%" minWidth={111} width={111}></IndBg>
                <IndBg imgUrl={btnAc2Url} height="100%" flex={1}></IndBg>
                <IndBg imgUrl={btnAc3Url} height="100%" minWidth={111} width={111}></IndBg>
            </Flr>
        </Flr>
    );
}
function IndBtn01Ac({ children, backgroundStyle, ...style }: any) {
    return (
        <Flr minWidth={222} height={44} position="relative" {...style}>
            <Flr width="100%" height="100%" justifyContent="center">
                <F24B padding="0 60px" color="#FFFFFF" textShadow="0px 3px 4px rgba(15,19,58,0.5)">
                    {children}
                </F24B>
            </Flr>
            <Flr
                width="100%"
                height={44}
                position="absolute"
                top={0}
                zIndex={-1}
                justifyContent="center"
                {...backgroundStyle}
            >
                <IndBg imgUrl={btn1Url} height="100%" minWidth={111} width={111}></IndBg>
                <IndBg imgUrl={btn2Url} height="100%" flex={1} margin="0 -1px"></IndBg>
                <IndBg imgUrl={btn3Url} height="100%" minWidth={111} width={111}></IndBg>
            </Flr>
        </Flr>
    );
}

export const IndBtn01Left = ({ children, ...style }: any) => {
    return (
        <IndBtn01 {...style} backgroundStyle={{ transform: 'rotateX(180deg)' }}>
            {children}
        </IndBtn01>
    );
};

export const IndBtn01LeftAc = ({ children, ...style }: any) => {
    return <IndBtn01Ac {...style}>{children}</IndBtn01Ac>;
};

export const IndBtn01Right = ({ children, ...style }: any) => {
    return <IndBtn01 {...style}>{children}</IndBtn01>;
};

export const IndBtn01RightAc = ({ children, ...style }: any) => {
    return (
        <IndBtn01Ac {...style} backgroundStyle={{ transform: 'rotateX(180deg)' }}>
            {children}
        </IndBtn01Ac>
    );
};
