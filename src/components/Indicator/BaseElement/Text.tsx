/*
 * @Author: sungy
 * @Date: 2023-08-19 17:56:25
 * @LastEditors: sungy
 * @LastEditTime: 2024-09-19 16:22:27
 * @Description: 指标元素
 */
import React, { useEffect, useRef, useState } from 'react';
const textEllipsis = {
    maxWidth: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
};

const SpanTitle = ({ children, style }: { children: React.ReactNode; style: React.CSSProperties }) => {
    const ref = useRef<HTMLElement>(null);
    const [t, setT] = useState<any>();

    useEffect(() => {
        const text = ref?.current?.textContent;
        if (text) {
            setT(text);
        }
    }, [children]);

    return (
        <span ref={ref} title={t} style={{ ...style }}>
            {children}
        </span>
    );
};

export type textType = {
    children?: React.ReactNode;
    title?: React.ReactElement;
    [key: string]: React.ReactNode | string | number;
};

export const F12B500 = ({ children, ...props }: textType) => {
    return <span style={{ ...textEllipsis, fontSize: 12, fontWeight: 500, ...props }}>{children}</span>;
};

export const F12 = ({ children, ...props }: textType) => {
    return <span style={{ ...textEllipsis, fontSize: 12, ...props }}>{children}</span>;
};
export const F14 = ({ children, ...props }: textType) => {
    return <span style={{ ...textEllipsis, fontSize: 14, ...props }}>{children}</span>;
};
export const F14B = ({ children, ...props }: textType) => {
    return (
        <span
            style={{
                ...textEllipsis,
                fontSize: 14,
                fontWeight: 'bold',
                ...props,
            }}
        >
            {children}
        </span>
    );
};
export const F14O5 = ({ children, ...props }: textType) => {
    return <span style={{ ...textEllipsis, opacity: 0.5, ...props }}>{children}</span>;
};
export const F14BT = ({ children, ...props }: textType) => {
    return (
        <SpanTitle
            style={{
                ...textEllipsis,
                fontSize: 14,
                fontWeight: 'bold',
                ...props,
            }}
        >
            {children}
        </SpanTitle>
    );
};

export const F16 = ({ children, ...props }: textType) => {
    return <span style={{ ...textEllipsis, fontSize: 16, ...props }}>{children}</span>;
};
export const F16T = ({ children, ...props }: textType) => {
    return <SpanTitle style={{ ...textEllipsis, fontSize: 16, ...props }}>{children}</SpanTitle>;
};
export const F16L2 = ({ children, ...props }: textType) => {
    return (
        <span
            style={{
                ...textEllipsis,
                fontSize: 16,
                letterSpacing: 2,
                ...props,
            }}
        >
            {children}
        </span>
    );
};
export const F16B = ({ children, ...props }: textType) => {
    return (
        <span
            style={{
                ...textEllipsis,
                fontSize: 16,
                fontWeight: 'bold',
                ...props,
            }}
        >
            {children}
        </span>
    );
};
export const F16BL2 = ({ children, ...props }: textType) => {
    return (
        <span
            style={{
                ...textEllipsis,
                fontSize: 16,
                fontWeight: 'bold',
                letterSpacing: 2,
                ...props,
            }}
        >
            {children}
        </span>
    );
};
export const F16BT = ({ children, ...props }: textType) => {
    return (
        <SpanTitle
            style={{
                ...textEllipsis,
                fontSize: 16,
                fontWeight: 'bold',
                ...props,
            }}
        >
            {children}
        </SpanTitle>
    );
};

export const F18 = ({ children, title, ...props }: textType) => {
    return <SpanTitle style={{ ...textEllipsis, fontSize: 18, ...props }}>{children}</SpanTitle>;
};
export const F18B = ({ children, ...props }: textType) => {
    return (
        <span
            style={{
                ...textEllipsis,
                fontSize: 18,
                fontWeight: 'bold',
                ...props,
            }}
        >
            {children}
        </span>
    );
};
export const F18T = ({ children, ...props }: textType) => {
    return <SpanTitle style={{ ...textEllipsis, fontSize: 18, ...props }}>{children}</SpanTitle>;
};

export const F20 = ({ children, ...props }: textType) => {
    return <span style={{ ...textEllipsis, fontSize: 20, ...props }}>{children}</span>;
};
export const F20T = ({ children, ...props }: textType) => {
    return <SpanTitle style={{ ...textEllipsis, fontSize: 20, ...props }}>{children}</SpanTitle>;
};
export const F20B = ({ children, ...props }: textType) => {
    return (
        <span
            style={{
                ...textEllipsis,
                fontWeight: 'bold',
                fontSize: 20,
                ...props,
            }}
        >
            {children}
        </span>
    );
};

