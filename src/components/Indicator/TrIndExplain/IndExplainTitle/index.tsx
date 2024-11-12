/*
 * @Author: sungy
 * @Date: 2023-09-15 17:17:51
 * @LastEditors: sungy
 * @LastEditTime: 2024-06-26 15:22:16
 * @Description: 标题指标类
 */
import React from 'react';
import { Flr } from '@/components/Indicator';

// 映射指标标题逻辑
const IndExplainTitle = ({ title, style }: { title: string; style?: React.CSSProperties }) => {
    return <Flr {...style}>{title}</Flr>;
};
export default IndExplainTitle;
