// 映射特定指标无法处理的规则

const mappimg = new Map();
mappimg.set('F01ZB000401LX0303', {
    全国: '国内',
});

export default function trApiFieldData(fieldData: string, o: any, field: string) {
    if (field == 'group_name' && o?.[field] == '全部') {
        return '';
    }
    if (fieldData == '地区生产总值' && o?.['region_name'] == '全国') {
        return '生产总值';
    }
    if (fieldData == '地区生产总值_累计增速' && o?.['region_name'] == '全国') {
        return '生产总值_累计增速';
    }

    const co = mappimg.get(o?.index_full_code);
    if (co) {
        return co[fieldData] || fieldData;
    }
    return fieldData || field;
}
