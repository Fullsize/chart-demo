import React, { useRef, useEffect, useState } from 'react';
const hMap: any = {};
function getSvgEleWH(element: SVGTextElement) {
    if (!element) {
        return { w: 0, h: 0 };
    }
    const style = window.getComputedStyle(element);
    const fontSize = style.getPropertyValue('font-size');
    const bbox = element.getBBox();
    let h;
    if (hMap[fontSize]) {
        h = hMap[fontSize];
    } else {
        const div = document.createElement('div');
        div.style.fontSize = fontSize;
        div.style.position = 'absolute';
        div.style.top = '-100%';
        div.innerText = '测试';
        document.body.appendChild(div);
        h = div.clientHeight;
        hMap[fontSize] = h;
        document.body.removeChild(div);
    }

    return {
        w: bbox.width,
        h: h,
        sh: h + h * 0.1,
        th: h - h * 0.1,
    };
}

export const IndSvgLgText = ({ children, style }: any) => {
    const textRef = useRef<any>();
    const [wh, setWh] = useState<any>({ w: 0, h: 0 });

    useEffect(() => {
        const svgT = textRef.current;
        if (svgT) {
            const bbox = getSvgEleWH(svgT);
            setWh({ ...bbox });
        }
    }, [children]);

    return (
        <svg width={wh.w} height={wh.sh} style={{ ...style }}>
            <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="25%" style={{ stopColor: '#EEF9FD', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#7dc6f1', stopOpacity: 1 }} />
                </linearGradient>
            </defs>
            <text
                ref={textRef}
                fill="url(#grad1)"
                x="0"
                y={wh.th}
                style={{ textShadow: '0px 2px 0px rgba(0, 0, 0, 0.8)' }}
            >
                {children}
            </text>
        </svg>
    );
};

export const IndSvgLgText2 = ({ children, style }: any) => {
    const textRef = useRef<any>();
    const [wh, setWh] = useState<any>({ w: 0, h: 0 });

    useEffect(() => {
        const svgT = textRef.current;
        if (svgT) {
            const bbox = getSvgEleWH(svgT);
            setWh({ ...bbox, w: bbox.w + 20 });
        }
    }, [children]);

    return (
        <svg width={wh.w} height={wh.sh} style={{ ...style }}>
            <defs>
                <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#FFFFFF', stopOpacity: 1 }} />
                    <stop offset="30%" style={{ stopColor: '#FFFFFF', stopOpacity: 1 }} />
                    <stop offset="84%" style={{ stopColor: '#77BAFF', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#6AA7E7', stopOpacity: 1 }} />
                </linearGradient>
            </defs>
            <text
                ref={textRef}
                fill="url(#grad2)"
                x={10}
                y={wh.th}
                style={{
                    textShadow:
                        '0px 4px 0px rgba(19,80,143,0.66), 0px 0px 16px rgba(130,165,255,0.5), 0px 1px 3px rgba(255,255,255,0.8)',
                }}
            >
                {children}
            </text>
        </svg>
    );
};

export const IndSvgLgText3 = ({ children, style }: any) => {
    const textRef = useRef<any>();
    const [wh, setWh] = useState<any>({ w: 0, h: 0 });

    useEffect(() => {
        const svgT = textRef.current;
        if (svgT) {
            const bbox = getSvgEleWH(svgT);
            setWh({ ...bbox, w: bbox.w + 20 });
        }
    }, [children]);

    return (
        <svg width={wh.w} height={wh.sh} style={{ ...style }}>
            <defs>
                <linearGradient id="grad3" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#FFFFFF', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#FFFFFF', stopOpacity: 1 }} />
                </linearGradient>
            </defs>
            <text
                ref={textRef}
                fill="url(#grad3)"
                x={10}
                y={wh.th}
                style={{
                    textShadow:
                        '0px 4px 0px rgba(19,80,143,0.66), 0px 0px 16px rgba(130,165,255,0.5), 0px 1px 3px rgba(255,255,255,0.8)',
                }}
            >
                {children}
            </text>
        </svg>
    );
};

export const IndSvgLgText4 = ({ children, style }: any) => {
    const textRef = useRef<any>();
    const [wh, setWh] = useState<any>({ w: 0, h: 0 });

    useEffect(() => {
        const svgT = textRef.current;
        if (svgT) {
            const bbox = getSvgEleWH(svgT);
            setWh({ ...bbox, w: bbox.w + 20 });
        }
    }, [children]);

    return (
        <svg width={wh.w} height={wh.sh} style={{ ...style }}>
            <defs>
                <linearGradient id="grad4" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#FFFFFF', stopOpacity: 1 }} />
                    <stop offset="45%" style={{ stopColor: '#FFFFFF', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#77BAFF', stopOpacity: 1 }} />
                </linearGradient>
            </defs>
            <text
                ref={textRef}
                fill="url(#grad4)"
                x={10}
                y={wh.th}
                style={{
                    textShadow:
                        '0px 4px 0px rgba(19,80,143,0.66), 0px 0px 16px rgba(130,165,255,0.5), 0px 1px 3px rgba(255,255,255,0.8)',
                }}
            >
                {children}
            </text>
        </svg>
    );
};

export const IndSvgLgText5 = ({ children, style, useFont = true }: any) => {
    const textRef = useRef<any>();
    const [wh, setWh] = useState<any>({ w: 0, h: 0 });

    useEffect(() => {
        const svgT = textRef.current;
        if (svgT) {
            const bbox = getSvgEleWH(svgT);
            setWh({ ...bbox, w: bbox.w + 20 });
        }
    }, [children]);

    return (
        <svg width={wh.w} height={wh.sh} style={{ ...style }}>
            <defs>
                <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: 'rgba(255, 255, 255, 1)', stopOpacity: 1 }} />
                    <stop offset="10%" style={{ stopColor: 'rgba(255, 255, 255, 1)', stopOpacity: 1 }} />
                    {/* <stop offset="84%" style={{ stopColor: '#77BAFF', stopOpacity: 1 }} /> */}
                    <stop offset="100%" style={{ stopColor: 'rgba(127, 229, 255, 1)', stopOpacity: 1 }} />
                </linearGradient>
            </defs>
            <text
                ref={textRef}
                fill="url(#grad2)"
                x={10}
                y={wh.th}
                style={
                    useFont
                        ? { textShadow: '0px 2px 17px #000000', fontFamily: 'YouSheBiaoTiHei' }
                        : { textShadow: '0px 2px 17px #000000' }
                }
            >
                {children}
            </text>
        </svg>
    );
};
