import _ from 'lodash';
export const group = {
    card: ['group_name', 'index_code_full_cname'],
    chart: {
        measure: ['group_name', 'index_code_full_cname'],
    },
};

export const group2 = {
    card: ['group_name', 'index_code_full_cname'],
    chart: {
        measure: ['group_name', 'index_code_full_cname', 'index_code_full_type_name'],
    },
};
export const indexName = {
    card: ['index_code_cname'],
    chart: {
        measure: ['index_code_cname', 'index_code_full_type_name'],
    },
};

export const indexName2 = {
    card: ['index_code_cname'],
    chart: {
        measure: ['index_code_cname', 'index_code_full_type_name'],
    },
};
type ATYPE = 'regin' | 'group' | 'index' | 'index_full' | 'unit' | 'unit2';
/**
 * 将给定的atype数组转换成对应的字符串数组。
 * @param list 包含'regin'、'group'、'index'、'index_full'、'unit'中的一种或多种类型的数组。
 * @returns 返回一个字符串数组，每个元素是给定类型对应的特定字符串。
 */
export const assemblingCode = (list: ATYPE[]) => {
    const str: string[] = [];
    const json = {
        regin: 'region_name',
        group: 'group_name',
        index: 'index_code_cname',
        index_full: 'index_code_full_cname',
        unit: 'index_code_full_type_name',
        unit2: 'index_code_cname',
    };
    list.map((item) => {
        if (item === 'unit') {
            str.push('_');
        }
        str.push(json[item]);
    });
    return str;
};
export const concatData = (a: { data: any }, b: { data: any }) => {
    if (!_.isEmpty(a.data)) {
        return {
            ...a,
            data: _.concat(a.data, b.data),
        };
    }
    return a;
};
