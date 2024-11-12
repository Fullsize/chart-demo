/*
 * @Author: sungy
 * @Date: 2023-11-23 10:55:43
 * @LastEditors: sungy
 * @LastEditTime: 2024-10-23 10:58:17
 * @Description: 页面入口文件
 */

import React, { memo, useEffect } from 'react';
import Routes from '@/routes';
import Nav from '@/components/nav';
import { useLocation } from 'react-router-dom';

import RefreshTokenOfHeader from './RefreshTokenOfHeader';
import ResizeScaleBody from './ResizeScaleBody';
import { Flr } from '@/components/Indicator';
import useInitAuthMenu from '@/routes/useInitAuthMenu';
import useInitMenu from '@/routes/useInitMenu';

function NavPage() {
    return (
        <>
            <Nav></Nav>
            <div
                style={{
                    flex: 1,
                    padding: '0px 20px 20px 20px',
                    overflow: 'hidden',
                    marginTop: 10,
                    minHeight: 650,
                    zIndex: 999,
                }}
            >
                <Flr
                    flex="none"
                    position="relative"
                    height="100%"
                    width="100%"
                    alignItems="none"
                    gap={20}
                    fontSize={14}
                    // minHeight="max-content"
                    overflow="hidden auto"
                    paddingRight={5}
                    boxSizing="border-box"
                >
                    <Routes />
                </Flr>
            </div>
        </>
    );
}

const navPage = <NavPage></NavPage>;
const router = <Routes />;
export function Main() {
    useInitMenu();
    // useInitAuthMenu();
    const location = useLocation();
    return (
        <RefreshTokenOfHeader>
            <ResizeScaleBody>
                {location?.pathname != '/login' && location?.pathname != '/home' ? navPage : router}
            </ResizeScaleBody>
        </RefreshTokenOfHeader>
    );
}
export default memo(Main);
