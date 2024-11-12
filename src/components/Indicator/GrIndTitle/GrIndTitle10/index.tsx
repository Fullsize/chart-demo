/*
 * @Author: sungy
 * @Date: 2023-09-15 17:17:51
 * @LastEditors: sungy
 * @LastEditTime: 2024-05-20 11:08:24
 * @Description: 标题指标类
 */
import React from 'react';
import { Flr, Flc, IIndTitleProps, IFlaIndTitleProps, IndCssLgText4 } from '@/components/Indicator';
import icoUrl from './icon.png';
import dialogBgUrl from './dialog-bg.png';
import indBgUrl from './ind-bg.png';

export const IndTitle10 = ({ title, children, ...props }: IIndTitleProps) => {
    return (
        <Flr position="relative" {...props} justifyContent={'center'}>
            <Flr marginTop={20}>
                <img src={icoUrl} width={36} height={36} alt=""></img>
                <IndCssLgText4 fontSize="22px">{title}</IndCssLgText4>
            </Flr>
            <Flr position="absolute" right={70} top={30}>
                {children}
            </Flr>
        </Flr>
    );
};

const FlaIndTitle10: React.FC<IFlaIndTitleProps> = ({
    title,
    titleChildren,
    titleStyle,
    children,
    childrenStyle,
    ...props
}) => {
    return (
        <Flc gap={10} justifyContent="normal" overflow="hidden" width="100%" backgroundSize="100% 100%" {...props}>
            {
                <IndTitle10 title={title} {...titleStyle}>
                    {titleChildren}
                </IndTitle10>
            }
            <Flc width="100%" flex={1} overflow="hidden">
                <Flc flex={1} margin="20px 30px 40px" justifyContent="normal" {...childrenStyle}>
                    {children}
                </Flc>
            </Flc>
        </Flc>
    );
};

export const FlaIndTitle10Dialog: React.FC<IFlaIndTitleProps> = ({ ...props }) => {
    return (
        <FlaIndTitle10
            titleStyle={{ marginTop: 10 }}
            backgroundImage={`url(${dialogBgUrl})`}
            width={816}
            height={512}
            {...props}
        ></FlaIndTitle10>
    );
};

export const FlaIndTitle10Ind: React.FC<IFlaIndTitleProps> = ({ ...props }) => {
    return (
        <FlaIndTitle10
            titleStyle={{ marginTop: 15 }}
            backgroundImage={`url(${indBgUrl})`}
            width={590}
            height={590}
            {...props}
        ></FlaIndTitle10>
    );
};
