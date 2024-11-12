/*
 * @Author: sungy
 * @Date: 2023-09-15 16:10:40
 * @LastEditors: sungy
 * @LastEditTime: 2024-04-28 15:01:20
 * @Description: 组合指标内容
 */
import React from 'react';
export * from './GrValUnit';
export * from './GrZs';
export * from './GrPm';
export interface IGrValueUnitProps {
    value: any;
    unit?: string;
    lastCompare?: string;
    [x: string]: any;
}
