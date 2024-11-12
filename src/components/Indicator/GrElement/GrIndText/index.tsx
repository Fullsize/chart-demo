/*
 * @Author: sungy
 * @Date: 2024-01-25 17:54:41
 * @LastEditors: sungy
 * @LastEditTime: 2024-06-24 17:04:51
 * @Description: 指标及图标结合使用
 */
import React from 'react';
import styles from './index.module.css';
import { F16, F30B, Flr } from '@/components/Indicator';
import iconUrl from './icon.png';

// 河北发改指标文字
export const GrIndText = ({ children, iconStyle, ...props }: any) => {
    return (
        <Flr color="rgba(0, 213, 255, 1)" alignItems="flex-start" gap={5} {...props}>
            <img src={iconUrl} style={{ marginTop: 5, ...iconStyle }} />
            <F16 fontWeight={500} whiteSpace="normal">
                {children}
            </F16>
        </Flr>
    );
};

export const GrIndTextHighlight = ({ children, ...props }: any) => {
    return (
        <F30B color="#FFF" padding="0 5px" fontFamily="D-DIN" {...props}>
            {children}
        </F30B>
    );
};

export const GrIndTextHtml = ({ children, iconStyle, ...props }: any) => {
    return (
        <Flr color="#FFF" alignItems="flex-start" gap={5} marginLeft={15} {...props}>
            {/* <img src={iconUrl} style={{ marginTop: 5, ...iconStyle }} /> */}
            <div className={styles['ind_text']} dangerouslySetInnerHTML={{ __html: children }} />
        </Flr>
    );
};

/**
 * copy from GrIndTextHtml
 * @param param0 GrIndTextHtml
 * @returns
 */
export const GrIndTextHtml_RE = ({ children, style }: { children: string; style?: React.CSSProperties }) => {
    return (
        <Flr
            alignItems="flex-start"
            style={{
                width: '100%',
                position: 'relative',
                boxShadow: 'inset 0px 0px 20px 4px rgba(53, 101, 199, 0.5)',
                border: '1px solid',
                borderImage: 'linear-gradient(46deg, rgba(0, 120, 255, 0.3), rgba(0, 120, 255, 0.4)) 1 1',
                boxSizing: 'border-box',
                ...style,
            }}
        >
            <div className={styles['ind_text_re']} dangerouslySetInnerHTML={{ __html: children }} />
            <div className={styles['corner']}></div>
        </Flr>
    );
};

export const GrIndTextHtml_RE2 = ({ children, style }: { children: any; style?: React.CSSProperties }) => {
    return (
        <Flr
            alignItems="flex-start"
            style={{
                width: '100%',
                position: 'relative',
                boxShadow: 'inset 0px 0px 20px 4px rgba(53, 101, 199, 0.5)',
                border: '1px solid',
                borderImage: 'linear-gradient(46deg, rgba(0, 120, 255, 0.3), rgba(0, 120, 255, 0.4)) 1 1',
                boxSizing: 'border-box',
                ...style,
            }}
        >
            <div className={styles['ind_text_re']}>{children}</div>
            <div className={styles['corner']}></div>
        </Flr>
    );
};
