/*
 * @Author: sungy
 * @Date: 2023-08-09 11:24:30
 * @LastEditors: sungy
 * @LastEditTime: 2023-12-04 11:46:15
 * @Description:企业预测
 */
import React from 'react';
import { ExFlc, ExFlr } from '../BaseEx';
import { TrIndCompaniesInfo, TrIndCardQyjc, TrIndCompaniesInfoYj } from '@/components/Indicator';

export default function P() {
    return (
        <>
            <ExFlr gap={50} flexWrap="nowrap">
                <ExFlc title="卡片指标类">
                    <TrIndCompaniesInfo
                        apiData={{
                            trTitle: '失信企业',
                            index_code_full_cname: '工监测企业',
                            val: 15522,
                            unit_name: '家',
                        }}
                    ></TrIndCompaniesInfo>
                    <TrIndCardQyjc
                        style={{ width: 400 }}
                        apiData={[
                            [
                                {
                                    trTitle: '规上企业',
                                    index_code_full_cname: '工业企业',
                                    val: 18,
                                    unit_name: '家',
                                },
                                {
                                    trTitle: '失信企业',
                                    index_code_full_cname: '服务业',
                                    val: 22,
                                    unit_name: '家',
                                },
                            ],
                            [
                                {
                                    trTitle: '规上企业',
                                    index_code_full_cname: '工业企业',
                                    val: 18,
                                    unit_name: '家',
                                },
                                {
                                    trTitle: '失信企业',
                                    index_code_full_cname: '服务业',
                                    val: 22,
                                    unit_name: '家',
                                },
                            ],
                        ]}
                    ></TrIndCardQyjc>
                    <TrIndCompaniesInfoYj
                        style={{ width: 400 }}
                        apiData={[
                            {
                                val: 50,
                                index_code_full_type_name: '期末值',
                                unit_name: '家',
                                index_full_code: 'F01ZB00410104LX0201',
                                index_code_full_cname: '共监测企业',
                                time_name: '202307',
                                type: 'bar',
                                index_code: 'ZB00410104',
                                group_code: 'F01',
                                trTitle: '异常企业',
                                indexCodeList: 'ZB00410104',
                                sumVal: 3925,
                            },
                        ]}
                    ></TrIndCompaniesInfoYj>
                </ExFlc>
            </ExFlr>
        </>
    );
}
