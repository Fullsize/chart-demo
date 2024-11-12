/*
 * @Author: sungy
 * @Date: 2024-01-25 17:54:41
 * @LastEditors: sungy
 * @LastEditTime: 2024-03-26 14:50:59
 * @Description: 指标及图标结合使用
 */
import React from 'react';
import { Flc, Flr, TrIndCardHgjj5, FlaIndTitle3 } from '@/components/Indicator';
import { EcharsAxis } from '@/components/BaseEchars';

export const TrIndAxisCard1 = ({
    apiData,
    titleField,
    style,
    ...props
}: {
    apiData: any;
    style?: React.CSSProperties;
    titleField?: string;
    onChange?: any;
    [key: string]: any;
}) => {
    return (
        <Flc flex={'1 0 40%'} gap={20} height={400} {...style}>
            <TrIndCardHgjj5
                style={
                    props?.onChange
                        ? {}
                        : {
                            background: 'rgba(37, 75, 128, 0.3)',
                            borderRadius: 8,
                        }
                }
                titleField={titleField}
                apiData={apiData?.[0]}
                uniqueField={['index_full_code']}
                layout="horizontal"
                {...props}
            ></TrIndCardHgjj5>
            <EcharsAxis style={{ flex: 1 }} resApi={apiData?.[1]}></EcharsAxis>
        </Flc>
    );
};

export const TrHbIndAxis1 = ({
    title,
    titleChildren,
    titleField,
    apiData,
    style,
    childrenStyle,
    ...props
}: {
    title: any;
    titleField?: string;
    apiData: Array<any>;
    titleChildren?: any;
    style?: React.CSSProperties;
    childrenStyle?: React.CSSProperties;
    [key: string]: any;
}) => {
    return (
        <FlaIndTitle3 title={title} titleChildren={titleChildren} height={'100%'} flex="none" {...style}>
            <Flr gap={20} flex={1} flexWrap="wrap">
                {apiData?.map?.((itemArr: any, i: any) => {
                    return (
                        <TrIndAxisCard1
                            titleField={titleField}
                            key={i}
                            apiData={itemArr}
                            style={{ ...childrenStyle }}
                            {...props}
                        />
                    );
                })}
            </Flr>
        </FlaIndTitle3>
    );
};
