/*
 * @Author: sungy
 * @Date: 2023-09-07 10:13:12
 * @LastEditors: zhipengHuang
 * @LastEditTime: 2024-08-29 15:06:34
 * @Description:
 */

import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.css';
import { F16, Flr } from '@/components/Indicator';
import _ from 'lodash';
import icon from './icon.png';

export default function NavLink({ active, path }: any) {
    const navRef = useRef<any>();
    const navigate = useNavigate();

    return path?.children?.length > 0 ? (
        <Flr
            justifyContent="flex-start"
            gap={12}
            margin="10px 0"
            width="100%"
            padding="0 20px"
            boxSizing="border-box"
            position="relative"
            marginBottom="0px"
            // overflow="hidden"
        >
            <nav className={styles['nav']} ref={navRef}>
                {path?.children?.map((item: any) => {
                    const isActive = active?.path == item.path;
                    const isShow = typeof item?.isShowInMenu === 'undefined' ? true : item?.isShowInMenu;
                    const textElement = isActive ? (
                        <F16 color="rgba(255,255,255,1)">{item?.name}</F16>
                    ) : (
                        <F16 color="rgba(255,255,255,0.65)">{item?.name}</F16>
                    );
                    return isShow ? (
                        <div
                            key={item.path}
                            className={isActive ? styles.active_select_nav : ''}
                            onClick={(e: any) => {
                                navigate(path.parentPath + item.path);
                                // setIndicatorStyle(getIndicatorStyle(e.target));
                            }}
                        >
                            {textElement}
                        </div>
                    ) : null;
                })}
            </nav>
            <div className={styles.bottom_box}>
                <img src={icon} className={styles.left} />
                <img src={icon} className={styles.right} />
            </div>
        </Flr>
    ) : (
        <Flr></Flr>
    );
}

function getIndicatorStyle(element: any) {
    if (!element) {
        return {};
    }
    return {
        width: 60,
        left: element.offsetLeft + (element.offsetWidth - 60) / 2,
    };
}
