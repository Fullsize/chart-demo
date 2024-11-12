/*
 * @Author: sungy
 * @Date: 2023-08-09 11:24:30
 * @LastEditors: sungy
 * @LastEditTime: 2024-04-28 16:25:51
 * @Description:企业预测
 */
import React from 'react';
import { Flr } from '@/components/Indicator';
import HgCard from './HgCard';
import BaseElement from './BaseElement';

export default function P() {
    return (
        <Flr alignItems="flex-start">
            <BaseElement></BaseElement>
            <HgCard></HgCard>
        </Flr>
    );
}
