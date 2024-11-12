/*
 * @Author: sungy
 * @Date: 2023-08-09 14:32:13
 * @LastEditors: Fullsize
 * @LastEditTime: 2024-11-12 16:46:02
 * @Description: 导航入口文件
 */

import React, { useEffect, useState } from 'react';
import { Flc } from '@/components/Indicator';
import { useLocation } from 'react-router-dom';
import NavLinkP0 from './NavLinkP0';
import NavLocation from './NavLocation';
import path from '@/routes/path';
import GoBack, { useShowGoBack } from './GoBack';
import useStore from '@/store';
import NavP2Group from './NavP2Group';
import routerDemo from '@/routes/routerDemo';
export default function Nav() {
    const location = useLocation();
    const [nav, setNav] = useState<any>();
    const { userAuthMenu } = useStore();
    const showGoBack = useShowGoBack(nav);

    const [switchThirdRoute, setSwitchThirdRoute] = useState<boolean>(true);

    useEffect(() => {
        if (!userAuthMenu) {
            return;
        }

        const pathArr: any = location.pathname.split('/');
        const navPath: any = routerDemo;
        const navArr = [
            {
                name: path[1]?.name ?? '',
                path: '/home',
                children: navPath,
            },
        ];

        for (let i = 1; i < pathArr.length; i++) {
            const path: any = pathArr[i];
            const nav = navArr[i - 1]?.children ?? [];

            const parentPath = pathArr.slice(0, i).join('/');
            for (let j = 0; j < nav.length; j++) {
                const element = nav[j];
                if ('/' + path == element?.path) {
                    navArr.push({
                        ...element,
                        parentPath: parentPath + element.path,
                    });
                    break;
                }
            }
        }
        setNav(navArr);
    }, [location?.pathname, userAuthMenu]);

    useEffect(() => {
        if (nav && nav.length >= 6) {
            setSwitchThirdRoute(false);
        } else {
            setSwitchThirdRoute(true);
        }
    }, [nav]);

    /**
     * nav.length < 6 代表层级是小与4级菜单的
     */

    return (
        <div style={{ zIndex: 990, position: 'relative' }}>
            {/* 导航列表 一级*/}
            {/* <NavLinkP0 nav={nav} showGoBack={showGoBack}></NavLinkP0> */}
            <NavLocation nav={nav} style={{ position: 'absolute', left: 20, top: 20 }} />
            <GoBack nav={nav} style={{ position: 'absolute', left: 20, top: 60 }}></GoBack>
            {!showGoBack && switchThirdRoute && (
                <Flc alignItems="center">
                    <NavP2Group nav={nav}></NavP2Group>
                </Flc>
            )}
        </div>
    );
}
