import _ from 'lodash';
import { trDataDeconstruction } from './trDataDeconstruction';

const defaultSankeyConfig = {
    source: 'group_name',
    target: 'index_name',
    val: 'val',
    unitName: 'unit_name',
};

export function trToEcharsSankey(apiData: Array<any>, config: any = {}, custonOption?: any) {
    if (!(Array.isArray(apiData) && apiData?.length > 0)) {
        return;
    }
    const trConfig = _.defaultsDeep(config, defaultSankeyConfig);

    const nodeMap: any = new Map();
    const linksArr: any = [];
    apiData?.map?.((item: any) => {
        const { source, target, val } = trDataDeconstruction(item, trConfig);
        if (source && target) {
            if (!nodeMap.has(source)) {
                nodeMap.set(source, {
                    label: {
                        show: false,
                    },
                    name: source,
                });
            }
            if (!nodeMap.has(target)) {
                nodeMap.set(target, {
                    label: {
                        show: true,
                        distance: -26,
                        fontSize: 22,
                        formatter: function (params: any) {
                            return params.name.split('').join('\n\n');
                        },
                    },
                    name: target,
                });
            }

            linksArr.push({
                source: source,
                target: target,
                value: val,
                lineStyle: {
                    color: 'source',
                    curveness: 0.5,
                    opacity: 0.5,
                },
            });
        }
    });

    const o: any = {
        tooltip: {
            trigger: 'item',
            formatter: function (params: any) {
                const unitName = apiData?.[params.dataIndex]?.[trConfig['unitName']];
                return `${params.marker}${params.name}   <span><b>${params.value}</b> ${unitName}</span>
                        `;
            },
        },
        series: [
            {
                type: 'sankey',
                top: '0',
                bottom: '0',
                left: '0',
                right: '0',
                nodeGap: 10,
                nodeWidth: 30,
                layoutIterations: 0,
                emphasis: {
                    focus: 'adjacency',
                },
                draggable: false,
                nodes: Array.from(nodeMap.values()),
                links: linksArr ?? [],
            },
        ],
    };

    if (custonOption) {
        return _.defaultsDeep(custonOption, o);
    } else {
        return o;
    }
}
