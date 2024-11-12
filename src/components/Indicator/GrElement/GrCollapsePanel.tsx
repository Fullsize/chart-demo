import React, { useEffect, useState } from 'react';
import { RightOutlined } from '@ant-design/icons';
import { Flc, Flr } from '../BaseElement';

export function GrCollapsePanel({ header, collapsed = true, onCollapsedChange, ...props }: any) {
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
        <>
            <Flc {...props}>
                <div style={{ cursor: 'pointer', userSelect: 'none' }} onClick={toggleCollapse}>
                    <Flr
                        color={isCollapsed ? 'unset' : '#67BCFF'}
                        justifyContent="flex-start"
                        padding={10}
                        background="linear-gradient(90deg, rgba(21,77,160,0.12) 0%, rgba(21,77,160,0) 100%), linear-gradient(270deg, rgba(21,77,160,0) 0%, rgba(21,119,179,0.12) 18%, rgba(21,132,185,0.26) 100%)"
                    >
                        <RightOutlined
                            style={{
                                transform: isCollapsed ? 'rotate(0deg)' : 'rotate(90deg)',
                                transition: '0.25s',
                            }}
                        />

                        <Flr marginLeft={8}>{header}</Flr>
                    </Flr>
                </div>
            </Flc>
            <Flc transition="0.25s" display={isCollapsed ? 'none' : 'flex'}>
                {!isCollapsed && props.children}
            </Flc>
        </>
    );
}
