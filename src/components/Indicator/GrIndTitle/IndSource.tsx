/*
 * @Author: sungy
 * @Date: 2024-06-25 14:37:54
 * @LastEditors: sungy
 * @LastEditTime: 2024-09-03 11:04:13
 * @Description:
 */

import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { useEcApiPost } from '@/service';
import { useDebounce } from 'react-use';

export function useIndSource(indSource: {
    indexFullCodeList?: string;
    indexCodeList?: string;
    typeCodeList?: string;
    groupCodeList?: string;
}) {
    const [indStr, setIndStr] = useState('');
    const [res, getSource] = useEcApiPost('/api/v4/attr/query/list');

    useDebounce(
        () => {
            if (
                indSource &&
                (indSource?.indexFullCodeList ||
                    indSource?.indexCodeList ||
                    indSource?.typeCodeList ||
                    indSource?.groupCodeList)
            ) {
                getSource({
                    dataId: 'eco_sxsjj_source_by_code',
                    businessName: '140000_sxsjj',
                    indexFullCodeList: indSource?.indexFullCodeList || '',
                    indexCodeList: indSource?.indexCodeList || '',
                    typeCodeList: indSource?.typeCodeList || '',
                    groupCodeList: indSource?.groupCodeList || '',
                });
            }
        },
        150,
        [indSource?.indexFullCodeList, indSource?.indexCodeList, indSource?.typeCodeList, indSource?.groupCodeList],
    );

    useEffect(() => {
        if (res.ok) {
            setIndStr(res);
        }
    }, [res.sign]);
    return indStr;
}

export function IndSource({ hookApi }: { hookApi: any }) {
    const str = useIndSource(hookApi?.getApiParams?.()?.params);
    return <>{str}</>;
}
