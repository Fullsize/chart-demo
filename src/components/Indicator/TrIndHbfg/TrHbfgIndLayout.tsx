/*
 * @Author: sungy
 * @Date: 2023-09-19 15:46:06
 * @LastEditors: zhipengHuang
 * @LastEditTime: 2024-09-05 16:41:39
 * @Description: 卡片指标类
 */
import React, { useEffect, useState } from 'react';
import { EmptyOrInd, FlaIndCardBg1, FlaIndCardBg1Ac } from '@/components/Indicator';
import { HgjjCardProps } from './IndProps';

function checkSelect(data: any, uniqueField: any, selected: any) {
    let isSelect = false;
    let trDataArr = [];
    if (Array.isArray(data)) {
        trDataArr = data;
    } else {
        trDataArr.push(data);
    }
    for (let j = 0; j < trDataArr.length; j++) {
        const data = trDataArr[j];
        if (Array.isArray(uniqueField)) {
            if (selected && data) {
                for (let i = 0; i < uniqueField.length; i++) {
                    const field: any = uniqueField[i];
                    if (data?.[field] !== selected?.[field] || data?.[field] == undefined) {
                        break;
                    }
                    if (i == uniqueField.length - 1) {
                        isSelect = true;
                    }
                }
            }
        } else if (typeof uniqueField == 'string') {
            if (typeof selected == 'object') {
                isSelect = data?.[uniqueField] == selected?.[uniqueField];
            } else {
                isSelect = uniqueField == selected;
            }
        } else if (selected == data && data) {
            isSelect = true;
        }
        if (isSelect == true) {
            break;
        }
    }
    return isSelect;
}

const SingleSelect = ({ data, onChange, children, style }: any) => {
    return (
        <div
            style={{
                cursor: onChange ? 'pointer' : 'auto',
                userSelect: onChange ? 'none' : 'auto',
                boxSizing: 'border-box',
                transition: '0.25s',
                height: 'auto',
                width: 'auto',
                ...style,
            }}
            onClick={() => {
                if (!onChange) {
                    return;
                }
                if (Array.isArray(data)) {
                    if (data.length == 1) {
                        onChange(data[0]);
                    } else {
                        onChange(data);
                    }
                } else {
                    onChange(data);
                }
            }}
        >
            {children}
        </div>
    );
};

export const useSingleSelect = (data: any, uniqueField?: Array<any> | string | number, selected?: any) => {
    const [select, setSelect] = useState(false);
    useEffect(() => {
        const isSelect = checkSelect(data, uniqueField, selected);
        setSelect(isSelect);
    }, [uniqueField, selected, data]);
    return select;
};

// 指标卡通用-内容可自定义
export const TrHbfgIndLayout = ({
    apiData,
    onChange,
    children,
}: {
    apiData: any;
    onChange?: (v: any) => void;
    children?: any;
}) => {
    return (
        <EmptyOrInd apiData={apiData}>
            <SingleSelect data={apiData?.data} onChange={onChange}>
                {children}
            </SingleSelect>
        </EmptyOrInd>
    );
};
