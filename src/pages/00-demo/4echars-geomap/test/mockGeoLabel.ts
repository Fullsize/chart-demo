import { EchartMapProps } from '@/components/EchartMapGeo';

export const mockGeoLabel: EchartMapProps['labelData'] = [
    {
        name: '贵阳市',
        id: 'gxb000243',
        lon: 106.81484,
        lat: 27.065168,
        value: 1,
        unit: '亿元',
        children: [
            {
                name: '其中:地市',
                unit: '亿元',
                value: 4,
            },
        ],
    },
    {
        name: '黔南布依族',
        id: 'gxb000250',
        lon: 107.4369,
        lat: 27.07705,
        value: 1,
        unit: '亿元',
        children: [
            {
                name: '其中',
                unit: '亿元',
                value: 4,
            },
        ],
    },
    {
        name: '遵义市',
        id: 'gxb000667',
        lon: 107.548744,
        lat: 27.80007,
        value: 1,
        unit: '亿元',
    },
    {
        name: '铜仁市',
        id: 'gxb000855',
        lon: 109.00127,
        lat: 27.323454,
        value: 1,
        unit: '亿元',
    },
];
