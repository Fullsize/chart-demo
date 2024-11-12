/*
 * @Author: sungy
 * @Date: 2024-01-02 14:14:30
 * @LastEditors: sungy
 * @LastEditTime: 2024-06-13 15:42:25
 * @Description: Antd类示例入口
 */

import React from 'react';
import { Table } from 'antd';

const trData1 = [
    {
        key: '1',
        region_name: '全国总计',
        lv: 0,
        val1: 32,
        val2: 40,
        children: [
            {
                key: '2',
                region_name: '沿海合计',
                lv: 1,
                val1: 32,
                val2: 40,
                children: [
                    {
                        key: '3',
                        region_name: '辽宁',
                        lv: 2,
                        val1: 32,
                        val2: 40,
                        children: [
                            {
                                key: '4',
                                region_name: '大连',
                                lv: 3,
                                index: 0,
                                val1: 32,
                                val2: 40,
                            },
                            {
                                key: '42',
                                region_name: '营口',
                                lv: 3,
                                index: 1,
                                val1: 32,
                                val2: 40,
                            },
                        ],
                    },
                    {
                        key: '5',
                        region_name: '河北',
                        lv: 2,
                        val1: 32,
                        val2: 40,
                        children: [
                            {
                                key: '7',
                                region_name: '秦皇岛',
                                lv: 3,
                                index: 0,
                                val1: 32,
                                val2: 40,
                            },
                            {
                                key: '8',
                                region_name: '唐山',
                                lv: 3,
                                index: 1,
                                val1: 32,
                                val2: 40,
                            },
                            {
                                key: '9',
                                region_name: '黄骅',
                                lv: 3,
                                index: 2,
                                val1: 32,
                                val2: 40,
                            },
                        ],
                    },
                ],
            },
        ],
    },
];

const data = [
    {
        key: '1',
        region_name: '全国总计',
        lv: 0,
        val1: 32,
        val2: 40,
    },
    {
        key: '2',
        region_name: '沿海合计',
        lv: 1,
        val1: 32,
        val2: 40,
    },
    {
        key: '3',
        region_name: '辽宁',
        lv: 2,
        val1: 32,
        val2: 40,
    },
    {
        key: '4',
        region_name: '大连',
        lv: 3,
        val1: 32,
        val2: 40,
    },
    {
        key: '42',
        region_name: '营口',
        lv: 3,
        val1: 32,
        val2: 40,
    },
    {
        key: '5',
        region_name: '河北',
        lv: 2,
        val1: 32,
        val2: 40,
    },
    {
        key: '7',
        region_name: '秦皇岛',
        lv: 3,
        val1: 32,
        val2: 40,
    },
    {
        key: '8',
        region_name: '唐山',
        lv: 3,
        val1: 32,
        val2: 40,
    },
    {
        key: '9',
        region_name: '黄骅',
        lv: 3,
        val1: 32,
        val2: 40,
    },
];

function getData(data: any) {
    const root: any = [];
    let lp: any = [];
    data.forEach((ele: any) => {
        const { lv } = ele;
        const c = {
            ...ele,
        };
        if (lv < 3) {
            c.children = [];
        }
        if (lv == 0) {
            root.push(c);
            lp = [c];
        } else {
            if (lp.length - lv >= 2) {
                lp.splice(lv);
            }
            if (!lp[lv]) {
                lp[lv] = c;
            }
            const tlp = lp[lv - 1];
            if (!c.children) {
                c.showTip = tlp.children.length;
            }
            tlp.children.push(c);
        }
    });
    return root;
}
const trData = getData(data);

function renderRow(text: any, record: any, index: any) {
    const isLv = record.lv >= 3;
    const isText = record?.region_name == text;

    return (
        <div
            style={{
                whiteSpace: 'nowrap',
                fontWeight: isLv ? 'unset' : 'bold',
                color: isLv ? 'rgb(255 255 255 / 70%)' : '#FFF',
                textAlign: isText ? 'unset' : 'right',
            }}
        >
            <span style={{ position: 'relative', marginLeft: isText && isLv ? 20 : 0 }}>
                {record?.showTip == 0 && isText && (
                    <span
                        style={{
                            position: 'absolute',
                            left: -35,
                        }}
                    >
                        其中：
                    </span>
                )}
                <span style={{ marginLeft: isText && isLv ? 5 : 0 }}>{text}</span>
            </span>
        </div>
    );
}

const columns = [
    {
        title: '港口',
        dataIndex: 'region_name',
        key: 'region_name',
        textWrap: 'word-break',
        width: '200px',
        render: renderRow,
    },
    {
        title: '货物吞吐量',
        render: renderRow,
        children: [
            {
                title: '自年初累计',
                dataIndex: 'val1',
                key: 'val1',
                render: renderRow,
            },
            {
                title: '同比增速(%)',
                dataIndex: 'val2',
                key: 'val2',
                render: renderRow,
            },
            {
                title: '外贸货物吞吐量',
                render: renderRow,
                children: [
                    {
                        title: '自年初累计',
                        dataIndex: 'val3',
                        key: 'val3',
                        render: renderRow,
                    },
                    {
                        title: '同比增速(%)',
                        dataIndex: 'val4',
                        key: 'val4',
                        render: renderRow,
                    },
                ],
            },
        ],
    },
    {
        title: '外贸货物吞吐量',
        children: [
            {
                title: '自年初累计',
                dataIndex: 'val3',
                key: 'val3',
            },
            {
                title: '同比增速(%)',
                dataIndex: 'val4',
                key: 'val4',
            },
        ],
    },
];
const App = () => (
    <Table
        scroll={{ x: 'max-content' }}
        pagination={false}
        columns={columns}
        dataSource={trData}
        expandable={{
            defaultExpandAllRows: true,
            rowExpandable: (record) => {
                // if(record.lv>1){
                //     return true;
                // }
                return true;
            },
        }}
        bordered
    />
);
export default App;
