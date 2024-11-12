import { Table, TableProps } from 'antd';
import _ from 'lodash';
import { EmptyOrInd } from '@/components/Indicator';
import { useEffect, useRef, useState } from 'react';
import './EcTable.css';

interface Props extends TableProps<any> {
    apiData?: any;
}

const T = ({ apiData, style, ...props }: Props) => {
    const ref = useRef<any>();
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        if (ref.current) {
            const h = ref.current?.clientHeight - 45;
            if (h > 0) {
                setScrollY(h);
            }
        }
    }, []);

    let trColumns: any = [];
    if (Array.isArray(apiData?.data?.part1?.columns)) {
        if (apiData?.data?.part1?.columns?.[0]?.title == '序号') {
            trColumns = apiData?.data?.part1?.columns?.splice(1);
        } else {
            trColumns = apiData?.data?.part1?.columns;
        }
        trColumns = [
            {
                title: '序号',
                key: 'index',
                width: 50,
                render: (text: any, row: any, index: number) => index + 1,
            },
            ...trColumns,
        ];
    }

    return (
        <Table
            ref={ref}
            style={{ height: '100%', overflow: 'hidden', ...style }}
            columns={trColumns}
            dataSource={apiData?.data?.part1?.dataSource}
            pagination={false}
            scroll={{
                x: '100%',
                y: scrollY,
            }}
            {...props}
        ></Table>
    );
};

export const EcTable = ({ apiData, style, ...props }: Props) => {
    return (
        <EmptyOrInd apiData={apiData}>
            <T apiData={apiData} {...props}></T>
        </EmptyOrInd>
    );
};
