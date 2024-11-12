/*
 * @Author: zhipengHuang
 * @Date: 2024-07-30 18:41:30
 * @LastEditors: zhipengHuang
 * @LastEditTime: 2024-08-22 14:53:05
 * @Description:
 */
import React, { useEffect, useState } from 'react';
import { Flr, Flc, EmptyOrInd } from '@/components/Indicator';
import { EcharsAxis, EcharsAxisScale } from '@/components/BaseEchars';
import { EcDatePicker } from '@/components/BaseAntd';
import type { PresetType } from '@/components/BaseAntd';
import Empty from '@/components/Empty';

import { useEcApiPost } from '@/service';
import { Tooltip } from 'antd';

type grNameValueType = {
    indexData: any;
    indexFullCodeList: any;
    fieldNames?: any;
    presetType?: PresetType;
    requestParams?: any;
    renderSearch?: React.ReactNode;
    [key: string]: any;
};

export const DialogChildren3 = ({
    indexData = {},
    fieldNames = {},
    indexFullCodeList,
    presetType,
    renderSearch,
    requestParams,
    ...style
}: grNameValueType) => {
    const {
        code: codeKey = 'index_full_code',
        timeFreq: timeFreqKey = 'time_freq',
        regionCode: regionCodeKey = 'region_code',
    } = fieldNames;
    const [resTime, getTime] = useEcApiPost('/api/v4/attr/query/list');
    useEffect(() => {
        if (indexData?.[codeKey] && indexData?.[timeFreqKey] && indexData?.[regionCodeKey]) {
            getTime({
                dataId: 'eco_sxsjj_time_range',
                tbType: 1, // 1-宏观经济类型，2-人口规模，3-人口流动，4-就业，5-商圈，6-园区(聚集区)，7-园区(周)，8-景区
                businessName: '140000_sxsjj', // 系统变量
                timeType: indexData?.[timeFreqKey], //  4-年度，5-季度，6-月度，
                indexFullCodeList: indexData?.[codeKey],
                regionCode: indexData?.[regionCodeKey],
            });
        }
    }, [indexData?.[codeKey], indexData?.[timeFreqKey], indexData?.[regionCodeKey]]);

    const [timeCode, setTimeCode] = useState<any>(null);
    const [resChart, getChart] = useEcApiPost('/api/v4/query/timeTrendChart');

    useEffect(() => {
        if (timeCode || requestParams?.timeCode) {
            // // 由于后台返回结果是柱状图，通过该逻辑改为折线图表示
            const startTimeCode = timeCode?.[0];
            const endTimeCode = timeCode?.[1];
            getChart({
                businessName: '140000_sxsjj',
                regionCodeList: indexData?.[regionCodeKey],
                startTimeCode: startTimeCode,
                timeCode: endTimeCode,
                timeLength: indexData?.[timeFreqKey], //指标卡返回的time_freq
                indexFullCodeList: indexFullCodeList, //根据指标卡联动
                // timeLimit: 12,
                history: 2,
                ...requestParams,
            });
        }
    }, [timeCode, requestParams]);

    const getEndLength = () => {
        const length = resChart?.data?.length;
        const indexFullCodeArr = indexFullCodeList.split(',');
        let indexCodeLength = indexFullCodeArr.length;
        if (indexFullCodeArr[indexFullCodeArr.length - 1] == '') {
            indexCodeLength = indexCodeLength - 1;
        }
        const defaultLength = 12;
        const end =
            length / indexCodeLength < defaultLength
                ? 100
                : Math.floor((defaultLength / (length / indexCodeLength)) * 100);
        return end;
    };
    const end = getEndLength();
    console.log(resChart, 'resChart');
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
            {resTime?.data ? (
                <>
                    <Flr justifyContent="right" gap={10}>
                        {/* {renderSearch} */}
                        {/* <EcDatePicker apiData={resTime} onChange={setTimeCode} presetType={presetType} /> */}
                    </Flr>
                    <Flr height="20px" width={'100%'} position="absolute" top="30px">
                        <Tooltip
                            trigger="hover"
                            overlayStyle={{
                                width: 800, // 你可以调整这个值来改变 Tooltip 的宽度
                                maxWidth: '800px',
                            }}
                            placement="bottom"
                            title={
                                <>
                                    <div>
                                        指标口径说明：全省动力煤最低现价是晋城、忻州、大同、朔州4个市场动力煤最低价的平均值。{' '}
                                    </div>
                                    <div>
                                        晋城市场动力煤现价行情计算基础和过程：价格信息采集点数量4个，样本量2个，成交量3万吨，价格范围560-580元/吨，平均值570元/吨，成交数据占比100%，无离群值，无主观判断。
                                    </div>
                                    <div>
                                        忻州市场动力煤现价行情计算基础和过程：价格信息采集点数量4个，样本量4个，成交量1.2万吨，价格范围530-541元/吨，平均值535元/吨，成交数据占比100%，无离群值，无主观判断。
                                    </div>
                                    <div>
                                        大同市场动力煤现价行情计算基础和过程：价格信息采集点数量13个，样本量6个，成交量21.3万吨，价格范围570-622元/吨，平均值610元/吨，成交数据占比100%，无离群值，无主观判断。
                                    </div>
                                    <div>
                                        朔州市场动力煤现价行情计算基础和过程：价格信息采集点数量4个，样本量4个，成交量1.5万吨，价格范围582-631元/吨，平均值600元/吨，无主观判成交数据占比100%，无离群值。
                                    </div>
                                </>
                            }
                        >
                            <span style={{ fontWeight: 'bold', cursor: 'pointer', fontSize: '24px' }}>
                                指标口径说明
                            </span>
                        </Tooltip>
                    </Flr>
                    <Flr flex={1} width={'100%'}>
                        <EcharsAxis
                            resApi={resChart}
                            data_deconstruction={{
                                category: 'region_name',
                                measure: 'index_code_cname',
                            }}
                        ></EcharsAxis>
                    </Flr>
                </>
            ) : (
                <Empty />
            )}
        </Flc>
    );
};
