/*
 * @Author: zhipengHuang
 * @Date: 2024-07-30 18:41:30
 * @LastEditors: zhipengHuang
 * @LastEditTime: 2024-08-22 14:53:05
 * @Description:
 */
import React, { useEffect, useState } from 'react';
import { Flr, Flc, EmptyOrInd } from '@/components/Indicator';
import { EcharsAxisScale } from '@/components/BaseEchars';
import { EcDatePicker } from '@/components/BaseAntd';
import type { PresetType } from '@/components/BaseAntd';
import Empty from '@/components/Empty';

import { useEcApiPost } from '@/service';

type grNameValueType = {
    indexData: any;
    indexFullCodeList: any;
    fieldNames?: any;
    presetType?: PresetType;
    requestParams?: any;
    renderSearch?: React.ReactNode;
    data_deconstruction?: any;
    [key: string]: any;
};

export const DialogChildren = ({
    indexData = {},
    fieldNames = {},
    indexFullCodeList,
    presetType,
    renderSearch,
    data_deconstruction = {
        measure: 'region_name',
    },
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
        if (timeCode) {
            // // 由于后台返回结果是柱状图，通过该逻辑改为折线图表示
            const replaceChart =
                indexFullCodeList === 'F01ZB00430150LX0101,' || indexFullCodeList === 'F01ZB00430151LX0101,'
                    ? `${indexFullCodeList.slice(0, indexFullCodeList.length - 1)}&line`
                    : '';
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
                replaceChart: replaceChart,
                ...requestParams,
            });
        }
    }, [timeCode, requestParams]);

    const getEndLength = () => {
        const length = resChart?.data?.length;
        const indexFullCodeArr = indexFullCodeList.split(",");
        let indexCodeLength = indexFullCodeArr.length;
        if(indexFullCodeArr[indexFullCodeArr.length - 1] == "") {
            indexCodeLength = indexCodeLength-1
        }
        const defaultLength = 12; 
        const end = (length / indexCodeLength ) < defaultLength  ? 100 : Math.floor(defaultLength / (length / indexCodeLength)  * 100 );
        return end;
    }
    const end = getEndLength();
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
                        {renderSearch}
                        <EcDatePicker apiData={resTime} onChange={setTimeCode} presetType={presetType} />
                    </Flr>
                    <Flr flex={1} width={'100%'}>
                        <EcharsAxisScale
                            resApi={resChart}
                            data_deconstruction={data_deconstruction}
                            option= {{
                                dataZoom: [{
                                type: 'slider',
                                start: 0, // 起始比例
                                end: end,  // 结束比例
                                xAxisIndex: [0], // 绑定到第一个x轴
                                handleSize: '100%', // 拖动手柄的大小
                                height: 20, // 滑动条的高度
                                bottom: '10px', // 滑动条位置
                                textStyle: {
                                    color: '#fff' // 设置提示文字颜色为蓝色
                                },
                                
                            }],
                            grid: {
                                bottom: 30,
                            },
                        }}
                        ></EcharsAxisScale>
                    </Flr>
                </>
            ) : (
                <Empty />
            )}
        </Flc>
    );
};
