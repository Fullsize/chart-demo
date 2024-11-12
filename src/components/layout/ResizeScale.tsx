/*
 * @Author: sungy
 * @Date: 2023-11-23 10:55:43
 * @LastEditors: sungy
 * @LastEditTime: 2024-04-28 11:00:48
 * @Description: 页面入口文件
 */

import React, { useEffect, useState } from 'react';
import { Flc } from '@/components/Indicator';

const useResize = (width = 1920, height = 1080, minWidth = 1450, minHeight = 700) => {
    const [size, setSize] = useState<any>([]);
    useEffect(() => {
        const resize = () => {
            let cW = window.document.body.clientWidth;
            let cH = window.document.body.clientHeight;
            cW = cW < minWidth ? minWidth : cW;
            cH = cH < minHeight ? minHeight : cH;

            const rw = cW / width;
            const rh = cH / height;
            let scale;
            if (rw <= rh) {
                scale = {
                    transform: `scale(${rw})`,
                    width: cW / rw,
                    height: cH / rw,
                };
            } else {
                scale = {
                    transform: `scale(${rh})`,
                    width: cW / rh,
                    height: cH / rh,
                };
            }
            setSize([scale, { width: cW, height: cH }]);
        };
        resize();
        window.addEventListener('resize', resize);
        return () => {
            window.removeEventListener('resize', resize);
        };
    }, [width, height]);

    return size;
};

export default function Resize({ children }: any) {
    const [size, relSize] = useResize();

    return (
        <div
            style={{
                width: '100vw',
                maxWidth: '100vw',
                minWidth: '100vw',
                maxHeight: '100vh',
                minHeight: '100vh',
                height: '100Vh',
                overflow: 'auto hidden',
            }}
        >
            <div
                style={{
                    ...relSize,
                    overflow: 'hidden',
                }}
            >
                <Flc position="relative" transformOrigin="left top" overflow="hidden" {...size}>
                    {children}
                </Flc>
            </div>
        </div>
    );
}
