/*
 * @Author: sungy
 * @Date: 2023-09-22 14:09:25
 * @LastEditors: sungy
 * @LastEditTime: 2024-06-20 14:39:30
 * @Description: 当前位置
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Flr, F14, F14B } from '@/components/Indicator';
import GoHome from './GoHome';

export default function NavLocation({ nav, style }: any) {
    return (
        <>
            <div
                style={{
                    zIndex: 99,
                    lineHeight: '22px',
                    ...style,
                }}
            >
                <Flr gap={20}>
                    <GoHome></GoHome>
                    {nav?.length > 1 && (
                        <Flr>
                            {/* <F14>当前位置：</F14> */}
                            {nav?.map?.((item: any, i: any) => {
                                if (i == 0) {
                                    return <React.Fragment key={item.path + i}></React.Fragment>;
                                }
                                return (
                                    <React.Fragment key={item.path + i}>
                                        {i > 1 && <F14 padding="0 5px"> {'>'} </F14>}
                                        {i < nav.length - 1 && (
                                            <Link to={item.parentPath ?? '/'}>
                                                <F14B> {item.name} </F14B>
                                            </Link>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                            <F14>{nav[nav.length - 1]?.name}</F14>
                        </Flr>
                    )}
                </Flr>
            </div>
        </>
    );
}
