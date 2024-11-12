/*
 * @Author: sungy
 * @Date: 2023-09-14 11:07:00
 * @LastEditors: sungy
 * @LastEditTime: 2024-07-03 10:47:28
 * @Description: 退出登录
 */

import React, { useEffect } from 'react';
import { F16, Flr } from '../Indicator';
import icon_out from '@images/icons/out.png';
import { useNavigate } from 'react-router-dom';
import { removeToken } from '@/service/request';
import { useEcApiLdgGet } from '@/service';

export default function UserInfo() {
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
            <Flr gap={5} style={{ cursor: 'pointer', paddingLeft: 24, position: 'relative' }}>
                <img
                    src={icon_out}
                    style={{
                        position: 'absolute',
                        left: 0,
                        top: -5,
                    }}
                />
                <F16>退出</F16>
            </Flr>
        </div>
    );
}
