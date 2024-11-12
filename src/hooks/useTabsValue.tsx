import { IGrIndTabProps } from '@/components/Indicator';
import { IResponseType } from '@/service/hooksMiddleware';
import { mapTarget } from '@/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';

// 默认映射字段  index_name --> label , index_full_code --> value
const defaultMapKeys = {
    label: 'index_name',
    value: 'index_full_code',
};

/**
 * 返回tabs 组件需要的参数，简化调用,
 * 不包含style 属性 .
 * 注： 当 style={{ flexDirection: 'row', justifyContent: 'start' }}  ， 务必设置justifyContent: 'start'！！！
 * @param tabsResponse
 * @param mapKeys  需要映射的字段  {label:'index_name',value:'index_full_code' } ，映射后变为 {label:'xx',value:'xxxxxx'}
 * @returns
 */
const useTabsValue = (
    tabsResponse: IResponseType<any>,
    mapKeys: { label: string; value: string; [p: string]: string } = defaultMapKeys,
): IGrIndTabProps & { activeTab: string } => {
    const [activeTab, setActiveTab] = useState('');

    /**
     * 生成options
     */
    const options = useMemo(() => {
        const { data } = tabsResponse ?? {};

        const res = Array.isArray(data)
            ? data.map((item) => {
                const { label, value } = mapTarget(item, mapKeys);

                return {
                    label,
                    value,
                };
            })
            : [];

        return res;
    }, [tabsResponse?.sign]);

    // 设置初始值
    useEffect(() => {
        if (options.length > 0) {
            setActiveTab(options[0].value);
        }
    }, [options]);

    /**
     * 缓存函数
     */
    const onChange = useCallback((value: string) => {
        setActiveTab(value);
    }, []);

    return {
        activeTab: activeTab,
        active: activeTab,
        onChange: onChange,
        data: options,
        // 重置解构
        data_deconstruction: { value: 'value', lable: 'label' },
    };
};

export default useTabsValue;
