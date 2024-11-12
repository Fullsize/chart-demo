import React, { useState } from 'react';
import { CloseCircleOutlined, QuestionCircleOutlined, CloseSquareOutlined } from '@ant-design/icons';
import MdDialog from '../MdDialog';

import { Flc, Flr, FlaIndTitle10Ind, FlaIndTitle12 } from '@/components/Indicator';
import { useEcApiPost } from '@/service';
import Empty from '@/components/Empty';

export function GrIndDialog({ desCode, iconStyle }: { desCode: string; iconStyle?: React.CSSProperties }) {
    const [open, setOpen] = useState(false);
    const [resEx, getApi] = useEcApiPost('/api/v4/query/v7Explain');

    return (
        <MdDialog
            open={open}
            onShow={() => {
                getApi({
                    businessName: '140000_sxsjj',
                    indexDesFullCode: desCode, //关联的描述指标index_full_code
                });
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            style={{ display: 'flex', justifyContent: 'flex-end' }}
            icon={
                <QuestionCircleOutlined
                    className="amplify"
                    style={{
                        ...iconStyle,
                    }}
                />
            }
            content={
                <FlaIndTitle10Ind
                    title={'指标说明'}
                    childrenStyle={{ height: '100%', alignItems: 'center' }}
                    titleChildren={
                        <Flr>
                            <CloseSquareOutlined
                                className="amplify"
                                style={{
                                    fontSize: '20px',
                                    color: 'rgb(204,204,204)',
                                }}
                                onClick={(event: any) => {
                                    event.stopPropagation();
                                    setOpen(false);
                                }}
                            ></CloseSquareOutlined>
                        </Flr>
                    }
                >
                    <Flc flex={1} width={'80%'}>
                        {resEx?.data?.indexName ? (
                            <>
                                <FlaIndTitle12 title="指标名称" flex={1}>
                                    {resEx?.data?.indexName}
                                </FlaIndTitle12>
                                <FlaIndTitle12 title="统计口径说明" flex={2}>
                                    {resEx?.data?.explain}
                                </FlaIndTitle12>
                                <FlaIndTitle12 title="数据来源" flex={1}>
                                    {resEx?.data?.sourceName}
                                </FlaIndTitle12>
                            </>
                        ) : (
                            <Empty></Empty>
                        )}
                    </Flc>
                </FlaIndTitle10Ind>
            }
        ></MdDialog>
    );
}
