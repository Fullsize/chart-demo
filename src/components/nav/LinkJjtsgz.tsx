/*
 * @Author: sungy
 * @Date: 2023-09-07 10:13:12
 * @LastEditors: sungy
 * @LastEditTime: 2024-07-10 10:43:14
 * @Description: 返回上一级
 */

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import routerSx from '@/routes/routerSx';

const mapping: any = {};

/**
 * [key]: 目标页面名称
 * [value]: 别名，简短名称
 */
const mappingTrName: Record<string, string> = {} as const;

(function root(cc, p) {
    cc.forEach((element: any) => {
        mapping[element.name] = p + element.path;
        if (mappingTrName[element.name]) {
            mapping[mappingTrName[element.name]] = p + element.path;
        }
        if (element?.children) {
            root(element.children, p + element.path);
        }
    });
})(routerSx, '');

export default function LinkToJjtsgz({
    title,
    to,
    children,
    state,
}: {
    title?: any;
    to?: string;
    children?: React.ReactNode;
    state?: any;
}) {
    const location = useLocation();
    const navigate = useNavigate();

    if (location?.pathname?.startsWith?.('/jjtsgz') || location?.pathname?.startsWith?.('/jjyxyj')) {
        if (to) {
            return (
                <a
                    className="link-to-jc"
                    onClick={() => {
                        navigate(to, { state: state });
                    }}
                >
                    <span> {children} </span>
                </a>
            );
        } else {
            const mPath = mapping?.[title];
            return mPath && location.pathname != mPath && mPath.startsWith(location?.pathname) ? (
                <a
                    className="link-to-jc"
                    onClick={() => {
                        navigate(mPath);
                    }}
                >
                    {children ? children : title}
                </a>
            ) : (
                <>{children ? children : title}</>
            );
        }
    } else {
        return <>{children}</>;
    }
}
