import React, { useMemo, useState } from 'react';
import { CircularProgress } from '@/components/BaseEchars';
import _, { template } from 'lodash';
import * as echarts from 'echarts';
import { EmptyOrInd, ProgressIndicator } from '@/components/Indicator';
interface Props {
    resApi: {
        ok: boolean;
        data: any;
        sign: number;
    };
    style?: React.CSSProperties;
    abs?: boolean;
    progress?: boolean;
    mode?: 'simpler';
    options?: echarts.EChartsOption;
    data_deconstruction?: {
        category?: string;
        unitName?: string;
        val?: string;
        fixed?: number;
        groupName?: string;
        filter?: string;
        fullName?: string;
        bizhong?: string;
        bizhongSortBy? :string;
    };
    autoPercent?: boolean;
}

const getMergeArrList = (autoPercent: boolean, data: any) => {
    if(autoPercent) {
        const [array1, array2] = _.partition(data, (item) => item.bizhong.indexOf("比重") > -1);
        array2.forEach(item => {
            const obj = array1.find(e=>{
                return e.bizhongSortBy === item.bizhongSortBy;
            });
            if(obj){
                item.percent = obj.value;
            } 
        })
       return array2;
    }else {
        return data;
    }

}



const Pie = (props: Props) => {
    const [checked, setChecked] = useState<string[]>([]);
    const {
        progress = true,
        data_deconstruction = {
            category: 'index_code_full_cname',
            unitName: 'unit_name',
            val: 'val',
            fixed: 2,
            groupName: 'time_name',
            filter: 'type_code',
            bizhong: "index_code_cname",
            bizhongSortBy: "groupCode",
        },
        mode,
    } = props;
    const aa = {
        category: 'index_code_full_cname',
        unitName: 'unit_name',
        val: 'val',
        fixed: 2,
        groupName: 'time_name',
        filter: 'type_code',
        fullName: 'index_code_full_type_name',
        groupCode: 'groupCode',
        bizhongSortBy: "groupCode",
        bizhong: "index_code_cname",
        ...data_deconstruction,
    };
    const data = useMemo(() => {
        const aa = {
            category: 'index_code_full_cname',
            unitName: 'unit_name',
            val: 'val',
            fixed: 2,
            groupName: 'time_name',
            filter: 'type_code',
            fullName: 'index_code_full_type_name',
            groupCode: 'groupCode',
            bizhong: "index_code_full_cname",
            bizhongSortBy: "groupCode",
            ...data_deconstruction,
        };
        if (Array.isArray(props.resApi?.data)) {
            return props.resApi?.data?.map((item) => ({
                filter: item[aa.filter] ?? aa.filter,
                name: item[aa.category],
                value: item[aa.val],
                unit: item[aa.unitName],
                groupName: item[aa.groupName ?? ''],
                groupCode: item[aa.groupCode ?? ''],
                fullName: item[aa.fullName] ?? '',
                bizhong: item[aa.bizhong]?? "",
                bizhongSortBy: item[aa.bizhongSortBy] ?? "",
            }));
        }
        return props.resApi?.data;
    }, [props.resApi?.data]);
    const types = _.uniqBy(data, 'filter');

    const pieData = useMemo(() => {
        if (!_.isArray(data)) {
            return data;
        }
        let newData = data;
        if (types.length > 1) {
            newData = _.filter(data, (o) => o.filter === 'LX0301');
        }
        // 输出合并后的数据
        const mergedData: any = getMergeArrList(props?.autoPercent || false, newData);
        return mergedData?.map((item: any, i: number) => ({
            ...item,
            dataIndex: i,
            percent: item?.percent
                ? item.percent
                : (
                      (item.value /
                          _.sumBy(newData, function (o: any) {
                              return _.toNumber(o.value);
                          })) *
                      100
                  ).toFixed(2),
        }));
    }, [data]);
    const prsData = useMemo(() => {
        if (!_.isArray(data)) {
            return data;
        }
        return _.filter(data, (o) => o.filter === 'LX0303');
    }, [data]);
    return (
        <div style={{ display: types.length > 1 ? 'flex' : 'block', width: '100%', height: '100%', ...props.style }}>
            {mode === 'simpler' && (
                <>
                    <CircularProgress.simpler abs={props.abs} data={pieData} options={props.options} />
                </>
            )}
            {mode !== 'simpler' && (
                <>
                    {types.length > 1 && (
                        <>
                            <CircularProgress
                                abs={props.abs}
                                checked={checked}
                                data={pieData}
                                options={props.options}
                            />
                            <ProgressIndicator
                                progress={progress}
                                checked={checked}
                                onClick={(c) => setChecked([...c])}
                                list={prsData}
                            />
                        </>
                    )}
                    {types.length < 2 && (
                        <CircularProgress.all options={props.options} abs={props.abs} data={pieData} />
                    )}
                </>
            )}
        </div>
    );
};

const EcharsPie = ({ resApi, ...props }: Props) => {
    return (
        <EmptyOrInd apiData={resApi}>
            {Array.isArray(resApi?.data) && <Pie resApi={resApi} {...props}></Pie>}
        </EmptyOrInd>
    );
};
EcharsPie.allType = (props: Props) => {
    const [checked, setChecked] = useState<string[]>([]);
    const {
        progress = true,
        data_deconstruction = {
            category: 'index_code_full_cname',
            unitName: 'unit_name',
            val: 'val',
            fixed: 2,
            groupName: 'time_name',
            filter: 'type_code',
            bizhongSortBy: "groupCode",
            bizhong: "index_code_full_cname",
        },
        mode,
    } = props;
    const aa = {
        category: 'index_code_full_cname',
        unitName: 'unit_name',
        val: 'val',
        fixed: 2,
        groupName: 'time_name',
        filter: 'type_code',
        fullName: 'index_code_full_type_name',
        bizhong: "index_code_full_cname",
        bizhongSortBy: "groupCode",
        ...data_deconstruction,
    };
    const data = useMemo(() => {
        if (Array.isArray(props.resApi?.data)) {
            return props.resApi?.data?.map((item) => ({
                filter: item[aa.filter] ?? aa.filter,
                name: item[aa.category],
                value: item[aa.val],
                unit: item[aa.unitName],
                groupName: item[aa.groupName ?? ''],
                fullName: item[aa.fullName] ?? '',
                bizhong: item[aa.bizhong]?? "",
                bizhongSortBy: item[aa.bizhongSortBy] ?? "",
            }));
        }
        return props.resApi?.data;
    }, [props.resApi?.data]);
    const types = _.uniqBy(data, 'filter');
    const pieData = useMemo(() => {
        if (!_.isArray(data)) {
            return data;
        }
        let newData = getMergeArrList(props?.autoPercent || false,data);
        if (types.length > 1) {
            newData = _.filter(data, (o) => o.filter === 'LX0301');
        }
        return newData?.map((item: any, i: number) => ({
            ...item,
            dataIndex: i,
            percent: item?.percent
                ? item.percent
                : (
                      (item.value /
                          _.sumBy(newData, function (o: any) {
                              return _.toNumber(o.value);
                          })) *
                      100
                  ).toFixed(2),
        }));
    }, [data]);

    return (
        <EmptyOrInd apiData={props.resApi}>
            <CircularProgress.allTye abs={props.abs} checked={checked} data={pieData} options={props.options} />
        </EmptyOrInd>
    );
};
export default EcharsPie;
