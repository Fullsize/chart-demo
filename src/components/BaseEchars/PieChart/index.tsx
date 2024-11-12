/**
 * 应用层组件
 * 显示占比以及对应的数据
 *
 */
import { EmptyOrInd, F16, Flr, GrValUnit, GrValUnit2 } from '@/components/Indicator';
import BasePieChart from './BasePieChart';
import PieLegend from  "./components/PieLegend";
import { useEffect, useMemo, useState } from 'react';
import PieText from './components/PIeText';
import _ from 'lodash';

interface Props {
    resApi: {
        ok: boolean;
        data: any[];
        sign: number;
    };
    options?: echarts.EChartsOption;
    data_deconstruction?: {
        category?: string;
        unit_name?: string;
        val?: string;
        fixed?: number;
        group_name?: string;
    };
}

//暂定只需要这3类值去归类
const defaultDataDeconstr = {
    category: 'index_code_full_cname',
    value: 'val',
    unit: 'unit_name',
};

export interface IPieDataModel {
    zb_val: number; //占比
    value: number; //值
    name: string; // 名称
    unit: string; // 单位
    progress?: string; //是否有进度条
    
    [key: string]: any; // 其他可能存在的字符
}

/**
 * 生成对应的pieData 数据 主要是处理成需要渲染的data
 * @param data
 * @param data_deconstruction
 * @returns
 */

const generatePieData = (data: any, data_deconstruction: any): IPieDataModel[] => {
    const configData = {
        ...defaultDataDeconstr,
        ...data_deconstruction,
    };
    const newData: IPieDataModel[] = data.map((item: any) => {
        return {
            ...item,
            name: item[configData.category],
            value: item[configData.value],
            unit: item[configData.unit],
        };
    });
    return newData;
};

const PieChart = (props: Props) => {
    const { data = [] } = props?.resApi;
    const [echartObj, setEchartObj] = useState<any>(null);
    const [checked, setChecked] = useState<string[]>([]);

    const [displayInfo, setDisplayInfo] = useState<any>({
        //展示饼状图中间的文字信息
    });
    const result = useMemo(() => generatePieData(data, props?.data_deconstruction), [data, props?.data_deconstruction]);

    useEffect(() => {
        const handleMouseOver = (params: any) => {
            setDisplayInfo(params.data);
        };
        const handleHighlight = (params: any) => {
            const filterObj = result.filter((item: any) => item?.name === params?.name);
            if (filterObj?.[0]) {
                setDisplayInfo(filterObj[0]);
            }
        };

        if (echartObj) {
            echartObj.on('mouseover', handleMouseOver);
            echartObj.on('highlight', handleHighlight);
        }
        return () => {
            echartObj?.off('mouseover', handleMouseOver);
            echartObj?.off('highlight', handleHighlight);
        };
    }, [echartObj, result]);
    useEffect(() => {
        if (result && result?.length > 0) {
            setDisplayInfo(result[0]);
        }
    }, [result]);
    return (
        <div
            style={{
                height: '100%',
                width: '100%',
                position: 'relative',
            }}
        >
            <EmptyOrInd apiData={props.resApi}>
                <BasePieChart data={result} setEchartObj={setEchartObj}></BasePieChart>
                <PieText displayInfo={displayInfo}></PieText>
                <PieLegend
                    checked={checked}
                    onClick={(c) => setChecked([...c])}
                    list={result}
                    // config={}
                />
            </EmptyOrInd>
        </div>
    );
};

export default PieChart;
