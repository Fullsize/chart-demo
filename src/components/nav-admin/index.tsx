import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import icons from './icon.json';
import styles from './index.module.css';
import dayjs from 'dayjs';
interface Props {
    hasLeft?: boolean;
}
const leftNav = [
    {
        path: '/nav',
        name: '首页',
        icon: icons.home,
    },
];
const rightNav = [
    // {
    //   path: '/search',
    //   name: '搜索',
    //   icon: icons.search,
    // },
    // {
    //   path: '/tool/sessions_hycl',
    //   name: '服务工具',
    //   icon: icons.tool,
    // },
    {
        path: window.base_admin,
        name: '设置',
        admin: true,
        icon: icons.set,
    },
    {
        path: '/loginout',
        name: '退出',
        icon: icons.out,
    },
];
const Nav = (props: Props) => {
    const navigate = useNavigate();
    const [time, setTime] = useState(new Date().getTime());
    const [visible, setVisible] = useState(false);
    const fns = {
        go(item: any) {
            if (item.path === '/search') {
                setVisible(!visible);
                return;
            }
            if (item?.admin) {
                const token = sessionStorage.getItem('smart_token') ?? '';

                window.location.href = `${item.path}?smart_token=${token}`;
                return;
            }
            navigate(item.path);
        },
        handleSearchGo(url: string) {
            navigate(url);
        },
    };
    useEffect(() => {
        const timer = setInterval(() => {
            console.log('进入定时器');
            setTime(new Date().getTime());
        }, 1e3);
        return () => {
            console.log('清除定时器');
            clearInterval(timer);
        };
    }, []);

    return (
        <div className={styles['constainer']}>
            <div className={styles['right']}>
                <>
                    {props.hasLeft && (
                        <>
                            {leftNav.map((item) => (
                                <div className={styles['nav']} key={item.path} onClick={() => fns.go(item)}>
                                    <img src={item.icon} alt="" />
                                    <span>{item.name}</span>
                                </div>
                            ))}
                        </>
                    )}
                </>
                <div className={styles['nav']}>
                    <img src={icons.time} alt="" />
                    <span>{dayjs(time).format('YYYY-MM-DD HH:mm:ss')}</span>
                </div>
            </div>
            <div className={styles['right']}>
                {rightNav.map((item) => (
                    <div className={styles['nav']} key={item.path} onClick={() => fns.go(item)}>
                        <img src={item.icon} alt="" />
                        <span>{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Nav;
