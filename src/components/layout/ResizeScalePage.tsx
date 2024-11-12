/*
 * @Author: sungy
 * @Date: 2023-11-23 10:55:43
 * @LastEditors: sungy
 * @LastEditTime: 2024-06-05 14:17:19
 * @Description: 全局缩放
 */

import React, { useEffect, useRef, useState } from 'react';
import { Flc } from '@/components/Indicator';
import { useScale } from './ResizeScaleBody';

const useResizeStyle = (ref: any, scale: number) => {
    const bodyScale = useScale();
    const [reSizeStyle, setReSizeStyle] = useState<any>({ display: 'none' });

    useEffect(() => {
        if (ref.current && scale && bodyScale) {
            const { width, height } = ref.current.getBoundingClientRect() ?? {};
            const w = width / bodyScale;
            const h = height / bodyScale;
            const resize = () => {
                setReSizeStyle({
                    transformOrigin: 'left top',
                    transform: `scale(${scale})`,
                    width: w / scale,
                    height: h / scale,
                });
            };
            resize();
            window.addEventListener('resize', resize);
            return () => {
                window.removeEventListener('resize', resize);
            };
        }
        return;
    }, [scale, bodyScale]);

    return reSizeStyle;
};

export default function ResizeScalePage({ children, scale = 1 }: { children: React.ReactNode; scale: number }) {
    const ref = useRef<any>();
    const style = useResizeStyle(ref, scale);
    return (
        <div
            ref={ref}
            style={{
                width: '100%',
                height: '100%',
                overflow: 'hidden',
            }}
        >
            <div style={{ ...style }}>
                <Flc position="relative" overflow="hidden" height="100%" width="100%">
                    {children}
                </Flc>
            </div>
        </div>
    );
}
