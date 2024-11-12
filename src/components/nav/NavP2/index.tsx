/*
 * @Author: sungy
 * @Date: 2023-09-07 10:13:12
 * @LastEditors: zhipengHuang
 * @LastEditTime: 2024-08-15 10:10:38
 * @Description:
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Flr, F18 } from '@/components/Indicator';
import styles from './index.module.css';
import { GrIndTabSelect } from '@/components/Indicator';
import nav2_bg from './nav2_bg.png';
import nav2_active from './nav2_active.png';

export const SplitLine = () => {
    return (
        <div
            style={{
                height: 16,
                width: 1,
                backgroundColor: '#d4d4d4',
                opacity: 0.2,
            }}
        ></div>
    );
};

const activeBgStyle = {
    backgroundImage: `url(${nav2_active})`,
    backgroundSize: '130% 88%',
    padding: 10,
    backgroundPosition: 'center 0px',
    backgroundRepeat: 'no-repeat',
};

export default function NavP2({ active, path, before, after }: any) {
    const navigate = useNavigate();
    return Array.isArray(path?.children) ? (
        <Flr
            className={styles['nav-p2-bg']}
            justifyContent="center"
            gap={6}
            marginBottom={10}
            backgroundImage={`url(${nav2_bg})`}
        >
            {before}
            {path?.children?.map((item: any, i: number) => {
                const isCollapse = item.collapseChildren;
                const isActive = active?.[0]?.path == item.path;
                const textElement = isActive ? (
                    <F18 color="#fff" backgroundImage={`url(${nav2_active})`} textShadow="0 2px 3px #101715">
                        {item?.name}
                    </F18>
                ) : (
                    <F18 color="#D4D4D4" textShadow="0 2px 3px #101715">
                        {item?.name}
                    </F18>
                );

                return (
                    <React.Fragment key={item.path}>
                        {isCollapse ? (
                            <GrIndTabSelect
                                style={
                                    isActive
                                        ? {
                                            color: '#fff',
                                            textShadow: '0 2px 3px #101715',
                                            ...activeBgStyle,
                                        }
                                        : { color: '#A9B1C0', padding: 10 }
                                }
                                data={item?.children}
                                data_deconstruction={{
                                    label: 'name',
                                    value: 'path',
                                }}
                                active={active?.[1]?.path}
                                onChange={(v: any) => {
                                    navigate(path.parentPath + item.path + v);
                                }}
                            >
                                <F18  letterSpacing={"2px"} color={isActive ? "#fff" : "rgb(212, 212, 212)"}>{item?.name}</F18>
                            </GrIndTabSelect>
                        ) : (
                            <div
                                style={{
                                    cursor: 'pointer',
                                    padding: 10,
                                    letterSpacing: '2px',
                                    ...(isActive && activeBgStyle),
                                }}
                                onClick={() => {
                                    navigate(path.parentPath + item.path);
                                }}
                            >
                                {textElement}
                            </div>
                        )}
                        {i != path?.children.length - 1 && !before && <SplitLine />}
                    </React.Fragment>
                );
            })}
            {after}
        </Flr>
    ) : (
        <></>
    );
}
