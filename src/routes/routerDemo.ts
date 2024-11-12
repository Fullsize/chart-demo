import { CustomRoute } from './path';

export default [
    {
        path: '/00-demo',
        name: '组件示例',
        component: false,
        to: '/00-demo/1common',
        children: [
            {
                path: '/1common',
                name: '公共指标类',
                component: true,
            },
            {
                path: '/2common-other',
                name: '其他公共组件',
                component: true,
            },
            {
                path: '/3echars',
                name: '公共Echars类',
                component: true,
            },
            {
                path: '/4echars-geomap',
                name: '公共Echars地图类',
                component: true,
            },
            {
                path: '/5antd',
                name: '公共Antd类',
                component: true,
            },
            {
                path: '/hbfg',
                name: '河北发改',
                component: true,
            },
            {
                path: '/hbzwb',
                name: '河北政务办',
                component: true,
            },
            {
                path: '/sjz',
                name: '石家庄项目',
                component: true,
            },
        ],
    },
] satisfies CustomRoute[];
