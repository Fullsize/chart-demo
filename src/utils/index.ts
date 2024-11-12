import qs from 'qs';
import Decimal from 'decimal.js';
import _ from 'lodash';
/**
 * @description: px to vw = 100vw/设计图宽度*指定px
 * @param {number} px 宽度px
 * @return {*}
 */
export const px2vw = (px: number) => `${(100 / 1920) * px}vw`;
export const deconstruction = (data: any[], deconstructionJSON: { [x: string]: any }) => {
    if (!Array.isArray(data) || data.length === 0 || data.some((item) => item === null || item === undefined)) {
        return [];
    }
    return data.map((item: { [x: string]: any }) => {
        const json: any = { ...item }; // 复制 item 到 json
        for (const key in deconstructionJSON) {
            const value = deconstructionJSON[key];
            if (Array.isArray(value)) {
                json[key] = value.map((field: string) => item[field] ?? field);
            } else {
                json[key] = item[value] ?? null;
            }
        }
        json['originData'] = item; // 将原始数据添加到 json 中

        return _.merge(item, json);
    });
};

/**
 * @description: 修改地址栏参数
 * @param {string} name key
 * @param {any} val 数值
 * @param {any} href 地址
 * @return {*}
 */
export function changeURLArg(name?: string, val?: any, href?: any) {
    const url = href || window.location.href;
    const pattern = name + '=([^&]*)';
    const replaceText = name + '=' + val;
    if (!name) {
        return url;
    }
    if (url.match(pattern)) {
        const regex = new RegExp(`(${name}=)([^&]*)`, 'gi');
        const replacedUrl = url.replace(regex, replaceText);
        return replacedUrl;
    }
    if (url.match('[?]')) {
        return `${url}&${replaceText}`;
    }
    return `${url}?${replaceText}`;
}
/**
 * 解析查询字符串或哈希字符串为对象。
 * @param search 可选，指定的查询字符串。如果未提供，则从当前页面的URL中获取。
 * @returns 返回解析后的查询参数对象。
 */
export const getQueryString = (search?: string) => {
    // 如果没有提供search参数，则尝试从页面URL的查询字符串或哈希中获取
    search = search || window.location.search.substring(1) || window.location.hash.split('?')[1];

    const params: { [x: string]: any } = {};
    if (search) {
        const paramPairs = search.split('&');
        paramPairs.forEach((pair) => {
            const [key, value] = pair.split('=');
            const decodedKey = decodeURIComponent(key);
            const decodedValue = value ? decodeURIComponent(value) : '';
            if (decodedKey) {
                // 如果已经存在相同的键，则转换为数组存储
                if (params[decodedKey]) {
                    if (Array.isArray(params[decodedKey])) {
                        params[decodedKey].push(decodedValue);
                    } else {
                        params[decodedKey] = [params[decodedKey], decodedValue];
                    }
                } else {
                    params[decodedKey] = decodedValue;
                }
            }
        });
    }

    return params;
};

/**
 * @description: 获取物理分辨率
 * @param {*} containRatio 是否获取
 * @param {*} baseWidth 物理分辨率(px)
 * @return {*}
 */
export const getScale = (containRatio = true, baseWidth = 1920) => {
    const currentScale = document.documentElement.clientWidth / baseWidth;
    const formattedScale = currentScale > 1 ? currentScale : 1;
    const resultScale = containRatio ? formattedScale * window.devicePixelRatio : formattedScale;
    return Math.ceil(resultScale);
};
/**
 * @description: 精度转换方法
 * @param {number} num 需要转换的数值
 * @param {*} precision 保留精度位数
 * @return {*}
 */
export const accurate = (num: number, precision = 2) => {
    const decimalNum = new Decimal(num);
    const strippedNum = decimalNum.toDecimalPlaces(precision);
    return +strippedNum.toString();
};

export function removeQueryParams(paramName?: string) {
    // 获取当前URL的查询部分
    let searchParams = new URLSearchParams(window.location.search);

    // 如果没有指定参数名，删除所有查询参数
    if (!paramName) {
        searchParams = new URLSearchParams();
    } else {
        // 检查是否存在要删除的查询参数
        if (searchParams.has(paramName)) {
            // 删除指定的查询参数
            searchParams.delete(paramName);
        }
    }

    // 获取更新后的查询部分
    const newSearchParams = searchParams.toString();

    // 使用replaceState来更新地址栏URL并保留历史记录
    const newURL = window.location.pathname + (newSearchParams ? '?' + newSearchParams : '');
    history.replaceState({}, document.title, newURL);
}

/**
 * 对象映射,保留原始属性，添加映射属性
 * @param target  原始对象
 * @param mapKeys 需要替换的key
 * @returns
 */
export function mapTarget<
    T extends object & { [x: string]: unknown },
    K extends Record<string, keyof T | (keyof T | string)[]>,
>(target: T, mapKeys: K) {
    const keys = Object.keys(mapKeys);

    return keys.reduce(
        (prev, cur) => {
            let val = undefined;

            const valueOfMapKeys = mapKeys[cur];

            if (Array.isArray(valueOfMapKeys)) {
                val = valueOfMapKeys.map((key) => target[key] || key).join('');
            } else {
                val = target[valueOfMapKeys];
            }

            return {
                ...prev,
                [cur]: val,
            };
        },
        { ...target, ...mapKeys },
    );
}
/**
 * 判断给定的值是否为空
 * 
 * 此函数旨在确定传入的参数是否代表一个空值，这包括undefined、null和空字符串三种情况
 * 在很多情况下，需要判断某个值是否有效或是否有意义，这时就可以使用此函数来实现
 * 
 * @param value 任意类型的值，用于判断是否为空
 * @returns 返回布尔值，如果value为undefined、null或空字符串，则返回true；否则返回false
 */
export function isEmptyValue(value: any) {
    return value === undefined || value === null || value === '';
}

export function generateUUID() {
    const _lut: any = [];
    for (let i = 0; i < 256; i++) {
        _lut[i] = (i < 16 ? '0' : '') + i.toString(16);
    }
    const uuid = () => {
        const d0 = Math.random() * 0xffffffff | 0;
        const d1 = Math.random() * 0xffffffff | 0;
        const d2 = Math.random() * 0xffffffff | 0;
        const d3 = Math.random() * 0xffffffff | 0;
        const uuidStr = _lut[d0 & 0xff] + _lut[d0 >> 8 & 0xff] + _lut[d0 >> 16 & 0xff] + _lut[d0 >> 24 & 0xff] +
            '-' + _lut[d1 & 0xff] + _lut[d1 >> 8 & 0xff] +
            '-' + _lut[d1 >> 16 & 0x0f | 0x40] + _lut[d1 >> 24 & 0xff] +
            '-' + _lut[d2 & 0x3f | 0x80] + _lut[d2 >> 8 & 0xff] +
            '-' + _lut[d2 >> 16 & 0xff] + _lut[d2 >> 24 & 0xff] + _lut[d3 & 0xff] + _lut[d3 >> 8 & 0xff] + _lut[d3 >> 16 & 0xff] + _lut[d3 >> 24 & 0xff];
        return uuidStr.toUpperCase();
    }
    return uuid();
}