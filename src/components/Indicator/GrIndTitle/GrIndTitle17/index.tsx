/*
 * @Author: sungy
 * @Date: 2023-09-15 17:17:51
 * @LastEditors: sungy
 * @LastEditTime: 2024-08-21 11:21:37
 * @Description: 标题指标类
 */
import React from 'react';
import { Flr, Flc, F22, IIndTitleProps, IFlaIndTitleProps, cssBgStyle6, SourceTooltipTitle } from '@/components/Indicator';
import bg from './bg_begin.png';
import bg0 from './bg0.png';
import bg1 from './bg1.png';
import { Tooltip } from 'antd';
function getTextWidth(text: any, font = '26px YouSheBiaoTiHei') {
    const canvas = document.createElement('canvas');
    const context: any = canvas.getContext('2d');
    context.font = font;
    const textmetrics = context.measureText(text);
    return textmetrics.width;
}

export const IndImgBg17 = ({ children, title = '', ...props }: any) => {
    const bgWidth = getTextWidth(title) + 40 < 200 ? 220 : getTextWidth(title) + 40;
    return (
        <div
            style={{
                height: 40,
                width: '100%',
                display: 'flex',
                position: 'relative',
                ...props,
            }}
        >
            <div
                style={{
                    width: 26,
                    backgroundImage: `url(${bg})`,
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat',
                    position: 'absolute',
                    top: '2px',
                    left: '3px',
                    height: '33px',
                }}
            ></div>
            <div
                style={{
                    height: 40,
                    width: bgWidth,
                    backgroundImage: `url(${bg0})`,
                    backgroundSize: '100% 46px',
                    backgroundPosition: '0px 10px',
                }}
            ></div>
            <div
                style={{
                    flex: 1,
                    height: '100%',
                    backgroundImage: `url(${bg1})`,
                    backgroundSize: '100% 12px',
                    backgroundRepeat: 'no-repeat',
                    backgroundPositionY: 18,
                }}
            ></div>
            <div
                style={{
                    position: 'absolute',
                    height: '100%',
                    width: '100%',
                    boxSizing: 'border-box',
                    padding: '0 0 0 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                {children}
            </div>
        </div>
    );
};
export const IndTitle17 = ({ title, children,indSource, ...props }: IIndTitleProps) => {
    return (
        <IndImgBg17 title={title} {...props}>
            <F22 marginLeft={10} overflow="visible" color="#00FFFF" transform="translateY(-4px)" fontWeight="900">
                {indSource?.ok ? <Tooltip placement="right" title={<SourceTooltipTitle apiData={indSource} fieldNames={{sourceName: 
                    "source_names"
                }}/>}>
                    <span>{title}</span>
                </Tooltip> : title}
            </F22>
            <Flr marginRight={10} overflow="hidden" flex={1} flexDirection="row-reverse">
                {children}
            </Flr>
        </IndImgBg17>
    );
};
export const FlaIndTitle17 = ({ title, titleChildren, children, childrenStyle,indSource, ...props }: IFlaIndTitleProps) => {
    return (
        <Flc gap={10} justifyContent="normal" overflow="hidden" width="100%" {...props}>
            <IndTitle17 title={title} indSource={indSource}>{titleChildren}</IndTitle17>
            <Flc width="100%" flex={1} overflow="hidden">
                <Flc flex={1} justifyContent="normal" boxSizing="border-box" gap={20} {...childrenStyle}>
                    {children}
                </Flc>
            </Flc>
        </Flc>
    );
};

export const FlaIndTitle6Bg = ({ childrenStyle, ...props }: IFlaIndTitleProps) => {
    return (
        <FlaIndTitle17
            {...cssBgStyle6}
            {...props}
            childrenStyle={{ margin: '0px 20px 20px', ...childrenStyle }}
        ></FlaIndTitle17>
    );
};
