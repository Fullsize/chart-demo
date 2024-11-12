/*
 * @Author: sungy
 * @Date: 2023-09-07 10:13:12
 * @LastEditors: sungy
 * @LastEditTime: 2024-06-19 18:42:46
 * @Description:
 */

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { F16B } from '../Indicator';

import icon_home from '@images/icons/home.png';

export default function GoHome() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <>
            {location.pathname != '/home' && (
                <>
                    <a
                        onClick={() => {
                            navigate('/home');
                        }}
                    >
                        <F16B>
                            <img
                                src={icon_home}
                                style={{
                                    transform: 'translateY(1px)',
                                    marginRight: 5,
                                    width: '16px',
                                    scale: '1.7',
                                }}
                            />
                            首页
                        </F16B>
                    </a>
                </>
            )}
        </>
    );
}
