import styles from './baseSingleSelect.module.css';
import React, { useEffect, useState } from 'react';

// 	horizontal | vertical
export const SingleSelect = ({
    data,
    uniqueField,
    selected,
    onChange,
    children,
    style,
    className,
    layout = 'vertical',
    ...props
}: any) => {
    const [selectStyle, setSelectStyle] = useState(false);
    useEffect(() => {
        let isSelect = false;
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
            isSelect = data[uniqueField] == selected;
        } else if (selected == data && data) {
            isSelect = true;
        }
        setSelectStyle(isSelect);
    }, [uniqueField, selected, data]);

    const classArr = [];
    if (onChange) {
        if (layout == 'vertical') {
            classArr.push(styles['card-v']);
            if (selectStyle) {
                classArr.push(styles['active-v']);
            }
        } else {
            classArr.push(styles['card-h']);
            if (selectStyle) {
                classArr.push(styles['active-h']);
            }
        }
    }
    classArr.push(className);
    return (
        <div
            className={onChange && classArr.join(' ')}
            style={{
                cursor: onChange ? 'pointer' : 'auto',
                userSelect: onChange ? 'none' : 'auto',
                padding: onChange ? '10px 10px 5px 10px' : '0',
                borderRadius: 8,
                boxSizing: 'border-box',
                transition: '0.25s',
                ...style,
            }}
            {...props}
            onClick={() => {
                onChange && onChange(data);
            }}
        >
            {children}
        </div>
    );
};
