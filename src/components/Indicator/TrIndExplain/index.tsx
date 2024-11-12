/*
 * @Author: sungy
 * @Date: 2023-09-15 17:17:51
 * @LastEditors: sungy
 * @LastEditTime: 2024-06-27 10:07:40
 * @Description: 标题指标类
 */
import React from 'react';
import { Flr, GrIndDialog } from '@/components/Indicator';
import IndExplainTitle from './IndExplainTitle';

const IndExplainCode = ({ desCode, title, style }: { desCode: string; title?: any; style?: React.CSSProperties }) => {
    if (title) {
        return (
            <Flr gap={5} {...style}>
                {title}
                <GrIndDialog desCode={desCode}></GrIndDialog>
            </Flr>
        );
    } else {
        return <GrIndDialog iconStyle={{ ...style }} desCode={desCode}></GrIndDialog>;
    }
};

export const TrIndExplain = ({
    title,
    desCode,
    style,
}: {
    title?: any;
    desCode?: string;
    style?: React.CSSProperties;
}) => {
    if (desCode) {
        return <IndExplainCode desCode={desCode} title={title} style={style}></IndExplainCode>;
    } else if (title) {
        return <IndExplainTitle title={title} style={style}></IndExplainTitle>;
    }
    return <></>;
};
