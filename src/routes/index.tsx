/*
 * @Author: sungy
 * @Date: 2023-08-16 16:21:08
 * @LastEditors: zhipengHuang
 * @LastEditTime: 2024-08-16 16:49:15
 * @Description: 河北路由入口
 */

import React, { lazy, Suspense, useState, useEffect, memo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Empty from '@/components/Empty';
import { Flr } from '@/components/Indicator';
import WithAuth from '@/hocs/withAuth';
import useStore from '@/store';
import routerBase from './routerBase';
import routerDemo from './routerDemo';

const renderRoute = (routes: Array<any>, mark: any = [], path: string = '') => {
    routes.map(async (item: any) => {
        let Dashboard: any;
        const componentPath = `${path}${item.path}`;
        if (item.component) {
            const Component: any = lazy(async () => {
                try {
                    return await import(`../pages${componentPath}`);
                } catch (error) {
                    console.log(error)
                    return {
                        default: () => {
                            return <Empty msg={item.name + '-建设中...'}></Empty>;
                        },
                    };
                }
            });
            const ComponentMemo = memo(Component);
            Dashboard = <ComponentMemo />;
        } else {
            Dashboard = <></>;
        }

        mark.push(
            <Route
                key={path + item.path}
                path={path + item.path}
                element={item.to ? <Navigate to={item.to} /> : <Suspense fallback={<></>}>{Dashboard}</Suspense>}
            />,
        );

        if (item.children) {
            renderRoute(item.children, mark, componentPath);
        }
    });
    return mark;
};

const Page = () => {
    const { userAuthMenu } = useStore();
    const [router, setRouter] = useState([]);
    const [baseRouter] = useState(() => {
        let developmentRouter: any = [];
        if (process.env.NODE_ENV === 'development') {
            developmentRouter = [...routerDemo];
        }
        return renderRoute([...routerBase, ...developmentRouter], []);
    });

    useEffect(() => {
        if (userAuthMenu) {
            const router: any = renderRoute([...userAuthMenu.authPath], []);
            setRouter(router);
        }
    }, [userAuthMenu]);

    return (
        <Routes>
            {baseRouter.map((R: any) => {
                return R;
            })}
            {router.map((R: any) => {
                return R;
            })}
            <Route
                path="*"
                element={
                    <Flr flex={1}>
                        <Empty msg="404-未找到页面" />
                    </Flr>
                }
            />
        </Routes>
    );
};
export default WithAuth(Page);
