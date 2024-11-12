import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Table, TableProps } from 'antd';
import styles from './index.module.css';
import classNames from 'classnames';
import autoColumnWidth from './autoColumnWidth';
import _ from 'lodash';
interface Props extends TableProps<any> {}
const TableC = (props: Props) => {
    const [height, setHeight] = useState(0);
    const tableRef = useRef<HTMLDivElement>(null);
    const conRef = useRef<HTMLDivElement>(null);

    const columns = useMemo(
        () =>
            props.columns?.map((item: any) => {
                const dataIndexItem = {
                    sorter: item?.sort ? (a: any, b: any) => a[item.dataIndex] - b[item.dataIndex] : undefined,
                    ...item,
                };
                if (item.dataIndex === 'rownum') {
                    return {
                        ...dataIndexItem,
                        align: 'center',
                        width: 80,
                    };
                } else if (item.align === 'right' && item?.key?.startsWith('val')) {
                    return {
                        ...dataIndexItem,
                        render: (text: any) => (
                            <span
                                style={{
                                    fontFamily: 'D-DIN',
                                    color: '#02F9F9',
                                }}
                            >
                                {text}
                            </span>
                        ),
                    };
                }
                return dataIndexItem;
            }) ?? [],
        [props.columns],
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
                    x: 'max-content',
                    y: height,
                    ...props.scroll,
                }}
                columns={columns}
                className={classNames(styles['table'], props.className)}
            ></Table>
        </div>
    );
};
TableC.AutoColumnWidth = autoColumnWidth;
export default TableC;
