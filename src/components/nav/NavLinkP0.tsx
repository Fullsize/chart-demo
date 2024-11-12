/*
 * @Author: sungy
 * @Date: 2023-09-25 14:07:11
 * @LastEditors: zhipengHuang
 * @LastEditTime: 2024-08-26 17:53:39
 * @Description: 00级导航-原首页功能迁移到这里
 */
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

import { F20, IndBtn02 } from '@/components/Indicator';
import NavTopBar from './NavTopBar';
import { Flr } from '@/components/Indicator';
import UserInfo from './UserInfo';
import ManageSetting from './ManageSetting';
import SignOut from './SignOut';
import sjjb from './sjjb.webp';
import { getToken } from '@/service/request';
import { Select, Spin } from 'antd';
import _ from 'lodash';
import { useEcApiPost } from '@/service';
const { Option } = Select;

const getNavName = (nav: any, pathname: any) => {
    if (pathname == '/home') {
        return '山西经济大脑';
    } else {
        if (nav.length < 6) {
            switch (nav[1]?.path) {
                case '/hgjj':
                    return '经济动态';
                case '/szjj':
                    return '经济动态';
                case '/shms':
                    return '经济动态';
                case '/sthb':
                    return '经济动态';
                case '/cxqd':
                    return '经济动态';
                case '/nygm':
                    return '经济动态';
                case '/wlky':
                    return '经济动态';
                case '/qyjj':
                    return '经济动态';
                case '/zdcyl':
                    return '经济动态';
                default:
                    return '每日关注';
            }
        } else {
            return nav[nav.length - 2]?.name;
        }
    }
};

const LinkP0 = ({ route, direction = 'left', isLoopRoute = false, parentPath, ...style }: any) => {
    const location = useLocation();
    const navigate = useNavigate();
    const active = !isLoopRoute ? location.pathname.startsWith(route?.path) : location.pathname.endsWith(route?.path);
    const path = !isLoopRoute ? route?.path : parentPath + route?.path;
    if (path == '/sjjb') {
        return (
            <div
                style={{
                    cursor: 'pointer',
                    zIndex: 999,
                    height: '50px',
                    lineHeight: '50px',
                    minWidth: '130px',
                    transform: 'translateY(1px)',
                    ...style,
                    // borderBottom: '1px solid #C3FFDA',
                }}
                onClick={() => {
                    const token = getToken();
                    const url = window.sjjb + `?smart_token=${token}`;
                    window.open(url, '_blank');
                }}
            >
                <img src={sjjb} alt="" style={{ width: '40px', height: '40px' }} />
                <F20
                    display="inline-block"
                    transform=" translateY(8px)"
                    color="transparent"
                    background="linear-gradient(rgb(255, 255, 255) 0%, rgb(255, 255, 255) 30%, #9EFFC3 100%) text"
                >
                    {route?.name}
                </F20>
            </div>
        );
    }
    return route ? (
        <div
            style={{ cursor: 'pointer', zIndex: 999, ...style }}
            onClick={() => {
                //  hardcode the external link
                // if (path == '/zdcyl') {
                //     window.open(window.cylurl, '_blank');
                //     return;
                // }
                if (path == '/aizp') {
                    window.open(window.aizhipu, '_blank');
                    return;
                }
                if (path == '/jjdt') {
                    navigate(route?.to);
                    return;
                }

                navigate(path);
            }}
        >
            <IndBtn02 active={active} reverse={direction == 'right'}>
                {route?.name}
            </IndBtn02>
        </div>
    ) : (
        <></>
    );
};

const getMrgzNav = () => {
    return [
        {
            path: '/jjdt',
            name: '经济动态',
            component: true,
            to: '/hgjj/jjzl',
        },
        {
            path: '/aizp',
            name: 'AI智晋',
            component: true,
        },
    ];
};

export default function NavLinkP0({ nav = [], showGoBack }: any) {
    const location = useLocation();
    const isShow = location?.pathname == '/home' || showGoBack;
    const navs =
        location?.pathname == '/mrgz' ? getMrgzNav() : nav.length >= 6 ? nav?.[4]?.children : nav?.[0]?.children; //根据路由层级判断取值
    const parentPath = nav.length >= 6 ? nav?.[4]?.parentPath : null;
    const isLoopRoute = nav.length >= 6 ? true : false;
    const curIndex = navs && navs?.length ? Math.floor(navs.length / 2) : 1; //设置分割点
    return (
        <NavTopBar
            title={getNavName(nav, location.pathname)}
            leftNav={
                isShow ? (
                    <></>
                ) : (
                    <Flr width="100%" paddingTop={10} gap={16} alignItems="flex-end" justifyContent="flex-end">
                        {navs
                            ?.filter((_: any, i: number) => i < curIndex)
                            .map((item: any, i: number) => (
                                <LinkP0
                                    key={i}
                                    route={item}
                                    direction="left"
                                    marginRight={-20}
                                    isLoopRoute={isLoopRoute}
                                    parentPath={parentPath}
                                />
                            ))}
                    </Flr>
                )
            }
            rightNav={
                <Flr width="100%" alignItems="flex-start" justifyContent="flex-start">
                    {isShow ? (
                        <Flr width="100%"></Flr>
                    ) : (
                        <Flr width="100%" height="100%" gap={16} alignItems="flex-end" justifyContent="flex-start">
                            {navs
                                ?.filter((_: any, i: number) => i >= curIndex)
                                .map((item: any, i: number) => (
                                    <LinkP0
                                        key={i}
                                        route={item}
                                        direction="right"
                                        marginLeft={-20}
                                        isLoopRoute={isLoopRoute}
                                        parentPath={parentPath}
                                    />
                                ))}
                        </Flr>
                    )}
                    <Flr gap={15} position="absolute" top="20px" right="20px" alignItems="flex-start">
                        <SerachInput />
                        {process.env.NODE_ENV === 'development' && <Link to={'/00-demo'}>demo</Link>}
                        <UserInfo></UserInfo>
                        <ManageSetting></ManageSetting>
                        <SignOut />
                    </Flr>
                </Flr>
            }
        ></NavTopBar>
    );
}

const SerachInput = () => {
    const [options, setOptions] = useState<any>([]);
    const [fetching, setFetching] = useState(false);
    const [resCard, getCard] = useEcApiPost('/api/v4/attr/query/list');
    const [selected, setSelected] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchedOptions = resCard?.data?.map((item: any)=>{
            return {
                label: item.index_full_name,
                value: item.menu
            }
        });
        setOptions(fetchedOptions);
        setFetching(false);
    }, [resCard?.sign]);
    // 模拟远程搜索请求
    const fetchOptions = _.debounce((value: any) => {
        setFetching(true);
        getCard({
            dataId: 'eco_sxsjj_index_menu_search',
            keyName: value,
        });
    }, 800);

    const handleSearch = (value: any) => {
        if (value) {
            fetchOptions(value);
        } else {
            setOptions([]);
        }
    };

    const handleChange = (value: any) => {
        navigate(value);
        setOptions([]);
    }

    return (
        <Select
            showSearch
            placeholder="搜索指标"
            notFoundContent={fetching ? <Spin size="small" /> : null}
            filterOption={false}
            onSearch={handleSearch}
            style={{ width: 300 }}
            value={selected}
            onChange={handleChange}
        >
            {options?.map((option: any) => (
                <Option key={option.value} value={option.value}>
                    {option.label}
                </Option>
            ))}
        </Select>
    );
};
