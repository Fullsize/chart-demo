/*
 * @Author: zhipengHuang
 * @Date: 2024-08-09 10:17:28
 * @LastEditors: zhipengHuang
 * @LastEditTime: 2024-09-04 19:32:09
 * @Description:
 */
import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import { TableProps, TableColumnType, Table } from 'antd';
import ColumnProgress from '@/components/BaseAntd/RankingTable/components/Progress';
import { F16, F20B, IndIconNumber2 } from '@/components/Indicator';
import { isArray } from 'lodash';
import AutoProcessTable from './AutoProcessTable';
import BaseTable from '../table/BaseTable';

export enum IRankingColumnType {
    PROGRESS = 'progress', //进度条组件
    RANK = 'rank', //排名组件
}

interface ITableProps extends TableProps {
    originColumn?: IColumnInput[];
    fieldNames?: any;
    originData: any[];
}
interface IColumnInput extends TableColumnType<any> {
    type?: IRankingColumnType; //根据类型展示不同的组件
    progressColor?: string[]; //进度条颜色 从上往下一组不同的颜色
}

const sortChange = (a: any, b: any, sortOrder: any, record: any) => {
    return a[record.dataIndex] - b[record.dataIndex];
}
 
const generateColumnData = (c: IColumnInput[]) => {
    return c.map((item: IColumnInput, index: number) => {
        const flag = item.dataIndex.indexOf("val") > -1;
        const column: any = {
            render: (value: any) => {
                return flag ? <F20B fontFamily={'D-DIN'}>{value}</F20B> : <F16>{value}</F16>
            },
            ...item,
            sorter:flag ? (a: any, b: any, sortOrder: any) => sortChange(a, b, sortOrder, item) : false

        };
        if (item.type === IRankingColumnType.PROGRESS) {
            const { progressColor = ['#F6D991', '#B1C0EC', '#EA9D84', '#84DDEA'] } = item;
            column.render = (value: any, record: any, index: number) => {
                const color = Number(value) < 0 ? 'rgb(113, 255, 94)' : index > 3 ? '#84DDEA' : progressColor?.[index];
                return (
                    <div style={{ minWidth: '200px' }}>
                        <ColumnProgress
                            percent={record?.percent}
                            color={color}
                        />
                    </div>
                );
            };
            column.sorter = false;
        }
        if (item.type === IRankingColumnType.RANK) {
            column.render = (value: any, record: any, index: number) => {
                return <IndIconNumber2 number={index + 1} />;
            };
        }
        return column;
    });
};

// TODO 是否要计算最大值按照比例
const marshTableData = (data: any, column: any) => {
    if (!data || !isArray(data)) {
        return [];
    }
    const key = column?.find((item: any)=>item.type==IRankingColumnType.PROGRESS)?.dataIndex || "val";
    const maxValue = Math.max(...data?.map((item: any) => Math.abs(item?.[key])));
    const newData = data.map((item: any, i: number) => {
        const val = Number(item?.[key] ?? 0);
        return {
            percent: (Math.abs(val) / maxValue) * 100,
            key: i,
            ...item,
        };
    });
    return newData;
};

/**
 *
 * @param originData 接口数据
 * @param originColumn 定义表格列
 * @param columns antd 原colums
 * @returns
 */
const RankingTable = (props: ITableProps) => {
    const [column, setColumn] = useState<any>([]);
    const { originData, columns, originColumn } = props;
    // const column = originColumn ? generateColumnData(originColumn) : columns;
    const data = marshTableData(originData, column);
    const conRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const result = originColumn ? generateColumnData(originColumn) : columns;
        setColumn(result);
    }, [originColumn, columns])

    const handleChange = (pagination: any, filters: any, sorter: any, extra: any) => {
        if(extra.action == "sort") {
            const key = column.find((item: any)=>item.type === IRankingColumnType.PROGRESS).dataIndex;
            if(key !== sorter.field) {
                try {
                    const cloneData:any= [].concat(column);
                    const findIndex = cloneData.findIndex((item: any)=>item.type === IRankingColumnType.PROGRESS);
                    cloneData[findIndex].dataIndex= sorter.field;
                    setColumn(cloneData);
                } catch (error) {
                    console.log(error)
                }
            }
        }
    }
    return (
        <div ref={conRef} style={{ width: '100%', height: '100%' }}>
            <BaseTable
                dataSource={data}
                columns={column}
                pagination={false}
                {...props}
                onChange={handleChange}
            ></BaseTable>
        </div>
    );
};
RankingTable.AutoProcecssTable = AutoProcessTable;

export default RankingTable;
