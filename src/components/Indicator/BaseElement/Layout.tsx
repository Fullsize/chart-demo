/*
 * @Author: sungy
 * @Date: 2023-08-19 17:56:25
 * @LastEditors: Fullsize
 * @LastEditTime: 2024-08-15 14:08:51
 * @Description: 指标元素
 */
import React, { ForwardedRef, forwardRef } from 'react';
import { cssBgStyle6 } from '../BaseCssStyle';

export type FlexLayoutType = {
    children?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    title?: string;
} & React.CSSProperties;

export const Flc = forwardRef<HTMLDivElement, FlexLayoutType>(
    ({ className, style, children, title, ...props }, ref) => {
        return (
            <div
                ref={ref}
                title={title}
                className={className}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    ...props,
                    ...style,
                }}
            >
                {children}
            </div>
        );
    },
);

Flc.displayName = 'Flc';

export const Flr = ({ className, style, children, title, ...props }: FlexLayoutType) => {
    return (
        <div
            className={className}
            title={title}
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                ...style,
                ...props,
            }}
        >
            {children}
        </div>
    );
};

export const FlcBg6 = ({ ...props }) => {
    return <Flc boxSizing="border-box" {...cssBgStyle6} {...props}></Flc>;
};
export const FlrBg6 = ({ ...props }) => {
    return <Flr boxSizing="border-box" {...cssBgStyle6} {...props}></Flr>;
};
