/*
 * @Author: sungy
 * @Date: 2023-09-15 17:17:51
 * @LastEditors: zhipengHuang
 * @LastEditTime: 2024-08-21 17:30:15
 * @Description: 标题指标类
 */
import React, { useEffect, useRef, useState } from 'react';
import { Flr, Flc, IndIconNumber2, IndProgress2, IndCssLgText6, F20, F16 } from '@/components/Indicator';
import { EmptyOrInd } from '../../BaseInd/EmptyOrInd';
import _ from 'lodash';

const defaultFieldNames = {
    name: 'name',
    val: 'val',
    unit: 'unit',
};
const calculateProgress = (values:any) => {
    const min = Math.min(...values);
    const max = Math.max(...values);
    
    // 归一化并映射到百分比
    const progress = values.map((value: any) => ((value - min) / (max - min)) * 100);
    return progress.map((p:any) => p.toFixed(2)); // 保留两位小数
  };
const GrIndRankListRender = ({
    apiData,
    fieldNames = {
        name: 'name',
        val: 'val',
        unit: 'unit',
    },
    configColors = ['#F6D991', '#B1C0EC', '#EA9D84'],
    textColor = ["#FEDE48", "#D9DDE9", "#F5BA9C"],
}: any) => {
    const [trData, setTrdata] = useState([]);
    useEffect(() => {
        if (apiData.ok && !apiData?.empty) {
            const data = apiData?.data ?? [];
            if (data?.empty) return;
            const { name: nameKey, val: valKey, unit: unitKey } = _.defaultsDeep(fieldNames, defaultFieldNames);
            
            const maxValue = Math.max(...data.map((item: any) => Math.abs(item[valKey])));
            const minValue = Math.min(...data.map((item: any) => Math.abs(item[valKey])))
            const length = data.length;
            const delta = (maxValue-minValue) / length;
            const minExtended = minValue - delta; // 扩展最小值
            const maxExtended = maxValue + delta; //扩展最大值
            const newData = data.map((item: any, i: number) => {
                const val = Number(item?.[valKey] ?? 0);
                let color = configColors?.[i] ?? '#AEFEEA';
                if (val < 0) {
                    color = 'rgb(113, 255, 94)';
                }
                
                return {
                    rank: i + 1,
                    name: item?.[nameKey],
                    val: item?.[valKey],
                    unit: item?.[unitKey],
                    percent: ((Math.abs(val) - minExtended) / (maxExtended-minExtended) * 100).toFixed(2),
                    color: color,
                };
            });
            setTrdata(newData);
        }
    }, [apiData.sign]);

    return (
        <>
            {trData.map((item: any, i: number) => {
                return (
                    <Flc key={i} gap={10}>
                        <Flr>
                            <Flr gap={5}>
                                <IndIconNumber2 number={item.rank} />
                                <F16 color={textColor[i] || "#fff"}>{item.name}</F16>
                            </Flr>
                            <Flr gap={5} height="100%" alignItems="flex-end">
                                <IndCssLgText6 color="#fff" fontSize={22} lineHeight={'22px'} fontWeight="bold" fontFamily="D-DIN">
                                    {item.val}
                                </IndCssLgText6>
                                <IndCssLgText6 color="#fff" fontSize={18} fontWeight="bold">
                                    {item.unit}
                                </IndCssLgText6>
                            </Flr>
                        </Flr>
                        <IndProgress2 percent={item.percent} color={item?.color} />
                    </Flc>
                );
            })}
        </>
    );
};

interface IGrIndRankListProps {
    apiData?: any;
    [p: string]: any;
}
export const GrIndRankList: React.FC<IGrIndRankListProps> = ({ apiData, ...props }) => {
    const contaninerRef = useRef<HTMLDivElement | null>(null);

    // 重置滚动条
    const scrollIntoView = () => {
        contaninerRef.current?.scrollTo(0, 0);
    };

    useEffect(() => {
        scrollIntoView();
    }, [apiData.sign]);

    return (
        <Flc
            ref={contaninerRef}
            gap={20}
            justifyContent="normal"
            overflow="auto"
            width="100%"
            height="100%"
            paddingRight={10}
            boxSizing="border-box"
            {...props}
        >
            <EmptyOrInd apiData={apiData}>
                {!apiData?.empty && <GrIndRankListRender apiData={apiData} {...props} />}
            </EmptyOrInd>
        </Flc>
    );
};
