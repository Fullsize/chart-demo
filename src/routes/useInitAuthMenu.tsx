/*
 * @Author: sungy
 * @Date: 2023-08-16 16:21:08
 * @LastEditors: Fullsize
 * @LastEditTime: 2024-11-12 16:31:27
 * @Description: 河北路由入口
 */

import React, { useEffect } from 'react';
import path from './path';
import { useEcApiLdgGet } from '@/service';
import useStore from '@/store';

import routerSx from '@/routes/routerSx';
import routerDemo from '@/routes/routerDemo';
import { useLocation } from 'react-router-dom';
import { useDebounce } from 'react-use';
import routerBase from './routerBase';

const useInitAuthMenu = () => {
    const location = useLocation();
    const { userAuthMenu, setUserAuthMenu } = useStore();
    const [res, getUsermenu] = useEcApiLdgGet('/api/service/admin/usermenu');
    useEffect(() => {
        if (location?.pathname == '/login') {
            setUserAuthMenu(null);
        }
    }, [location?.pathname]);

    useDebounce(
        () => {
            if (location?.pathname != '/login' && !res.loading && userAuthMenu == null) {
                getUsermenu({ menukey: 'screens' });
            }
        },
        10,
        [location?.pathname, res.sign, userAuthMenu],
    );

    useEffect(() => {
        if (res.ok) {
            const usermenu = res?.data?.screens;
            if (Array.isArray(usermenu)) {
                const markR: any = {};
                (function mr(r: any) {
                    r.forEach((ele: any) => {
                        markR[ele.path] = ele;
                        if (Array.isArray(ele.children)) {
                            mr(ele.children);
                        }
                    });
                })(usermenu);

                const autoRouter = (r: any, p: any, path: string) => {
                    r.forEach((ele: any) => {
                        const fullPath = path + ele.path;
                        const autoEle = {
                            ...ele,
                        };
                        if (markR[fullPath]) {
                            p.children.push(autoEle);
                        }
                        if (Array.isArray(ele.children)) {
                            autoEle.children = [];
                            autoRouter(ele.children, autoEle, fullPath);
                        }
                    });
                    return p;
                };
                const autoPath = autoRouter(JSON.parse(JSON.stringify(path)), { path: '', children: [] }, '');
                setUserAuthMenu({
                    verifyPath: (p: string) => {
                        return markR[p] ? true : false;
                    },
                    getNavByPath: (p: string) => {
                        const navPath: any = [...routerSx, ...routerDemo];
                        return navPath;
                    },
                    getAuthMenuByPath: (p: string) => {
                        return markR[p];
                    },
                    authPath: [...routerBase, ...routerDemo],
                });
            }
        }
    }, [res.sign]);
    return userAuthMenu;
};

export default useInitAuthMenu;
