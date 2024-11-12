/*
 * @Author: zhipengHuang
 * @Date: 2024-07-30 18:41:30
 * @LastEditors: zhipengHuang
 * @LastEditTime: 2024-08-12 18:34:17
 * @Description:
 */
import React, { useEffect, useState } from 'react';
import { Flr, Flc } from '@/components/Indicator';
import { EcharsAxisScale } from '@/components/BaseEchars';
import { EcDatePicker } from '@/components/BaseAntd';
import type { PresetType } from '@/components/BaseAntd';

import { useEcApiPost } from '@/service';

type grNameValueType = {
    indexData: any;
    indexFullCodeList: any;
    fieldNames?: any;
    presetType?: PresetType;
    requestParams?: any;
    [key: string]: any;
};

export const DialogChildren = ({
    indexData = {},
    fieldNames = {},
    indexFullCodeList,
    presetType,
    requestParams = {},
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
                indexFullCodeList: "F01ZB0043015204LX0101" === indexData?.[codeKey] ? "F01ZB0043015204LX0101,F01ZB0043015205LX0101,F01ZB0043015206LX0101,F01ZB0043015207LX0101":indexData?.[codeKey],
                regionCode: indexData?.[regionCodeKey],
            });
        }
    }, [indexData?.[codeKey], indexData?.[timeFreqKey], indexData?.[regionCodeKey]]);

    const [timeCode, setTimeCode] = useState<any>(null);
    const [resChart, getChart] = useEcApiPost('/api/v4/query/timeTrendChart');
    useEffect(() => {
        if (timeCode) {
            let replaceChart = "";
            if(indexFullCodeList === "F01ZB0043015204LX0101,") {
                replaceChart = "F01ZB0043015204LX0101&line,F01ZB0043015205LX0101&line,F01ZB0043015206LX0101&line,F01ZB0043015207LX0101&line"
            }
            if(indexFullCodeList === "F01ZB0043015203LX0101," || indexFullCodeList ===  "F01ZB0043015202LX0101," || indexFullCodeList === "F01ZB0043015201LX0101,") {
                replaceChart = "F01ZB0043015201LX0101&line,F01ZB0043015202LX0101&line,F01ZB0043015203LX0101&line"
            }
            getChart({
                businessName: '140000_sxsjj',
                regionCodeList: indexData?.[regionCodeKey],
                startTimeCode: timeCode?.[0],
                timeCode: timeCode?.[1],
                timeLength: indexData?.[timeFreqKey], //指标卡返回的time_freq
                indexFullCodeList: "F01ZB0043015204LX0101," === indexFullCodeList ? "F01ZB0043015204LX0101,F01ZB0043015205LX0101,F01ZB0043015206LX0101,F01ZB0043015207LX0101":indexFullCodeList, //根据指标卡联动
                // timeLimit: 12,
                history: 2,
                replaceChart: replaceChart,
                ...requestParams,
            });
        }
    }, [timeCode]);
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
            <Flr justifyContent="right">
                <EcDatePicker apiData={resTime} onChange={setTimeCode} presetType={presetType} />
            </Flr>
            <Flr flex={1} width={'100%'}>
                <EcharsAxisScale
                    resApi={resChart}
                    data_deconstruction={{
                        measure: 'index_code_full_cname',
                    }}
                    option= {{dataZoom: [{
                        type: 'slider',
                        start: 0, // 起始比例
                        end: end,  // 结束比例
                        xAxisIndex: [0], // 绑定到第一个x轴
                        handleSize: '100%', // 拖动手柄的大小
                        height: 20, // 滑动条的高度
                        bottom: '10px', // 滑动条位置
                        textStyle: {
                            color: '#fff' // 设置提示文字颜色为蓝色
                        }
                    }],
                    grid: {
                        bottom: 30,
                    },}}
                ></EcharsAxisScale>
            </Flr>
        </Flc>
    );
};
