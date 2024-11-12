/*
 * @Author: sungy
 * @Date: 2024-04-15 09:46:59
 * @LastEditors: sungy
 * @LastEditTime: 2024-06-28 10:01:13
 * @Description:
 */

const bZMapping: any = {
    LX0101: 'LX0101',
    LX0201: 'LX0201',
    LX0301: 'LX0301',
    LX0105: 'LX0105',
    LX0305: 'LX0305',
    LX0205: 'LX0205',
};

// 注意：[河北发改项目]-适配后端接口返回的数据，val，val1，val2等字段展示效果。判断出哪些字段是绝对值、增速、排名等。
export const trIndDataToArr = (data: any) => {
    const trArr: any = [];
    if (typeof data !== 'object') {
        return trArr;
    }
    let index = 0;
    // eslint-disable-next-line no-constant-condition
    while (true) {
        const arr = index > 0 ? index : '';
        const typeCodeField = 'type_code' + arr;
        if (typeCodeField in data) {
            const resObj: any = {};
            const field = [
                'val',
                'type_code',
                'unit_name',
                'index_code',
                'index_full_code',
                'index_code_cname',
                'index_code_full_cname',
                'index_code_full_type_name',
                'time_name',
                'type',
                'updated_by',
                'time_freq',
                'group_code',
                'group_name',
                'region_name',
                'region_code',
                'division_unit',
                'show_name',
                'last_compare',
                'explain_code',
            ];
            field.forEach((key: string) => {
                if (Object.prototype.hasOwnProperty.call(data, key + arr)) {
                    resObj[key] = data[key + arr];
                } else {
                    resObj[key] = data[key];
                }
            });
            if (resObj.index_code_full_cname) {
                if (resObj.index_code_full_cname.includes('比重') && bZMapping[resObj.type_code]) {
                    resObj['type_code'] = 'ZB';
                    resObj['index_code_full_type_name'] = '比重';
                } else if (resObj.index_code_full_cname.includes('占比') && bZMapping[resObj.type_code]) {
                    resObj['type_code'] = 'ZB';
                    resObj['index_code_full_type_name'] = '占比';
                }
            }
            trArr.push(resObj);
        } else {
            if (index != 0) {
                break;
            }
        }
        index++;
    }
    return trArr;
};

export const trValueByTypecode = (data: object) => {
    const trData = trIndDataToArr(data);
    const value: Array<any> = [];
    const zs: Array<any> = [];
    const zb: Array<any> = [];
    const pm: Array<any> = [];
    const other: Array<any> = [];
    trData.forEach((element: any) => {
        const { type_code } = element;
        switch (type_code) {
        case 'LX0101':
        case 'LX0201':
        case 'LX0301':
        case 'LX0105':
        case 'LX0305':
        case 'LX0205':
            value.push(element);
            break;
        case 'LX0103':
        case 'LX0203':
        case 'LX0303':
        case 'LX0126':
        case 'LX0127':
        case 'LX0319':
        case 'ZB00120101':
        case 'ZB00120102':
        case 'ZB00480201':
            zs.push(element);
            break;
        case 'LX11010201':
        case 'LX11010202':
            pm.push(element);
            break;
        case 'ZB':
            zb.push(element);
            break;
        default:
            other.push(element);
            break;
        }
    });

    return { value, zs, pm, zb, other };
};
