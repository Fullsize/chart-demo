/*
 * @Author: sungy
 * @Date: 2023-08-09 11:24:30
 * @LastEditors: sungy
 * @LastEditTime: 2024-06-26 15:19:13
 * @Description:企业预测
 */
import React from 'react';
import { ExFlc, ExFlr } from '../BaseEx';
import {
    GrComMaxDialog,
    GrIndDialog,
    TrHbfgIndCard1,
    TrHbfgIndCard1Arr,
    TrHbfgIndCard2,
    TrHbfgIndCard2Arr,
    TrHbfgIndCard3,
    TrHbfgIndCard3Arr,
    TrHbfgIndNameValue,
    TrHbfgIndNameValueList,
    TrIndExplain,
    TrSxCompareCard,
} from '@/components/Indicator';
import { useEcMock } from '@/service';
import { GrDialog } from '@/components/Indicator/GrMdDialog/GrDialog';

export default function P() {
    return (
        <ExFlc>
            <ExFlr title="弹窗类">
                <ExFlr title="指标弹窗">
                    <TrIndExplain desCode="F01ZB000401LX0301" />
                    <TrIndExplain title="地区生产总值"></TrIndExplain>
                    <TrIndExplain title="地区生产总值" desCode="F01ZB000401LX0301"></TrIndExplain>
                </ExFlr>
                <ExFlr title="普通弹窗">
                    <GrDialog title="测试弹窗" icon={'点击弹出'}>
                        我是内容
                    </GrDialog>
                </ExFlr>
                <ExFlr title="放大弹窗">
                    <GrComMaxDialog title="测试弹窗" children={<>1</>} icon={'放大'} scaleValue={1.35}></GrComMaxDialog>
                </ExFlr>
            </ExFlr>

            <ExFlr title="宏观通用指标卡" maxWidth={800}>
                <TrHbfgIndCard1
                    apiData={
                        useEcMock([
                            {
                                val: '5.2',
                                type_code: 'LX0303',
                                index_code_full_type_name: '累计增长',
                                unit_name: '%',
                                index_full_code: 'F01ZB000401LX0303',
                                index_code_full_cname: '地区生产总值_累计增长',
                                index_code_cname: '地区生产总值',
                                time_name: '2023.Q4',
                                type: 'line',
                                updated_by: '2024-04-11',
                                time_freq: '5',
                                index_code: 'ZB000401',
                                group_code: 'F01',
                                group_name: '全部',
                                region_name: '全国',
                                region_code: '100000',
                            },
                            {
                                val: '-3.7',
                                type_code: 'LX0303',
                                index_code_full_type_name: '累计增长',
                                unit_name: '%',
                                index_full_code: 'F01ZB000401LX0303',
                                index_code_full_cname: '国内生产总值累计同比增速',
                                index_code_cname: '地区生产总值',
                                time_name: '2023.Q4',
                                type: 'line',
                                updated_by: '2024-04-11',
                                time_freq: '5',
                                index_code: 'ZB000401',
                                group_code: 'F01',
                                group_name: '全部',
                                region_name: '全国',
                                region_code: '100000',
                            },
                        ])[0]
                    }
                ></TrHbfgIndCard1>
                <TrHbfgIndCard1
                    titleField="index_code_cname"
                    apiData={
                        useEcMock([
                            {
                                index_full_code1: 'F01ZB000401LX0301',
                                index_full_code2: 'F01ZB000401LX0303',
                                val2: '5.5',
                                val1: '43944',
                                index_code_full_cname1: '地区生产总值_累计值',
                                index_code_full_cname2: '地区生产总值_累计增长',
                                type_code2: 'LX0303',
                                region_code2: '130000',
                                region_code1: '130000',
                                index_code_full_type_name2: '累计增长',
                                region_name2: '河北省',
                                index_code_full_type_name1: '累计值',
                                type_code1: 'LX0301',
                                type2: 'line',
                                group_name1: '全部',
                                region_name1: '河北省',
                                group_name2: '全部',
                                type1: 'bar',
                                group_code2: 'F01',
                                group_code1: 'F01',
                                time_name1: '2023Q4',
                                unit_name2: '%',
                                time_name2: '2023Q4',
                                index_code_cname2: '地区生产总值',
                                index_code_cname1: '地区生产总值',
                                unit_name1: '亿元',
                                time_freq2: '5',
                                updated_by1: '2024-04-11',
                                updated_by2: '2024-04-11',
                                index_code: 'ZB000401',
                                time_freq1: '5',
                            },
                        ])[0]
                    }
                    uniqueField={'index_full_code1'}
                    selected={{ index_full_code1: 'F01ZB000401LX0301' }}
                    onChange={(v: any) => {
                        console.log('v', v);
                    }}
                ></TrHbfgIndCard1>

                <TrHbfgIndCard1
                    apiData={
                        useEcMock([
                            {
                                val: '40',
                                type_code: 'ZB',
                                index_code_full_type_name: '累计值',
                                unit_name: '%',
                                index_full_code: 'F0301&FCP080101ZB001202LX0301',
                                index_code_full_cname: '铁矿石原矿产量占全国比重',
                                index_code_cname: '铁矿石原矿产量占全国比重',
                                time_name: '202212',
                                type: 'bar',
                                updated_by: '2024-05-14',
                                time_freq: '6',
                                index_code: 'ZB001202',
                                group_code: 'F0301&FCP080101',
                                group_name: '铁矿石原矿',
                                region_name: '全国',
                                region_code: '100000',
                                compare_val: '96787.3',
                                compare_sub: '-56750.83',
                                compare_division: '41.4',
                                compare_level: '低',
                            },
                        ])[0]
                    }
                ></TrHbfgIndCard1>

                <TrHbfgIndCard1Arr
                    titleField="index_code_cname"
                    apiData={
                        useEcMock([
                            {
                                index_full_code1: 'F01ZB000401LX0301',
                                index_full_code2: 'F01ZB000401LX0303',
                                val2: '5.5',
                                val1: '43944',
                                index_code_full_cname1: '地区生产总值_累计值',
                                index_code_full_cname2: '地区生产总值_累计增长',
                                type_code2: 'LX0303',
                                region_code2: '130000',
                                region_code1: '130000',
                                index_code_full_type_name2: '累计增长',
                                region_name2: '河北省',
                                index_code_full_type_name1: '累计值',
                                type_code1: 'LX0301',
                                type2: 'line',
                                group_name1: '全部',
                                region_name1: '河北省',
                                group_name2: '全部',
                                type1: 'bar',
                                group_code2: 'F01',
                                group_code1: 'F01',
                                time_name1: '2023Q4',
                                unit_name2: '%',
                                time_name2: '2023Q4',
                                index_code_cname2: '地区生产总值',
                                index_code_cname1: '地区生产总值',
                                unit_name1: '亿元',
                                time_freq2: '5',
                                updated_by1: '2024-04-11',
                                updated_by2: '2024-04-11',
                                index_code: 'ZB000401',
                                time_freq1: '5',
                            },
                            {
                                index_full_code1: 'F01ZB000401LX0301',
                                index_full_code2: 'F01ZB000401LX0303',
                                val2: '12',
                                val1: '43944',
                                index_code_full_cname1: '地区生产总值_累计值',
                                index_code_full_cname2: '地区生产总值_累计增长',
                                type_code2: 'LX11010201',
                                region_code2: '130000',
                                region_code1: '130000',
                                index_code_full_type_name2: '累计值全国排名',
                                region_name2: '河北省',
                                index_code_full_type_name1: '累计值',
                                type_code1: 'LX0301',
                                type2: 'line',
                                group_name1: '全部',
                                region_name1: '河北省',
                                group_name2: '全部',
                                type1: 'bar',
                                group_code2: 'F01',
                                group_code1: 'F01',
                                time_name1: '2023Q4',
                                unit_name2: '%',
                                time_name2: '2023Q4',
                                index_code_cname2: '地区生产总值',
                                index_code_cname1: '地区生产总值',
                                unit_name1: '亿元',
                                time_freq2: '5',
                                updated_by1: '2024-04-11',
                                updated_by2: '2024-04-11',
                                index_code: 'ZB000401',
                                time_freq1: '5',
                            },
                            {
                                index_full_code1: 'F01ZB000401LX0301',
                                index_full_code2: 'F01ZB000401LX0303',
                                val2: '50.5',
                                val1: '43944',
                                index_code_full_cname1: '地区生产总值_累计值',
                                index_code_full_cname2: '地区生产总值_累计增长',
                                type_code2: 'ZB',
                                region_code2: '130000',
                                region_code1: '130000',
                                index_code_full_type_name2: '占比比重',
                                region_name2: '河北省',
                                index_code_full_type_name1: '累计值',
                                type_code1: 'LX0301',
                                type2: 'line',
                                group_name1: '全部',
                                region_name1: '河北省',
                                group_name2: '全部',
                                type1: 'bar',
                                group_code2: 'F01',
                                group_code1: 'F01',
                                time_name1: '2023Q4',
                                unit_name2: '%',
                                time_name2: '2023Q4',
                                index_code_cname2: '地区生产总值',
                                index_code_cname1: '地区生产总值',
                                unit_name1: '亿元',
                                time_freq2: '5',
                                updated_by1: '2024-04-11',
                                updated_by2: '2024-04-11',
                                index_code: 'ZB000401',
                                time_freq1: '5',
                            },
                        ])[0]
                    }
                ></TrHbfgIndCard1Arr>

                <TrHbfgIndCard2
                    titleField="index_code_cname"
                    apiData={
                        useEcMock([
                            {
                                index_full_code1: 'F01ZB000401LX0301',
                                val1: '43944',
                                index_code_full_cname1: '地区生产总值_累计值',
                                type_code2: 'LX11010201',
                                region_code2: '130000',
                                region_code1: '130000',
                                region_name2: '河北省',
                                index_code_full_type_name1: '累计值',
                                type_code1: 'LX0301',
                                type2: 'line',
                                group_name1: '全部',
                                region_name1: '河北省',
                                type1: 'bar',
                                group_code1: 'F01',
                                time_name1: '2023Q4',
                                index_code_cname1: '地区生产总值',
                                unit_name1: '亿元',
                                updated_by1: '2024-04-11',
                                index_code: 'ZB000401',
                                time_freq1: '5',
                            },
                        ])[0]
                    }
                ></TrHbfgIndCard2>

                <TrHbfgIndCard2Arr
                    titleField="index_code_full_cname"
                    apiData={
                        useEcMock([
                            {
                                index_full_code1: 'F01ZB000401LX0301',
                                val1: '1210',
                                index_code_full_cname1: '新建健走步道',
                                region_code1: '130000',
                                index_code_full_type_name1: '累计值',
                                type_code1: 'LX0301',
                                group_name1: '全部',
                                region_name1: '河北省',
                                type1: 'bar',
                                group_code1: 'F01',
                                time_name1: '2023Q4',
                                index_code_cname1: '地区生产总值',
                                unit_name1: '个',
                                updated_by1: '2024-04-11',
                                index_code: 'ZB000401',
                                time_freq1: '5',
                            },
                            {
                                index_full_code1: 'F01ZB000401LX0301',
                                val1: '2590',
                                index_code_full_cname1: '新建登山步道',
                                region_code1: '130000',
                                index_code_full_type_name1: '累计值',
                                type_code1: 'LX0301',
                                group_name1: '全部',
                                region_name1: '河北省',
                                type1: 'bar',
                                group_code1: 'F01',
                                time_name1: '2023Q4',
                                index_code_cname1: '地区生产总值',
                                unit_name1: '个',
                                updated_by1: '2024-04-11',
                                index_code: 'ZB000401',
                                time_freq1: '5',
                            },
                        ])[0]
                    }
                ></TrHbfgIndCard2Arr>

                <TrHbfgIndCard3
                    titleField="index_code_cname"
                    apiData={
                        useEcMock([
                            {
                                index_full_code1: 'F01ZB000401LX0301',
                                index_full_code2: 'F01ZB000401LX0303',
                                val2: '5.5',
                                val1: '43944',
                                index_code_full_cname1: '地区生产总值_累计值',
                                index_code_full_cname2: '地区生产总值_累计增长',
                                type_code2: 'LX0303',
                                region_code2: '130000',
                                region_code1: '130000',
                                index_code_full_type_name2: '累计增长',
                                region_name2: '河北省',
                                index_code_full_type_name1: '累计值',
                                type_code1: 'LX0301',
                                type2: 'line',
                                group_name1: '全部',
                                region_name1: '河北省',
                                group_name2: '全部',
                                type1: 'bar',
                                group_code2: 'F01',
                                group_code1: 'F01',
                                time_name1: '2023Q4',
                                unit_name2: '%',
                                time_name2: '2023Q4',
                                index_code_cname2: '地区生产总值',
                                index_code_cname1: '地区生产总值',
                                unit_name1: '亿元',
                                time_freq2: '5',
                                updated_by1: '2024-04-11',
                                updated_by2: '2024-04-11',
                                index_code: 'ZB000401',
                                time_freq1: '5',
                            },
                        ])[0]
                    }
                ></TrHbfgIndCard3>

                <TrHbfgIndCard3Arr
                    titleField="index_code_full_cname"
                    apiData={
                        useEcMock([
                            {
                                index_full_code1: 'F01ZB000401LX0301',
                                val1: '1210',
                                index_code_full_cname1: '新建健走步道',
                                region_code1: '130000',
                                index_code_full_type_name1: '累计值',
                                type_code1: 'LX0301',
                                group_name1: '全部',
                                region_name1: '河北省',
                                type1: 'bar',
                                group_code1: 'F01',
                                time_name1: '2023Q4',
                                index_code_cname1: '地区生产总值',
                                unit_name1: '个',
                                updated_by1: '2024-04-11',
                                index_code: 'ZB000401',
                                time_freq1: '5',
                            },
                            {
                                index_full_code1: 'F01ZB000401LX0301',
                                val1: '2590',
                                index_code_full_cname1: '新建登山步道',
                                region_code1: '130000',
                                index_code_full_type_name1: '累计值',
                                type_code1: 'LX0301',
                                group_name1: '全部',
                                region_name1: '河北省',
                                type1: 'bar',
                                group_code1: 'F01',
                                time_name1: '2023Q4',
                                index_code_cname1: '地区生产总值',
                                unit_name1: '个',
                                updated_by1: '2024-04-11',
                                index_code: 'ZB000401',
                                time_freq1: '5',
                            },
                        ])[0]
                    }
                ></TrHbfgIndCard3Arr>
            </ExFlr>
            <ExFlr title="宏观通用指标卡2" maxWidth={800}>
                <TrHbfgIndNameValue
                    apiData={
                        useEcMock([
                            {
                                index_full_code1: 'F01ZB000401LX0301',
                                index_full_code2: 'F01ZB000401LX0303',
                                val2: '5.5',
                                val1: '43944',
                                index_code_full_cname1: '地区生产总值_累计值',
                                index_code_full_cname2: '地区生产总值_累计增长',
                                type_code2: 'LX0303',
                                region_code2: '130000',
                                region_code1: '130000',
                                index_code_full_type_name2: '累计增长',
                                region_name2: '河北省',
                                index_code_full_type_name1: '累计值',
                                type_code1: 'LX0301',
                                type2: 'line',
                                group_name1: '全部',
                                region_name1: '河北省',
                                group_name2: '全部',
                                type1: 'bar',
                                group_code2: 'F01',
                                group_code1: 'F01',
                                time_name1: '2023Q4',
                                unit_name2: '%',
                                time_name2: '2023Q4',
                                index_code_cname2: '地区生产总值',
                                index_code_cname1: '地区生产总值',
                                unit_name1: '亿元',
                                time_freq2: '5',
                                updated_by1: '2024-04-11',
                                updated_by2: '2024-04-11',
                                index_code: 'ZB000401',
                                time_freq1: '5',
                            },
                        ])[0]
                    }
                    fieldNames={{
                        name: 'index_code_cname2',
                        val: 'val2',
                        unit: 'unit_name2',
                    }}
                ></TrHbfgIndNameValue>
                <TrHbfgIndNameValueList
                    apiData={
                        useEcMock([
                            {
                                index_code_cname: '烈士墓',
                                val: '2468',
                                unit_name: '座',
                            },
                            {
                                index_code_cname: '烈士骨灰堂',
                                val: '2468',
                                unit_name: '座',
                            },
                            {
                                index_code_cname: '历史英明墙',
                                val: '2468',
                                unit_name: '座',
                            },
                            {
                                index_code_cname: '纪念碑',
                                val: '2468',
                                unit_name: '座',
                            },
                            {
                                index_code_cname: '纪念祠堂',
                                val: '2468',
                                unit_name: '座',
                            },
                            {
                                index_code_cname: '纪念雕塑',
                                val: '2468',
                                unit_name: '座',
                            },
                            {
                                index_code_cname: '纪念广场',
                                val: '2468',
                                unit_name: '座',
                            },
                        ])[0]
                    }
                    fieldNames={{
                        name: 'index_code_cname',
                        unit: 'unit_name',
                    }}
                    style={{
                        width: 500,
                    }}
                    childrenStyle={{
                        width: 200,
                        marginBottom: 20,
                    }}
                ></TrHbfgIndNameValueList>
            </ExFlr>
        </ExFlc>
    );
}
