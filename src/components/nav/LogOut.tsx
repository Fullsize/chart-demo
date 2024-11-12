/*
 * @Author: sungy
 * @Date: 2023-09-14 11:07:00
 * @LastEditors: sungy
 * @LastEditTime: 2024-06-17 16:54:01
 * @Description: 退出登录
 */

import React, { useEffect } from 'react';
import { Flr, F14 } from '@/components/Indicator';
import logoutUrl from '@images/logout.png';
import { useNavigate } from 'react-router-dom';
import { removeToken } from '@/service/request';
import styles from './index.module.css';
import { useEcApiLdgGet } from '@/service';

export default function LogOut({ style }: any) {
    const navigate = useNavigate();
    const [resLogin, getLoginApi] = useEcApiLdgGet('/api/sso/hbfgw/logout');

    useEffect(() => {
        if (resLogin.ok) {
            document.cookie = 'ticket=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            removeToken();
            location.href = window.ssoLogin;
        }
    }, [resLogin.sign]);

    return (
        <div
            className={styles['logout']}
            style={{ ...style }}
            onClick={() => {
                if (window.isSsoLogin) {
                    const cookieString: any = document.cookie;
                    const smartJwt = cookieString.match(/(?:(?:^|.*;\s*)smart-jwt\s*=\s*([^;]*).*$)|^.*$/)[1];
                    getLoginApi({
                        'smart-jwt': smartJwt,
                    });
                } else {
                    removeToken();
                    navigate('/login');
                }
            }}
        >
            <Flr alignItems="center" cursor="pointer">
                <img alt="" style={{ marginLeft: -5 }} src={logoutUrl}></img>
                <F14>退出登录</F14>
            </Flr>
        </div>
    );
}
