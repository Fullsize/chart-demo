/*
 * @Author: sungy
 * @Date: 2023-11-23 10:55:43
 * @LastEditors: sungy
 * @LastEditTime: 2024-01-10 10:02:03
 * @Description: 页面入口文件
 */

import React from 'react';
import { Flc } from '@/components/Indicator';

export default function Resize({ children }: any) {
    return (
        <Flc
            position="relative"
            transformOrigin="left top"
            width="100vw"
            maxWidth="100vw"
            minWidth="1450px"
            maxHeight="100vh"
            height="100Vh"
            overflow="auto"
        >
            {children}
        </Flc>
    );
}
