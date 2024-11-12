import { ManipulateType } from 'dayjs';

export type Presset = {
    text: string;
    value: string;
    type?: ManipulateType;
};

export const datePresets: Presset[] = [
    {
        text: '近7天',
        value: '7',
        type: 'd',
    },
    {
        text: '近30天',
        value: '30',
        type: 'd',
    },
    {
        text: '近90天',
        value: '90',
        type: 'd',
    },
    {
        text: '近半年',
        value: '180',
        type: 'd',
    },
    {
        text: '全部',
        value: 'all',
    },
    {
        text: '自定义',
        value: 'custom',
    },
];

export const weekPresets: Presset[] = [
    {
        text: '近6周',
        value: '6',
        type: 'w',
    },
    {
        text: '近12周',
        value: '12',
        type: 'w',
    },
    {
        text: '近半年',
        value: '180',
        type: 'd',
    },
    {
        text: '全部',
        value: 'all',
    },
    {
        text: '自定义',
        value: 'custom',
    },
];

export const monthPresets: Presset[] = [
    {
        text: '近6月',
        value: '5',
        type: 'M',
    },
    {
        text: '近1年',
        value: '1',
        type: 'y',
    },
    {
        text: '近2年',
        value: '2',
        type: 'y',
    },
    {
        text: '全部',
        value: 'all',
    },
    {
        text: '自定义',
        value: 'custom',
    },
];

export const yearPresets: Presset[] = [
    {
        text: '近5年',
        value: '5',
        type: 'y',
    },
    {
        text: '全部',
        value: 'all',
    },
    {
        text: '自定义',
        value: 'custom',
    },
];
