import React, { useLayoutEffect, useMemo, useRef, useState, useEffect } from 'react';
import { Table, TableProps } from 'antd';
import styles from './index.module.css';
import classNames from 'classnames';
import _ from 'lodash';

/**
 * Calculation the real text width
 * @param text
 * @param font
 * @returns
 */
function getTextWidth(text: any, font = '14px Microsoft YaHei') {
    const canvas = document.createElement('canvas');
    const context: any = canvas.getContext('2d');
    context.font = font;
    const textmetrics = context.measureText(text);
    return textmetrics.width;
}

function traverseAndModify(root: any, callback: (arg0: any) => void) {
    if (!root) return;

    const stack = Array.isArray(root) ? [...root] : [root];

    while (stack.length) {
        const node = stack.pop();
        callback(node);
        if (node.children && node.children.length > 0) {
            // 将子节点逆序推入栈中，以保证遍历顺序
            for (let i = node.children.length - 1; i >= 0; i--) {
                stack.push(node.children[i]);
            }
        }
    }
}

function getColumnNodeWidth(column: any, dataSource: any) {
    const columnWidth: any = {};
    traverseAndModify(column, (node) => {
        columnWidth[node.dataIndex] = _.max([node.title?.length, columnWidth[node.dataIndex]?.length]);
    });
    traverseAndModify(dataSource, (node) => {
        const keys = Object.keys(node);
        keys.forEach((item) => {
            columnWidth[item] = _.max([columnWidth[item], node[item]?.length]);
        });
    });
    return columnWidth;
}

interface Props extends TableProps<any> {}
const TableC = (props: Props) => {
    const [height, setHeight] = useState(0);
    const tableRef = useRef<HTMLDivElement>(null);
    const conRef = useRef<HTMLDivElement>(null);
    const columnWidth = getColumnNodeWidth(props?.columns, props?.dataSource);
    const columns = useMemo(
        () =>
            props.columns?.map((item: any) => {
                const dataIndexItem = {
                    sorter: item?.sort ? (a: any, b: any) => a[item.dataIndex] - b[item.dataIndex] : undefined,
                    ...item,
                    width: _.max([columnWidth[item.dataIndex] * 18, 60]),
                    align: 'center',
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
                {...props}
                ref={tableRef as any}
                scroll={{
                    x: "max-content",
                    y: height,
                    ...props.scroll,
                }}
                columns={columns}
                className={classNames(styles['table'], props.className)}
            ></Table>
        </div>
    );
};
export default TableC;
