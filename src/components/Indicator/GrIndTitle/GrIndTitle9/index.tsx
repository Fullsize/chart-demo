/*
 * @Author: sungy
 * @Date: 2023-09-15 17:17:51
 * @LastEditors: sungy
 * @LastEditTime: 2024-04-28 15:47:19
 * @Description: 标题指标类
 */
import React from 'react';
import { F28, IIndTitleProps } from '@/components/Indicator';
import bg_url from './bg.png';

export const IndGrIndTitle9Bg = ({ children, ...props }: any) => {
    return (
        <div
            style={{
                ...props,
            }}
        >
            <div
                style={{
                    width: 218,
                    height: 132,
                    backgroundImage: `url(${bg_url})`,
                    backgroundRepeat: 'no-repeat',
                    boxSizing: 'border-box',
                    paddingTop: 75,
                }}
            >
                <div
                    style={{
                        textAlign: 'center',
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};
export const IndTitle9 = ({ title, ...props }: IIndTitleProps) => {
    return (
        <IndGrIndTitle9Bg {...props}>
            <F28 overflow="visible" color="#FFF">
                {title}
            </F28>
        </IndGrIndTitle9Bg>
    );
};
