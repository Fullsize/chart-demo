import React from 'react';
import { Flc, F14 } from '@/components/Indicator';

type grNameValueType = {
    apiData: any;
    fieldNames?: any;
    [key: string]: any;
};

export const SourceTooltipTitle = ({ fieldNames = {}, apiData, ...style }: grNameValueType) => {
    const data = apiData?.data?.[0];
    const { time: timeKey = 'updated_by', sourceName: sourceNameKey = 'source_name' } = fieldNames;
    return (
        <Flc
            gap={15}
            style={{
                padding: 10,
                ...style,
            }}
        >
            <Flc>
                <F14>数据来源：</F14>
                <F14 color="rgb(0, 255, 255)">{data?.[sourceNameKey]}</F14>
            </Flc>

            <Flc>
                <F14>数据更新日期：</F14>
                <F14 color="rgb(0, 255, 255)">{data?.[timeKey]}</F14>
            </Flc>
        </Flc>
    );
};
