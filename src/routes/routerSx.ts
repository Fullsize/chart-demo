import { CustomRoute } from './path';

export default [
    {
        path: '/hgjj',
        name: '宏观经济',
        component: false,
        collapseChildren: true,
        to: '/hgjj/jjzl',
        children: [
            {
                path: '/jjzl',
                name: '经济总览',
                component: true,
                children: [
                    {
                        path: '/detail',
                        name: '地市经济总览',
                        component: true,
                        isShowInMenu: false,
                    },
                ],
            },
            {
                path: '/dqsczz',
                name: '地区生产总值',
                component: true,
            },
            {
                path: '/sccy',
                name: '三次产业',
                component: false,
                collapseChildren: true,
                to: '/hgjj/sccy/nyjjfx',
                children: [
                    {
                        path: '/nyjjfx',
                        name: '第一产业',
                        component: false,
                        to: '/hgjj/sccy/nyjjfx/ztqk',
                        children: [
                            {
                                path: '/ztqk',
                                name: '总体情况',
                                component: true,
                            },
                            {
                                path: '/nlmyy',
                                name: '农林牧渔业',
                                component: true,
                            },
                            {
                                path: '/nyjxh',
                                name: '农业机械化',
                                component: true,
                            },
                            // {
                            //     path: '/nyjgy',
                            //     name: '农业加工业',
                            //     component: true,
                            // },
                            {
                                path: '/nysdq',
                                name: '农业水电',
                                component: true,
                            },
                            {
                                path: '/ncjygl',
                                name: '农村经营管理',
                                component: true,
                            },
                            {
                                path: '/nqxx',
                                name: '农情信息',
                                component: true,
                            },
                        ],
                    },
                    {
                        path: '/gyjjfx',
                        name: '第二产业',
                        component: false,
                        to: '/hgjj/sccy/gyjjfx/ztqk',
                        children: [
                            {
                                path: '/ztqk',
                                name: '总体情况',
                                component: true,
                            },
                            {
                                path: '/zygycpcl',
                                name: '主要工业产品产量',
                                component: true,
                            },
                            {
                                path: '/zyhyzjz',
                                name: '主要行业增加值',
                                component: true,
                            },
                            {
                                path: '/gyysdq',
                                name: '工业用水电',
                                component: true,
                            },
                        ],
                    },
                    {
                        path: '/fwyjjfx',
                        name: '第三产业',
                        component: false,
                        to: '/hgjj/sccy/fwyjjfx/ztqk',
                        children: [
                            {
                                path: '/ztqk',
                                name: '总体情况',
                                component: true,
                            },
                            {
                                path: '/zyhyzjz',
                                name: '主要行业增加值',
                                component: true,
                            },
                            {
                                path: '/gsfwy10ghymlyysr',
                                name: '规上服务业10个行业门类营业收入',
                                component: true,
                            },
                            {
                                path: '/fwyysdq',
                                name: '服务业用电',
                                component: true,
                            },
                        ],
                    },
                ],
            },
            {
                path: '/sjmc',
                name: '三大需求',
                component: false,
                collapseChildren: true,
                to: '/hgjj/sjmc/tz',
                children: [
                    {
                        path: '/tz',
                        name: '投资',
                        component: false,
                        to: '/hgjj/sjmc/tz/gdzctz',
                        children: [
                            {
                                path: '/gdzctz',
                                name: '固定资产投资',
                                component: true,
                            },
                            {
                                path: '/jcsstz',
                                name: '基础设施投资',
                                component: true,
                            },
                            {
                                path: '/zzytz',
                                name: '制造业投资',
                                component: true,
                            },
                            {
                                path: '/fdckftz',
                                name: '房地产开发投资',
                                component: true,
                            },
                            {
                                path: '/sjzdxm',
                                name: '省级重点项目',
                                component: false,
                                to: '/hgjj/sjmc/tz/sjzdxm/ztqk',
                                children: [
                                    {
                                        path: '/ztqk',
                                        name: '总体情况',
                                        component: true,
                                    },
                                    {
                                        path: '/kfgqk',
                                        name: '开复工情况',
                                        component: true,
                                    },
                                    {
                                        path: '/tzqk',
                                        name: '投资情况',
                                        component: true,
                                    },
                                    {
                                        path: '/fhylyqk',
                                        name: '分行业领域',
                                        component: true,
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        path: '/xf',
                        name: '消费',
                        component: true,
                    },
                    {
                        path: '/jck',
                        name: '进出口',
                        component: false,
                        to: '/hgjj/sjmc/jck/ztqk',
                        children: [
                            {
                                path: '/ztqk',
                                name: '总体情况',
                                component: true,
                            },
                            {
                                path: '/jgfx',
                                name: '结构分析',
                                component: true,
                            },
                        ],
                    },
                ],
            },
            {
                path: '/sdsr',
                name: '三大收入',
                component: false,
                collapseChildren: true,
                to: '/hgjj/sdsr/czsz',
                children: [
                    {
                        path: '/czsz',
                        name: '财政收支',
                        component: false,
                        to: '/hgjj/sdsr/czsz/ybggyssr',
                        children: [
                            {
                                path: '/ybggyssr',
                                name: '一般公共预算收入',
                                component: true,
                            },
                            {
                                path: '/ybggyszc',
                                name: '一般公共预算支出',
                                component: true,
                            },
                        ],
                    },
                    {
                        path: '/jmsr',
                        name: '居民收入',
                        component: false,
                        to: '/hgjj/sdsr/jmsr/jmrjkzpsr',
                        children: [
                            {
                                path: '/jmrjkzpsr',
                                name: '居民人均可支配收入',
                                component: true,
                            },
                            {
                                path: '/jmrjxfzc',
                                name: '居民人均消费支出',
                                component: true,
                            },
                        ],
                    },
                    {
                        name: '企业收支',
                        path: '/qysz',
                        component: true,
                    },
                ],
            },
            {
                path: '/sdjr',
                name: '三大金融',
                component: false,
                collapseChildren: true,
                to: '/hgjj/sdjr/yh',
                children: [
                    {
                        path: '/yh',
                        name: '银行',
                        component: false,
                        to: '/hgjj/sdjr/yh/jrjgcdkqk',
                        children: [
                            {
                                path: '/jrjgcdkqk',
                                name: '金融机构存贷款情况',
                                component: true,
                            },
                            {
                                path: '/yhyjbqk',
                                name: '银行业基本情况',
                                component: true,
                            },
                            {
                                path: '/yhyxyfx',
                                name: '银行业信用风险',
                                component: true,
                            },
                        ],
                    },
                    {
                        path: '/zq',
                        name: '债券',
                        component: false,
                        to: '/hgjj/sdjr/zq/zqztqk',
                        children: [
                            {
                                path: '/zqztqk',
                                name: '债券总体情况',
                                component: true,
                            },
                            {
                                path: '/dfz',
                                name: '地方债',
                                component: true,
                            },
                            {
                                path: '/xyz',
                                name: '信用债',
                                component: true,
                            },

                            {
                                path: '/ctz',
                                name: '城投债',
                                component: true,
                            },
                            {
                                path: '/zq',
                                name: '证券',
                                component: true,
                            },
                        ],
                    },
                    {
                        path: '/bx',
                        name: '保险',
                        component: false,
                        to: '/hgjj/sdjr/bx/ybxbfsr',
                        children: [
                            {
                                path: '/ybxbfsr',
                                name: '原保险保费收入',
                                component: true,
                            },
                            {
                                path: '/ybxbfzc',
                                name: '原保险保费支出',
                                component: true,
                            },
                        ],
                    },
                ],
            },
            {
                path: '/sdzt',
                name: '三大主体',
                component: false,
                to: '/hgjj/sdzt/gyqy',
                children: [
                    {
                        path: '/gyqy',
                        name: '国有企业',
                        component: true,
                    },
                    {
                        path: '/myqy',
                        name: '民营企业',
                        component: true,
                    },
                    {
                        path: '/wstzqy',
                        name: '外商投资企业',
                        component: true,
                    },
                ],
            },
            {
                path: '/xxzb',
                name: '先行指标',
                component: false,
                to: '/hgjj/xxzb/scly',
                collapseChildren: true,
                children: [
                    {
                        path: '/scly',
                        name: '生产领域',
                        component: false,
                        to: '/hgjj/xxzb/scly/ydl',
                        children: [
                            {
                                path: '/ydl',
                                name: '用电量',
                                component: true,
                            },
                            {
                                path: '/ss',
                                name: '税收',
                                component: true,
                            },

                        ],
                    },
                    {
                        path: '/tzly',
                        name: '投资领域',
                        component: false,
                        to: '/hgjj/xxzb/tzly/xmtz',
                        children: [
                            {
                                path: '/xmtz',
                                name: '项目审批',
                                component: true,
                            },
                            {
                                path: '/gd',
                                name: '供地',
                                component: true,
                            },
                        ],
                    },
                    {
                        path: '/xfly',
                        name: '消费领域',
                        component: true,
                    },
                    {
                        path: '/ltly',
                        name: '流通领域',
                        to: '/hgjj/xxzb/ltly/gl',
                        component: false,
                        children: [
                            {
                                path: '/gl',
                                name: '公路',
                                component: true,
                            },
                            {
                                path: '/tl',
                                name: '铁路',
                                component: true,
                            },
                            {
                                path: '/jc',
                                name: '机场',
                                component: true,
                            },
                        ],
                    },
                    {
                        path: '/jgfm',
                        name: '价格方面',
                        component: true,
                    },
                ],
            },
            {
                path: '/jjdd',
                name: '经济调度',
                component: false,
                collapseChildren: true,
                to: '/hgjj/jjdd/sjdb',
                children: [
                    {
                        path: "/sjdb",
                        name: "省际对比",
                        component: true
                    },
                    {
                        path: "/ndb",
                        name: "全省总览",
                        component: true
                    },
                    {
                        path: '/dqdd',
                        name: '分地市',
                        component: true,
                    },
                    {
                        path: '/hydd',
                        name: '分领域',
                        component: true,
                    },
                    {
                        path: '/jjyc',
                        name: '经济预测',
                        component: true,
                    },
                    {
                        path: '/jjyj',
                        name: '经济预警',
                        component: false,
                        to: '/hgjj/jjdd/jjyj/ndmbyj',
                        children: [
                            {
                                path: '/ndmbyj',
                                name: '年度目标预警',
                                component: true,
                            },
                            {
                                path: '/zbydyj',
                                name: '指标异动预警',
                                component: true,
                                children: [
                                    {
                                        path: '/zbydyj_body',
                                        name: '',
                                        component: true,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        path: '/shms',
        name: '社会民生',
        component: false,
        to: '/shms/rkgm',
        children: [
            {
                path: '/rkgm',
                name: '人口规模',
                component: false,
                to: '/shms/rkgm/rkjcxx',
                children: [
                    {
                        path: '/rkjcxx',
                        name: '人口基础信息',
                        component: true,
                    },
                    {
                        path: '/ldrkxx',
                        name: '流动人口信息',
                        component: true,
                    },
                ],
            },
            {
                path: '/ldjy',
                name: '劳动就业',
                component: false,
                collapseChildren: true,
                to: '/shms/ldjy/jyqk',
                children: [
                    {
                        path: '/jyqk',
                        name: '就业情况',
                        component: true,
                    },
                    {
                        path: '/zdjyrqjc',
                        name: '重点就业人群监测',
                        component: true,
                    },
                    {
                        path: "/tsjyrqjc",
                        name: "特殊就业人群监测",
                        component: true,
                        to: '/shms/ldjy/tsjyrqjc/tyjr',
                        children: [
                            {
                                path: '/tyjr',
                                name: '退役军人',
                                component: true,
                            },
                            {
                                path: '/tyjraz',
                                name: '退役军人安置',
                                component: true,
                            },
                            {
                                path: '/tpldl',
                                name: '脱贫劳动力',
                                component: true,
                            },
                        ],
                    },
                    {
                        path: '/jyscgxfx',
                        name: '就业市场供需分析',
                        component: false,
                        to: '/shms/ldjy/jyscgxfx/ztqk',
                        children: [
                            {
                                path: "/ztqk",
                                name: "总体情况",
                                component: true,
                            },
                            {
                                path: "/hyqk",
                                name: "行业情况",
                                component: true,
                            },
                            {
                                path: "/zyqk",
                                name: "职业情况",
                                component: true,
                            },
                            {
                                path: "/nlqk",
                                name: "年龄情况",
                                component: true,
                            },
                            {
                                path: "/whcdqk",
                                name: "文化程度情况",
                                component: true,
                            },
                            {
                                path: "/jsdjqk",
                                name: "技术等级情况",
                                component: true,
                            }
                        ],
                    },
                ],
            },
            {
                path: '/jysy',
                name: '教育事业',
                component: false,
                to: '/shms/jysy/yey',
                children: [
                    {
                        path: '/yey',
                        name: '幼儿园',
                        component: true,
                    },
                    {
                        path: '/ywjy',
                        name: '义务教育',
                        component: true,
                    },
                    {
                        path: '/gzjd',
                        name: '高中阶段',
                        component: true,
                    },
                    {
                        path: '/gdjy',
                        name: '高等教育',
                        component: true,
                    },
                    {
                        path: '/tsjy',
                        name: '特殊教育',
                        component: true,
                    },
                    {
                        path: '/mbjy',
                        name: '民办教育',
                        component: true,
                    },
                ],
            },
            {
                path: '/ylws',
                name: '医疗卫生',
                component: false,
                to: '/shms/ylws/wszy',
                children: [
                    {
                        path: '/wszy',
                        name: '卫生资源',
                        component: true,
                    },
                    {
                        path: '/ylfw',
                        name: '医疗服务',
                        component: true,
                    },
                    {
                        path: '/yjcl',
                        name: '应急处理',
                        component: true,
                    },
                ],
            },
            // { 都没有页面
            //     path: '/ylbx',
            //     name: '医疗保险',
            //     component: false,
            //     to: '/shms/ylbx/cbqk',
            //     children: [
            //         {
            //             path: '/cbqk',
            //             name: '参保情况',
            //             component: true,
            //         },
            //         {
            //             path: '/jjqk',
            //             name: '基金情况',
            //             component: true,
            //         },
            //     ],
            // },
            // {
            //     path: '/ylfw',
            //     name: '养老服务',
            //     component: true,
            // },
            {
                path: '/whsy',
                name: '文化事业',
                component: false,
                collapseChildren: true,
                to: '/shms/whsy/qzwhjg',
                children: [
                    {
                        path: '/msg',
                        name: '美术馆',
                        component: true,
                    },
                    {
                        path: '/tsg',
                        name: '图书馆',
                        component: true,
                    },
                    {
                        path: '/qzwhjg',
                        name: '群众文化机构',
                        component: false,
                        to: '/shms/whsy/qzwhjg/qzwhjg',
                        children: [
                            {
                                path: '/qzwhjg',
                                name: '群众文化机构',
                                component: true,
                            },
                            {
                                path: '/sxyszyxy',
                                name: '艺术职业院校',
                                component: true,
                            },
                        ],
                    },
                    {
                        path: '/wbg',
                        name: '文博馆',
                        component: true,
                    },
                ],
            },
            {
                path: '/tysy',
                name: '体育事业',
                component: false,
                collapseChildren: true,
                to: '/shms/tysy/qzty',
                children: [
                    {
                        path: '/qzty',
                        name: '群众体育',
                        component: true,
                    },
                    {
                        path: '/jjty',
                        name: '竞技体育',
                        component: true,
                    },
                ],
            },
            {
                path: '/shbz',
                name: '社会保障',
                component: false,
                to: '/shms/shbz/yalabx',
                collapseChildren: false,
                children: [
                    //由于拼音首字母重复，加上拼音第二个字母
                    {
                        path: '/yalabx',
                        name: '养老保险',
                        component: true,
                    },
                    {
                        path: '/shyebx',
                        name: '失业保险',
                        component: true,
                    },
                    {
                        path: '/yilibx',
                        name: '医疗保险',
                        component: true,
                    },
                    {
                        path: '/gsbx',
                        name: '工伤保险',
                        component: true,
                    },
                    {
                        path: '/seyubx',
                        name: '生育保险',
                        component: true,
                    }
                ],
            },
            {
                path: "/jgjc",
                name: "价格监测", 
                component: false,
                to: "/shms/jgjc/zymsspjg",
                collapseChildren: false,
                children: [{
                    path: "/zymsspjg",
                    name:"重要民生商品价格",
                    component: true,
                }]
            }
        ],
    },
    {
        path: '/sthb',
        name: '生态环保',
        component: false,
        to: '/sthb/gtkj',
        children: [
            {
                path: '/gtkj',
                name: '国土空间',
                component: true,
            },
            {
                path: '/lsfz',
                name: '绿色发展',
                component: true,
            },
            {
                path: '/sthj',
                name: '生态环境',
                component: false,
                to: '/sthb/sthj/szyqk',
                collapseChildren: true,
                children: [
                    {
                        path: '/yhqsrhh',
                        name: '一泓清水入黄河',
                        component: true,
                    },
                    {
                        path: '/stbh',
                        name: '生态保护',
                        component: true,
                    },
                    {
                        path: '/szyqk',
                        name: '水资源情况',
                        component: true,
                    },
                    {
                        path: '/sfpfyzl',
                        name: '三废排放与治理',
                        component: true,
                    },
                    {
                        path: '/kqzl',
                        name: '空气质量',
                        component: true,
                    },
                    {
                        path: '/stjsybhtz',
                        name: '生态建设与保护投资',
                        component: true,
                    },
                ],
            },
        ],
    },
    // 暂时下架 因为该模块无数据
    {
        path: '/cxqd',
        name: '创新驱动',
        component: false,
        to: '/cxqd/cxpt',
        children: [
            {
                path: '/cxpt',
                name: '创新平台',
                component: true,

            },
            {
                path: '/qycx',
                name: '企业创新',
                component: true,

            },
            {
                path: '/kycg',
                name: '科研成果',
                component: true,
                // to: '/cxqd/kycg/zlqk',
                // children: [
                //     {
                //         path: '/zlqk',
                //         name: '专利情况',
                //         component: true,
                //     },
                //     {
                //         path: '/skxjsjlhjxm',
                //         name: '省科学技术奖励获奖项目',
                //         component: true,
                //     },
                // ],
            },

            {
                path: '/kjxs',
                name: '科教兴省',
                component: false,
                to: '/cxqd/kjxs/yey',
                children: [
                    {
                        path: '/yey',
                        name: '幼儿园',
                        component: true,
                    },
                    {
                        path: '/ywjy',
                        name: '义务教育',
                        component: true,
                    },
                    {
                        path: '/gzjd',
                        name: '高中阶段',
                        component: true,
                    },
                    {
                        path: '/gdjy',
                        name: '高等教育',
                        component: true,
                    },
                    {
                        path: '/tsjy',
                        name: '特殊教育',
                        component: true,
                    },
                    {
                        path: '/mbjy',
                        name: '民办教育',
                        component: true,
                    },
                ],
            },
            {
                path: '/rcqs',
                name: '人才强省',
                component: true,
            },
        ],
    },
    {
        path: '/nygm',
        name: '能源革命',
        component: false,
        to: '/nygm/nygj',
        children: [
            {
                path: '/nygj',
                name: '能源供给',
                component: false,
                to: '/nygm/nygj/mtgj',
                children: [
                    {
                        path: '/mtgj',
                        name: '煤炭供给',
                        component: true,
                    },
                    {
                        path: '/dlgj',
                        name: '电力供给',
                        component: true,
                    },
                    // {
                    //     path: '/fdl',
                    //     name: '发电量',
                    //     component: true,
                    // },
                    {
                        path: '/mqgj',
                        name: '非常规天然气供给',
                        component: true,
                    },
                ],
            },
            {
                path: '/nyxf',
                name: '能源消费',
                component: false,
                to: '/nygm/nyxf/nyxfzl',
                children: [
                    {
                        path: '/nyxfzl',
                        name: '能源消费总量',
                        component: true,
                    },
                    {
                        path: '/ydl',
                        name: '用电量',
                        component: true,
                    },
                ],
            },
            {
                path: '/nyjs',
                name: '能源技术',
                component: true,
            },
            {
                path: '/nytz',
                name: '能源体制',
                component: true,
            },
            {
                path: '/nydwhz',
                name: '能源对外合作',
                component: true,
            },
            {
                path: '/wdjd',
                name: '五大基地',
                component: true,
            },
        ],
    },
    {
        path: '/wlky',
        name: '文旅康养',
        component: false,
        to: '/wlky/ztqk',
        children: [
            {
                path: '/ztqk',
                name: '总体情况',
                component: true,
            },
            {
                path: '/jq',
                name: '景区',
                component: false,
                to: '/wlky/jq/ztqk',
                children: [
                    {
                        path: '/ztqk',
                        name: '景区总览',
                        component: true,
                    },
                    {
                        path: '/jq',
                        name: '景区监测',
                        component: true,
                    },
                ],
            },
        ],
    },
    {
        path: '/szjj',
        name: '数字经济',
        component: false,
        to: '/szjj/szjcnljs',
        children: [
            {
                path: '/szjcnljs',
                name: '数字基础能力建设',
                component: true,
            },
            {
                path: '/szcyh',
                name: '数字产业化',
                component: true,
            },
            {
                path: '/cyszh',
                name: '产业数字化',
                component: true,
            },
            {
                path: '/szzl',
                name: '数字治理',
                component: true,
            },
            {
                path: '/data_valorization',
                name: '数据价值化',
                component: true,
            },
        ],
    },
    {
        path: '/qyjj',
        name: '区域经济',
        component: false,
        to: '/qyjj/zdyq',
        children: [
            {
                path: '/zdyq',
                name: '开发区',
                component: false,
                to: '/qyjj/zdyq/qsyq',
                collapseChildren: false,
                children: [
                    {
                        path: '/qsyq',
                        name: '全省概览',
                        component: true,
                    },
                    {
                        path: '/dsyq',
                        name: '地市情况',
                        component: true,
                    },
                    {
                        path: '/zdyq',
                        name: '开发园区',
                        component: true,
                    },
                ],
            },
            {
                path: '/qydb',
                name: '区域对比',
                component: false,
                to: '/qyjj/qydb/sjdb',
                children: [
                    {
                        path: '/sjdb',
                        name: '省际对比',
                        component: true,
                    },
                    {
                        path: '/sngdsdb',
                        name: '省内各地市对比',
                        component: true,
                    },
                    {
                        path: '/zblsdb',
                        name: '中部六省对比',
                        component: true,
                    },
                ],
            },
            {
                path: '/zyz',
                name: '专业镇',
                component: true,
            },
            {
                path: '/zdsq',
                name: '重点商圈',
                component: false,
                to: '/qyjj/zdsq/qssq',
                children: [
                    {
                        path: '/qssq',
                        name: '全省商圈',
                        component: true,
                    },
                    {
                        path: '/cssq',
                        name: '城市商圈',
                        component: true,
                    },
                    {
                        path: '/zdsq',
                        name: '重点商圈',
                        component: true,
                    },
                    {
                        path: '/sqdb',
                        name: '商圈对比',
                        component: true,
                    },
                ],
            },
            {
                path: '/jq',
                name: '景区',
                component: true,
            },
            {
                path: '/jtsn',
                name: '交通枢纽',
                component: true,
            },
        ],
    },
    {
        path: '/zdcyl',
        name: '重点产业链',
        component: true,
    },
    {
        path: '/sjjb',
        name: '数据简报',
        component: true,
        to: '/sjjb',
    },
] satisfies CustomRoute[];