export const F22 = ({ children, ...props }: textType) => {
    return <span style={{ ...textEllipsis, fontSize: 22, ...props }}>{children}</span>;
};
export const F22B = ({ children, ...props }: textType) => {
    return (
        <span
            style={{
                ...textEllipsis,
                fontWeight: 'bold',
                fontSize: 22,
                ...props,
            }}
        >
            {children}
        </span>
    );
};

export const F24 = ({ children, ...props }: textType) => {
    return <span style={{ ...textEllipsis, fontSize: 24, ...props }}>{children}</span>;
};
export const F24B = ({ children, ...props }: textType) => {
    return (
        <span
            style={{
                ...textEllipsis,
                fontWeight: 'bold',
                fontSize: 24,
                ...props,
            }}
        >
            {children}
        </span>
    );
};

export const F26 = ({ children, ...props }: textType) => {
    return <span style={{ ...textEllipsis, fontSize: 26, ...props }}>{children}</span>;
};
export const F26L2 = ({ children, ...props }: textType) => {
    return (
        <span
            style={{
                ...textEllipsis,
                fontSize: 26,
                letterSpacing: 2,
                ...props,
            }}
        >
            {children}
        </span>
    );
};
export const F26B = ({ children, ...props }: textType) => {
    return (
        <span
            style={{
                ...textEllipsis,
                fontSize: 26,
                fontWeight: 'bold',
                ...props,
            }}
        >
            {children}
        </span>
    );
};
export const F26BL2 = ({ children, ...props }: textType) => {
    return (
        <span
            style={{
                ...textEllipsis,
                fontSize: 26,
                fontWeight: 'bold',
                letterSpacing: 2,
                ...props,
            }}
        >
            {children}
        </span>
    );
};

export const F28 = ({ children, ...props }: textType) => {
    return <span style={{ ...textEllipsis, fontSize: 28, ...props }}>{children}</span>;
};
export const F28B = ({ children, ...props }: textType) => {
    return (
        <span
            style={{
                ...textEllipsis,
                fontSize: 28,
                fontWeight: 'bold',
                ...props,
            }}
        >
            {children}
        </span>
    );
};

export const F30 = ({ children, ...props }: textType) => {
    return <span style={{ ...textEllipsis, fontSize: 30, ...props }}>{children}</span>;
};
export const F30B = ({ children, ...props }: textType) => {
    return (
        <span
            style={{
                ...textEllipsis,
                fontSize: 30,
                fontWeight: 'bold',
                ...props,
            }}
        >
            {children}
        </span>
    );
};

export const F32 = ({ children, ...props }: textType) => {
    return <span style={{ ...textEllipsis, fontSize: 32, ...props }}>{children}</span>;
};
export const F32B = ({ children, ...props }: textType) => {
    return (
        <span
            style={{
                ...textEllipsis,
                fontSize: 32,
                fontWeight: 'bold',
                ...props,
            }}
        >
            {children}
        </span>
    );
};

export const F36 = ({ children, ...props }: textType) => {
    return <span style={{ ...textEllipsis, fontSize: 36, ...props }}>{children}</span>;
};
export const F36B = ({ children, ...props }: textType) => {
    return (
        <span
            style={{
                ...textEllipsis,
                fontSize: 36,
                fontWeight: 'bold',
                ...props,
            }}
        >
            {children}
        </span>
    );
};

export const F38B = ({ children, ...props }: textType) => {
    return (
        <span
            style={{
                ...textEllipsis,
                fontSize: 38,
                fontWeight: 'bold',
                ...props,
            }}
        >
            {children}
        </span>
    );
};

export const F40B = ({ children, ...props }: textType) => {
    return (
        <span
            style={{
                ...textEllipsis,
                fontSize: 40,
                fontWeight: 'bold',
                ...props,
            }}
        >
            {children}
        </span>
    );
};
export const F44 = ({ children, ...props }: textType) => {
    return <span style={{ ...textEllipsis, fontSize: 44, ...props }}>{children}</span>;
};

export const F48B = ({ children, ...props }: textType) => {
    return (
        <span
            style={{
                ...textEllipsis,
                fontSize: 48,
                fontWeight: 'bold',
                ...props,
            }}
        >
            {children}
        </span>
    );
};

export const F54 = ({ children, ...props }: textType) => {
    return <span style={{ ...textEllipsis, fontSize: 54, ...props }}>{children}</span>;
};

export const F60 = ({ children, ...props }: textType) => {
    return <span style={{ ...textEllipsis, fontSize: 60, ...props }}>{children}</span>;
};

export const F60L20 = ({ children, ...props }: textType) => {
    return (
        <span
            style={{
                ...textEllipsis,
                fontSize: 60,
                letterSpacing: 20,
                ...props,
            }}
        >
            {children}
        </span>
    );
};

export const F64 = ({ children, ...props }: textType) => {
    return <span style={{ ...textEllipsis, fontSize: 64, ...props }}>{children}</span>;
};
