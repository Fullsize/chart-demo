/*
 * @Author: sungy
 * @Date: 2023-09-15 18:18:51
 * @LastEditors: sungy
 * @LastEditTime: 2024-08-26 17:51:31
 * @Description: 标题指标类
 */
import React from 'react';
import { Flr, Flc, IIndTitleProps, IFlaIndTitleProps, F20, F18B, IndTitle17, SourceTooltipTitle} from '@/components/Indicator';

import icon from './icon.png';
import { Tooltip } from 'antd';

export const IndTitle18 = ({ title, children,indSource, ...props }: IIndTitleProps) => {
    return (
        <Flr {...props}>
            
            {title ? (
                <Flr justifyContent="normal" gap={0}>
                    <img src={icon} width="18px" />
                    <F20
                        lineHeight="26px"
                        textShadow="0 2px 3px #101715"
                        color="#fff"
                        paddingLeft="7px"
                        fontWeight="500"
                    >
                      {indSource?.ok ? <Tooltip placement="right" title={<SourceTooltipTitle apiData={indSource} fieldNames={{sourceName: 
                    "source_names"
                }}/>}>
                    <span>{title}</span>
                </Tooltip> : title}
                    </F20>
                </Flr>
            ) : (
                <></>
            )}
            {children && (
                <>
                    {children}
                </>
            )}
        </Flr>
    );
};

export const FlaIndTitle18: React.FC<IFlaIndTitleProps> = ({
    title,
    titleChildren,
    children,
    childrenStyle,
    noBg = false,
    indSource,
    ...props
}: any) => {
    return (
        <Flc
            gap={10}
            justifyContent="normal"
            overflow="hidden"
            width="100%"
            {...props}
            style={
                !noBg && {
                    padding: 18,
                    background:
                        'linear-gradient(140deg, rgba(86,111,141,0.3) 0%, rgba(48,62,85,0.3) 40%, rgba(31, 32, 38, 0.3) 100%)',
                    boxShadow: ' 0px 6px 6px 0px rgba(0,0,0,0.17)',
                    borderRadius: 12,
                    border: '1px solid rgba(64,82,114,0.7)',
                    boxSizing: 'border-box',
                    ...props.style,
                }
            }
        >
            {(title || titleChildren)&&<IndTitle18 title={title}  indSource={indSource}>{titleChildren}</IndTitle18>}
            <Flc width="100%" height="100%" overflow="hidden auto">
                <Flc flex={1} justifyContent="normal" gap={20} overflow="hidden" {...childrenStyle}>
                    {children}
                </Flc>
            </Flc>
        </Flc>
    );
};

export const FlaIndTitle17Bg = ({ title, titleChildren, children, childrenStyle, ...props }: IFlaIndTitleProps) => {
    return (
        <Flc gap={10} justifyContent="normal" overflow="hidden" width="100%" height="100%" {...props}>
            <IndTitle17 title={title}>{titleChildren}</IndTitle17>
            <Flc width="100%" flex={1} overflow="hidden">
                <Flc flex={1} justifyContent="normal" boxSizing="border-box" overflow="hidden">
                    <FlaIndTitle18 title="" style={{ width: '100%', height: '100%' }} childrenStyle={childrenStyle}>
                        {children}
                    </FlaIndTitle18>
                </Flc>
            </Flc>
        </Flc>
    );
};
