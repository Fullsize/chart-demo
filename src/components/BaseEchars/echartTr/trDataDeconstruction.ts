/*
 * @Author: sungy
 * @Date: 2024-04-08 15:19:28
 * @LastEditors: sungy
 * @LastEditTime: 2024-05-24 18:30:21
 * @Description: 用于解决数据多字段拼接为一个维度
 */

import trApiFieldData from '@/components/trApiFieldData';

// *注意 根据config获取字段、如果不存在该字段，作为连接符输出
export function trDataDeconstruction(data: any, config: any) {
    const keys = Object.keys(config);
    const res: any = {};
    if (typeof data !== 'object') {
        return res;
    }
    for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        const field = config[k];
        if (Array.isArray(field)) {
            res[k] = '';
            for (let j = 0; j < field.length; j++) {
                const ak = field[j];
                if (typeof data == 'object' && ak in data) {
                    const d = trApiFieldData(data[ak], data, ak);
                    res[k] += ak == 'category' ? (d || '')?.toString() : d;
                } else {
                    res[k] += ak;
                }
            }
        } else {
            res[k] = k == 'category' ? (data[field] || '')?.toString() : data[field];
        }
    }
    return res;
}
