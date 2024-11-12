/**
 * BaseTable 
 * 
 * 提供表格基础功能：
 * 1. 默认对其方式  文字做对齐 数字右对齐
 * 2. 默认计算高度
 * 3. 控制是否默认计算每格宽度
 * 4. 是否默认增加序号
 * 5. 支持换行 数据
 */

import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Table, TableProps } from 'antd';
import { getColumnNodeWidth } from "./util";
import _ from "lodash";

interface IBaseTableProps extends TableProps{
    autoCalcWidth?: boolean,
    autoAddNo?: boolean,
}

const BaseTable = (props: IBaseTableProps) => {
        const [height, setHeight] = useState(0);
        const tableRef = useRef<HTMLDivElement>(null);
        const conRef = useRef<HTMLDivElement>(null);
        const columnWidth = getColumnNodeWidth(props?.columns, props?.dataSource);
        const columns = useMemo(
            () =>
                props.columns?.map((item: any) => {
                    const dataIndexItem = {
                        width: _.max([columnWidth[item.dataIndex] * 18, 60]),
                        ...item,
                        align: "center", //山西所有表格全部居中显示
                        sort: true,
                    };
                    return dataIndexItem;
                }) ?? [],
            [props.columns, columnWidth],
        );
    
        useLayoutEffect(() => {
            const calculateHeight = () => {
                if (conRef.current && tableRef.current) {
                    const wrapperHeight = conRef.current.offsetHeight;
                    const tableHeaderHeight =
                        tableRef.current.ownerDocument.querySelector('.ant-table-header')?.clientHeight || 0;
                    setHeight(wrapperHeight - (tableHeaderHeight + 20));
                }
            };
    
            const resizeObserver = new ResizeObserver(() => calculateHeight());
            if (conRef.current) {
                resizeObserver.observe(conRef.current);
            }
    
            return () => {
                resizeObserver.disconnect();
            };
        }, []);
return (
    <div ref={conRef} style={{ width: '100%', height: '100%' }}>
            <Table
                pagination={false}
                {...props}
                ref={tableRef as any}
                scroll={{
                    y: height,
                    x: 'max-content',
                    ...props.scroll,
                }}
                columns={columns}
            ></Table>
        </div>
)
}

export default BaseTable;