/*
 * @Author: zhipengHuang
 * @Date: 2024-07-18 15:32:07
 * @LastEditors: zhipengHuang
 * @LastEditTime: 2024-08-26 17:06:01
 * @Description:
 */
import React, { useEffect, useState } from 'react';
import { RightOutlined } from '@ant-design/icons';
import { Flc, Flr, F18 } from '../../BaseElement';
import bg_url from './bg.png';
import bg_url_ac from './bg_url_ac.png';

export function GrCollapsePanel2({ header, collapsed = true, onCollapsedChange, ...props }: any) {
    const [isCollapsed, setIsCollapsed] = useState(collapsed);

    useEffect(() => {
        setIsCollapsed(collapsed);
    }, [collapsed]);

    const toggleCollapse = () => {
        if (onCollapsedChange) {
            onCollapsedChange(!isCollapsed);
        } else {
            setIsCollapsed(!isCollapsed);
        }
    };

    return (
        <Flc
            style={{
                minWidth: 230,
                width: '100%',
            }}
            {...props}
        >
            <div style={{ cursor: 'pointer', userSelect: 'none', width: "100%" }} onClick={toggleCollapse}>
                <Flr
                    style={{
                        color: isCollapsed ? '#67BCFF ' : 'unset',
                        paddingLeft: 40,
                        paddingRight: 10,
                        height: 36,
                        backgroundImage: `url(${isCollapsed ? bg_url : bg_url_ac})`,
                        backgroundSize: '100% 100%',
                    }}
                >
                    <F18>{header}</F18>
                    <RightOutlined
                        style={{
                            transform: isCollapsed ? 'rotate(90deg)' : 'rotate(-90deg)',
                            transition: '0.25s',
                        }}
                    />
                </Flr>
            </div>
            <Flc transition="0.25s" display={isCollapsed ? 'none' : 'flex'}>
                {!isCollapsed && props.children}
            </Flc>
        </Flc>
    );
}
