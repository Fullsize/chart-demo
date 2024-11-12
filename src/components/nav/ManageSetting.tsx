/*
 * @Author: sungy
 * @Date: 2023-09-14 11:07:00
 * @LastEditors: sungy
 * @LastEditTime: 2024-07-03 10:47:28
 * @Description: 退出登录
 */

import React from 'react';
import { getToken } from '@/service/request';
import { F16, Flr } from '../Indicator';
import icon_set from '@images/icons/set.png';

export default function UserInfo() {
    return (
        <div
            onClick={() => {
                const w: any = window;
                window.location.href = w.baseadmin + `?smart_token=${getToken()}`;
            }}
        >
            <Flr gap={5} style={{ cursor: 'pointer', paddingLeft: 24, position: 'relative' }}>
                <img
                    src={icon_set}
                    style={{
                        position: 'absolute',
                        left: 0,
                        top: -5,
                    }}
                />
                <F16>设置</F16>
            </Flr>
        </div>
    );
}
