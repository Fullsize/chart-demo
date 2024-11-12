import React, { useEffect } from 'react';
import { setToken, getToken } from '@/service//request';
import { useNavigate, useLocation } from 'react-router-dom';
import { getQueryString, removeQueryParams } from '@/utils';
import { getUrlSearchParameter } from '@/utils/url';
const WithAuth = (Component: any) => {
    return function Auth() {
        // const navigate = useNavigate();
        // const location = useLocation();
        // useEffect(() => {
        //     // SSO 登录逻辑
        //     if (window.isSsoLogin) {
        //         const ticketPram = getUrlSearchParameter('smart-jwt');
        //         if (ticketPram) {
        //             navigate('/login');
        //             return;
        //         }
        //     }

        //     const token = getToken();
        //     const { smart_token }: any = getQueryString();
        //     if (!token && !smart_token) {
        //         navigate('/login');
        //         return;
        //     }
        //     if (smart_token) {
        //         setToken(smart_token);
        //         removeQueryParams('smart_token');
        //     }
        // }, [location.pathname]);
        return <Component />;
    };
};
export default WithAuth;
