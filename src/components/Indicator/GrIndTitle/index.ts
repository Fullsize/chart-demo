/*
 * @Author: sungy
 * @Date: 2023-09-15 16:10:40
 * @LastEditors: sungy
 * @LastEditTime: 2024-06-25 16:23:18
 * @Description: 组合指标内容
 */
export interface IIndTitleProps {
    title: React.ReactNode;
    children?: React.ReactNode;
    descCode?: string;
    [x: string]: any;
}
export interface IFlaIndTitleProps {
    title: React.ReactNode;
    titleChildren?: React.ReactNode;
    children?: React.ReactNode;
    titleStyle?: React.CSSProperties;
    childrenStyle?: React.CSSProperties;
    style?: React.CSSProperties;
    descCode?: string;
    [x: string]: any;
}

export * from './GrIndTitle';
export * from './GrIndTitle6';
export * from './GrIndTitle7';
export * from './GrIndTitle8';
export * from './GrIndTitle9';
export * from './GrIndTitle10';
export * from './GrIndTitle11';
export * from './GrIndTitle12';
export * from './GrIndTitle13';
export * from './GrIndTitle14';
export * from './GrIndTitle15';
export * from './GrIndTitle16';
export * from './GrIndTitle17';
export * from './GrIndTitle18';
export * from './IndSourceProvider';
export * from './IndSource';
// 处理标题增加Echars工具类
import { withTitleChildrenTools,withTitleIndSource } from './WithTitleTools';
import { FlaIndTitle6Bg, FlaIndTitle6 } from './GrIndTitle6';
import { FlaIndTitle7 } from './GrIndTitle7';
import { FlaIndTitle17 } from './GrIndTitle17';
import { FlaIndTitle18, FlaIndTitle17Bg } from "./GrIndTitle18";

const wFlaIndTitle6 = withTitleChildrenTools(FlaIndTitle6);
const wFlaIndTitle6Bg = withTitleChildrenTools(FlaIndTitle6Bg);
const wFlaIndTitle7 = withTitleChildrenTools(FlaIndTitle7);
const wFlaIndTitle18 = withTitleIndSource(withTitleChildrenTools(FlaIndTitle18));
const wFlaIndTitle17Bg = withTitleChildrenTools(FlaIndTitle17Bg);

const wFlaIndTitle17 = withTitleIndSource(FlaIndTitle17);
export { wFlaIndTitle6 as FlaIndTitle6, wFlaIndTitle6Bg as FlaIndTitle6Bg, wFlaIndTitle7 as FlaIndTitle7, wFlaIndTitle18 as FlaIndTitle18, wFlaIndTitle17Bg as FlaIndTitle17Bg, wFlaIndTitle17 as FlaIndTitle17 };
