/*
 * @Author: sungy
 * @Date: 2023-09-07 10:13:12
 * @LastEditors: sungy
 * @LastEditTime: 2024-06-19 18:00:57
 * @Description: 返回上一级
 */

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Flr, F18B, F14 } from '@/components/Indicator';
import { LeftCircleOutlined } from '@ant-design/icons';

export const useShowGoBack = (nav: any) => {
    const location = useLocation();
    return (nav?.[1]?.path == '/jjtsgz' && nav.length > 3) || location.pathname == '/jjtsgz/jjgz';
};

export default function GoBack({ nav, style }: any) {
    const location = useLocation();
    const navigate = useNavigate();
    const isGoback = useShowGoBack(nav);

    return (
        <>
            <Flr gap={16} {...style}>
                {isGoback && (
                    <>
                        {location.pathname != '/jjtsgz/jjgz' && (
                            <a
                                onClick={() => {
                                    navigate('/jjtsgz');
                                }}
                            >
                                <F14>
                                    <LeftCircleOutlined /> 返回态势感知
                                </F14>
                            </a>
                        )}

                        <a
                            onClick={() => {
                                navigate(-1);
                            }}
                        >
                            <F14>
                                <LeftCircleOutlined /> 返回
                            </F14>
                        </a>
                    </>
                )}
            </Flr>
        </>
    );
}
