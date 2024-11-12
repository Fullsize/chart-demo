import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import type { SelectProps } from 'antd';
import { useXfzApiPost } from '@/service';
import styles from './index.module.css';

let timeout: ReturnType<typeof setTimeout> | null;

const fetch1 = (value: string, getListRes: any) => {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    const fake = () => {
        getListRes({
            dataId: 'eco_xjxfz_index_search',
            search_name: value,
        });
    };

    if (value) {
        timeout = setTimeout(fake, 300);
    }
};

const SearchInput: React.FC<{
    placeholder: string;
    style: React.CSSProperties;
    handleSearchGo: (url: string) => void;
}> = (props) => {
    const [listRes, getListRes] = useXfzApiPost('/api/v4/attr/query/list');
    const [data, setData] = useState<SelectProps['options']>([]);
    const [value, setValue] = useState<string>();

    const handleSearch = (newValue: string) => {
        fetch1(newValue, getListRes);
    };

    const handleChange = (newValue: string) => {
        props?.handleSearchGo && props?.handleSearchGo(newValue);
        setValue(newValue);
    };
    useEffect(() => {
        if (listRes.ok) {
            const newData = listRes?.data?.map((item: any) => ({
                value: item.module_url,
                text: item.index_full_name,
            }));
            setData(newData);
        }
    }, [listRes.sign]);
    return (
        <Select
            showSearch
            value={value}
            placeholder={props.placeholder}
            style={props.style}
            suffixIcon={null}
            filterOption={false}
            onSearch={handleSearch}
            onChange={handleChange}
            notFoundContent={null}
            options={(data || []).map((d) => ({
                value: d.value,
                label: d.text,
            }))}
            popupClassName={styles['selectDown']}
        />
    );
};

const Search: React.FC<{ handleSearchGo: any }> = ({ handleSearchGo }) => (
    <div className={styles['search']}>
        <SearchInput
            placeholder="请输入数据指标"
            handleSearchGo={handleSearchGo}
            style={{
                height: 27,
                width: 170,
                borderRadius: 4,
            }}
        />
    </div>
);

export default Search;
