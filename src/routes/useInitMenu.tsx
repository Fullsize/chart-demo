/*
 * @Author: sungy
 * @Date: 2023-08-16 16:21:08
 * @LastEditors: sungy
 * @LastEditTime: 2024-08-27 14:00:00
 * @Description: 河北路由入口
 */

import { useEffect } from 'react';
import path from './path';
import routerBase from './routerBase';
import useStore from '@/store';

import routerDemo from './routerDemo';
import routerSx from '@/routes/routerSx';

const useInitMenu = () => {
    const { userAuthMenu, setUserAuthMenu } = useStore();

    useEffect(() => {
        let developmentRouter: any = [];
        if (process.env.NODE_ENV === 'development') {
            developmentRouter = [...routerDemo];
        }
        const autoRouter = (r: any, p: any) => {
            r.forEach((ele: any) => {
                p.children.push(ele);
                if (Array.isArray(ele.children)) {
                    autoRouter(ele.children, ele);
                }
            });
            return p;
        };
        const autoPath = autoRouter(JSON.parse(JSON.stringify(path)), { path: '', children: [] });

        setUserAuthMenu({
            verifyPath: () => {
                return true;
            },
            getNavByPath: (p: string) => {
                const navPath: any = [...routerSx];
                if (developmentRouter?.[0]) {
                    navPath.push(developmentRouter[0]);
                }
                return navPath;
            },
            authPath: [...routerBase, ...autoPath.children, ...developmentRouter],
        });
    }, []);
    return userAuthMenu;
};

export default useInitMenu;
