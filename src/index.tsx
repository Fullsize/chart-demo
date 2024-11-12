import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, useLocation } from 'react-router-dom';
import Layout from '@/components/layout';
import { useAxios } from 'fl-hooks';
import request from '@/service/request';
import './normalize.css';
import './index.css';
import { useEcApiPost } from './service';
import useStore from '@/store';

useAxios.extend(request);

const root = createRoot(document.getElementById('app')!);

// 自定义的页面追踪 Hook
const usePageStayTracker = () => {
    const { userAuthMenu } = useStore();
    const [pageInfo, setPageInfo] = useState<any>(null);
    const [result, getResult] = useEcApiPost('/api/service/log/stay/record');
    const location = useLocation(); // 获取当前路径
    const MIN_STAY_DURATION = 16; // 设置最小停留时间（1秒）
    useEffect(() => {
        const startTime = Date.now(); // 页面进入时间戳
        return () => {
            const endTime = Date.now(); // 页面离开时间戳
            const timeSpent = endTime - startTime; // 转换为秒
            const menuId = userAuthMenu?.getAuthMenuByPath?.(location?.pathname)?.id;
            if (timeSpent >= MIN_STAY_DURATION && menuId) {
                const timeSpentInSeconds = timeSpent / 1000; // 转换为秒
                setPageInfo({
                    time: timeSpentInSeconds,
                    // startTime: startTime,
                    // endTime: endTime,
                    menuId: menuId,
                });
            }
        };
    }, [location]); // 路由变化时触发
    useEffect(() => {
        if (pageInfo?.time) {
            getResult({
                timeValue: pageInfo.time,
                menuId: pageInfo?.menuId,
            });
        }
    }, [pageInfo]);
};

// 用于包裹 Layout 的组件，提供页面停留时间追踪功能
const PageTrackerWrapper = ({ children }: any) => {
    usePageStayTracker(); // 追踪页面停留时间
    return children;
};

function render() {
    root.render(
        // <React.StrictMode>
        <HashRouter>
            <PageTrackerWrapper>
                <Layout />
            </PageTrackerWrapper>
        </HashRouter>,
        // </React.StrictMode>,
    );
}

if (!window.__POWERED_BY_QIANKUN__) {
    render();
}
