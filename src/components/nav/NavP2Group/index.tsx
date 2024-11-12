/*
 * @Author: sungy
 * @Date: 2023-08-09 14:32:13
 * @LastEditors: zhipengHuang
 * @LastEditTime: 2024-08-08 11:01:35
 * @Description: 导航入口文件
 */

import React from 'react';
import { F22 } from '@/components/Indicator';
import { useNavigate } from 'react-router-dom';
import NavP22, { SplitLine } from '../NavP2';
import NavP33 from '../NavP3';
import iconUrl from './icon.png';

const P2GroupButton = ({ active, children, ...props }: any) => {
    const activeStyle = active ? { color: '#FFF' } : { color: 'red' };
    return (
        <div
            style={{ display: 'flex', flexDirection: 'row', gap: 5, cursor: 'pointer', alignItems: 'center' }}
            {...props}
        >
            <F22 fontWidth={500} {...activeStyle}>
                {children}
            </F22>
            {active && <img src={iconUrl} alt="" />}
        </div>
    );
};
const NavP2Group = ({ nav }: any) => {
    const navigate = useNavigate();
    if (nav?.[1]?.path === '/zdcyfz') {
        return (
            <>
                {nav?.[2]?.path == '/gxjscy' ? (
                    <>
                        <NavP22
                            before={
                                <>
                                    <P2GroupButton
                                        active={false}
                                        onClick={() => {
                                            navigate('/zdcyfz/gtgy');
                                        }}
                                    >
                                        七大传统工业
                                    </P2GroupButton>
                                    <SplitLine />
                                    <P2GroupButton
                                        active={true}
                                        onClick={() => {
                                            navigate('/zdcyfz/gxjscy');
                                        }}
                                    >
                                        高新技术产业
                                    </P2GroupButton>
                                </>
                            }
                            active={[nav?.[3]]}
                            path={nav?.[2]}
                        ></NavP22>
                    </>
                ) : (
                    <>
                        <NavP22
                            before={
                                <P2GroupButton
                                    active={true}
                                    onClick={() => {
                                        navigate('/zdcyfz/gtgy');
                                    }}
                                >
                                    七大传统工业
                                </P2GroupButton>
                            }
                            after={
                                <>
                                    <SplitLine />
                                    <P2GroupButton
                                        active={false}
                                        onClick={() => {
                                            navigate('/zdcyfz/gxjscy');
                                        }}
                                    >
                                        高新技术产业
                                    </P2GroupButton>
                                </>
                            }
                            active={[nav?.[2]]}
                            path={{
                                ...nav?.[1],
                                children: [...(nav[1].children.slice(0, nav[1].children.length - 1) ?? [])],
                            }}
                        ></NavP22>
                        <NavP33 active={nav?.[3]} path={nav?.[2]}></NavP33>
                    </>
                )}
            </>
        );
    }
    if (nav?.[1]?.path === '/jjyxyj') {
        return <></>;
    } else {
        const isCollapse = nav?.[2]?.collapseChildren;
        return (
            <>
                {/* 导航列表 二级 */}
                {location.pathname != '/jjtsgz/jjgz' && (
                    <NavP22 active={isCollapse ? [nav?.[2], nav?.[3]] : [nav?.[2]]} path={nav?.[1]}></NavP22>
                )}

                {/* 导航列表 三级 */}
                {nav?.[1]?.path != '/jjtsgz' && (
                    <>
                        {isCollapse ? (
                            <NavP33 active={nav?.[4]} path={nav?.[3]}></NavP33>
                        ) : (
                            <NavP33 active={nav?.[3]} path={nav?.[2]}></NavP33>
                        )}
                    </>
                )}
            </>
        );
    }
};

export default NavP2Group;
