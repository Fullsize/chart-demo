import React, { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import mapBgSpinUrl from './img/map_bg_spin.png';
import mapBgUrl from './img/map_bg.png';
import styles from './index.module.css';

/**
 * 地图背景+旋转背景
 * @returns
 */
export function MapBgImgSpin() {
    const [size, setSize] = useState<number>();
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const dom = ref.current;
        const resize = () => {
            if (dom) {
                const s = dom.clientWidth > dom.clientHeight ? dom.clientHeight : dom.clientWidth;
                setSize(s);
            }
        };
        resize();
        window.addEventListener('resize', resize);
        return () => {
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <div
            ref={ref}
            style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: -1,
                backgroundImage: `url(${mapBgUrl})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                // overflow:"hidden"
            }}
        >
            <div
                className={styles['map-bg']}
                style={{
                    width: size,
                    height: size,
                    backgroundImage: `url(${mapBgSpinUrl})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}
            ></div>
        </div>
    );
}
