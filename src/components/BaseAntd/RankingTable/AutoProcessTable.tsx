/*
 * @Author: zhipengHuang
 * @Date: 2024-08-09 10:17:28
 * @LastEditors: zhipengHuang
 * @LastEditTime: 2024-09-03 15:47:13
 * @Description: 拿取后台参数自动处理 并显示数据结构
 */
import React from 'react';
import RankingTable, { IRankingColumnType } from './index';
import { ColumnType } from 'antd/es/table';
import { cloneDeep } from 'lodash';
interface IAutoProcessTable {
    data: {
        part1: {
            columns: IRankingTableData[];
            dataSource: IRankingTableData[];
            tableName: string;
        };
    };
}
interface IRankingTableData extends ColumnType {
    dataIndex: string;
    rank?: number;
    type?: IRankingColumnType;
    [key: string]: any;
}

const AutoProcessTable = (props: IAutoProcessTable) => {
    const columns = cloneDeep(props?.data?.part1?.columns) || [];
    const dataSource =cloneDeep(props?.data?.part1?.dataSource) || [];
    columns?.unshift({
        dataIndex: IRankingColumnType.RANK,
        align: 'left',
        title: '序号',
        key: 'rank',
        type: IRankingColumnType.RANK,
    });
    const findObj: any = columns?.find(item=>item.type===IRankingColumnType.PROGRESS);
    const findIndex: any = columns?.findIndex(item=>item.type===IRankingColumnType.PROGRESS);
    const originData = dataSource?.map((item) => {
        item.val = item?.[findObj?.dataIndex];
        return item;
    });
    if(findIndex > -1) {
        columns.splice(findIndex, 0, {
            dataIndex: 'val',
            title: '',
            type: IRankingColumnType.PROGRESS,
            width: 'auto',
        });
        columns[findIndex+1].type = undefined;
    }
    return <RankingTable originColumn={columns} originData={originData} />;
};

export default AutoProcessTable;
