/*
 * @Author: zhipengHuang
 * @Date: 2024-08-05 10:21:07
 * @LastEditors: zhipengHuang
 * @LastEditTime: 2024-08-12 18:34:26
 * @Description:
 */
import React, { useEffect, useState } from 'react';
import { Flr, Flc } from '@/components/Indicator';
import { EcharsAxis } from '@/components/BaseEchars';
import { EcDatePicker } from '@/components/BaseAntd';
import type { PresetType } from '@/components/BaseAntd';

import { useEcApiPost } from '@/service';

type grNameValueType = {
    indexData: any;
    indexFullCodeList: any;
    fieldNames?: any;
    presetType?: PresetType;
    [key: string]: any;
};

export const DialogChildren = ({
    indexData = {},
    fieldNames = {},
    indexFullCodeList,
    presetType,
    ...style
}: grNameValueType) => {
    const {
        code: codeKey = 'index_full_code',
        timeFreq: timeFreqKey = 'time_freq',
        regionCode: regionCodeKey = 'region_code',
    } = fieldNames;

    const [resTime, getTime] = useEcApiPost('/api/v4/attr/query/list');
    useEffect(() => {
        //TODO 目前返回的时间没有数据 if (indexData?.[codeKey] && indexData?.[timeFreqKey] && indexData?.[regionCodeKey]) {
        if (indexData?.[codeKey] && indexData?.[regionCodeKey]) {
            getTime({
                dataId: 'eco_common_time_list_v2',
                tbType: 1, // 1-宏观经济类型，2-人口规模，3-人口流动，4-就业，5-商圈，6-园区(聚集区)，7-园区(周)，8-景区
                businessName: '140000_sxsjj', // 系统变量
                //TODO目前返回的时间没数据 下面暂时写死 timeType: indexData?.[timeFreqKey], //  4-年度，5-季度，6-月度，
                timeType: 6, //  4-年度，5-季度，6-月度，
                indexFullCodeList: indexData?.[codeKey],
                regionCode: indexData?.[regionCodeKey],
            });
        }
        // }, [indexData?.[codeKey], indexData?.[timeFreqKey], indexData?.[regionCodeKey]]);
    }, [indexData?.[codeKey], indexData?.[regionCodeKey]]);

    const [timeCode, setTimeCode] = useState<any>(null);
    const [resChart, getChart] = useEcApiPost('/api/v4/query/timeTrendChart');
    useEffect(() => {
        if (timeCode) {
            getChart({
                businessName: '140000_sxsjj',
                regionCodeList: indexData?.[regionCodeKey],
                timeCode: timeCode?.[1],
                timeLength: indexData?.[timeFreqKey],
                groupCodeList: indexData?.group_code, //对应指标卡联动
                indexCodeList: indexData?.index_code, //对应指标卡联动
                typeCodeList: indexData?.type_code, //对应指标卡联动
                timeLimit: 12,
                history: 2,
            });
        }
    }, [timeCode]);

    return (
        <Flc
            gap={14}
            style={{
                width: '100%',
                height: '100%',
                boxSizing: 'border-box',
                ...style,
            }}
        >
            <Flr justifyContent="right">
                <EcDatePicker apiData={resTime} onChange={setTimeCode} presetType={presetType} />
            </Flr>
            <Flr flex={1} width={'100%'}>
                <EcharsAxis
                    resApi={resChart}
                    data_deconstruction={{
                        measure: 'index_code_full_cname',
                    }}
                ></EcharsAxis>
            </Flr>
        </Flc>
    );
};
