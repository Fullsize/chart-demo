/*
 * @Author: sungy
 * @Date: 2023-11-23 10:55:43
 * @LastEditors: sungy
 * @LastEditTime: 2024-05-14 17:06:44
 * @Description: 全局缩放
 */

import React, { useEffect, useState } from 'react';
import { Flc } from '@/components/Indicator';

const useResize = () => {
    const [size] = useState({
        width: 1920,
        height: 1080,
        minWidth: 1450,
        minHeight: 700,
    });
    const [reSize, setReSize] = useState<any>([]);
    useEffect(() => {
        const resize = () => {
            const { width, height, minWidth, minHeight } = size;
            let cW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            let cH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            cW = cW < minWidth ? minWidth : cW;
            cH = cH < minHeight ? minHeight : cH;

            const rw = cW / width;
            const rh = cH / height;
            const scale = rw <= rh ? rw : rh;

            setReSize([
                scale,
                {
                    transform: `scale(${scale})`,
                    width: cW / scale,
                    height: cH / scale,
                },
                { width: cW, height: cH },
            ]);
        };
        resize();
        window.addEventListener('resize', resize);
        return () => {
            window.removeEventListener('resize', resize);
        };
    }, [size]);

    return reSize;
};

export const useScale = () => {
    const [scale] = useResize();
    return scale ?? 1;
};

export default function ResizeFullScreenBody({ children }: any) {
    const [, style] = useResize();

    useEffect(() => {
        if (!style) {
            return;
        }
        const bodyStyle = document.body.style;
        bodyStyle.width = `${style.width}px`;
        bodyStyle.height = `${style.height}px`;
        bodyStyle.transform = style.transform;
        bodyStyle.transformOrigin = 'left top';
    }, [style]);

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
            }}
        >
            <Flc position="relative" overflow="hidden" height="100%" width="100%">
                {children}
            </Flc>
        </div>
    );
}
