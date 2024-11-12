import type React from 'react';
import { FlaIndTitle18, Flr, Flc, F18, GrValUnit, IndProgress2 } from '@/components/Indicator';
import { IApiResponse, PropsWithStyle } from '@/utils/types';
import styles from './index.module.css';

export interface TrSxCompareCardApiData {
    index_code_full_cname: string;
    unit_name: string;
    type_code: string;
    val: number;
    index_code_full_type_name: string;
    type: string;
    time_code: string;
    [key: string]: string | number;
}

export interface TrSxCompareCardProps {
    apiData: IApiResponse<Array<TrSxCompareCardApiData>>;
    // 颜色配置
    legend?: CompareCardLegend;
    fieldNames?: Record<string, string>;
}

interface CompareCardLegend {
    equal?: { label?: string; color?: string };
    more?: { label?: string; color?: string };
    less?: { label?: string; color?: string };
}

const CardLegend: React.FC<{ legendOptions: CompareCardLegend }> = ({ legendOptions }) => (
    <Flr gap={20} justifyContent="flex-start">
        <Flr gap={5}>
            <div className={styles['card-legend']} style={{ backgroundColor: legendOptions.equal?.color }}></div>
            <span>{legendOptions.equal?.label}</span>
        </Flr>
        <Flr gap={5}>
            <div className={styles['card-legend']} style={{ backgroundColor: legendOptions.more?.color }}></div>
            <span>{legendOptions.more?.label}</span>
        </Flr>
        <Flr gap={5}>
            <div className={styles['card-legend']} style={{ backgroundColor: legendOptions.less?.color }}></div>
            <span>{legendOptions.less?.label}</span>
        </Flr>
    </Flr>
);

interface CompareCardData {
    target: {
        name: string;
        value: number;
        unit: string;
    };
    actual: {
        name: string;
        value: number;
        unit: string;
    };
}

const CompareCard: React.FC<{ data: CompareCardData; legendOptions: CompareCardLegend }> = ({
    data,
    legendOptions,
}) => {
    const { target, actual } = data;
    // 标注映射
    const actualLegend =
        actual.value === target.value
            ? legendOptions.equal
            : actual.value > target.value
                ? legendOptions.more
                : legendOptions.less;
    // 计算百分比
    const targetPercent = target.value !== 0 ? 100 : 0;
    let actualPercent = target.value !== 0 ? (actual.value / target.value) * 100 : 0;
    if (actualPercent > 100) actualPercent = 100;
    if (actualPercent < 0) actualPercent = 0;
    // 是否显示结果标签
    const showLabel = targetPercent !== 0 && actualPercent !== 0;

    return (
        <Flc gap={20}>
            <Flc gap={10}>
                <Flr>
                    <F18>{target.name}</F18>
                    <GrValUnit value={target.value || '--'} unit={target.unit}></GrValUnit>
                </Flr>
                <IndProgress2 percent={targetPercent} color={legendOptions.equal?.color}></IndProgress2>
            </Flc>
            <Flc gap={10}>
                <Flr>
                    <F18>
                        {actual.name}
                        {showLabel && (
                            <span
                                style={{
                                    backgroundColor: actualLegend?.color,
                                    color: '#FFFFFF',
                                    borderRadius: '5px',
                                    fontSize: 16,
                                    padding: '0 5px',
                                    marginLeft: 10,
                                }}
                            >
                                {`${actual.value === target.value ? '完成' : ''}${actualLegend?.label}`}
                            </span>
                        )}
                    </F18>
                    <GrValUnit value={actual.value || '--'} unit={actual.unit}></GrValUnit>
                </Flr>
                <IndProgress2 percent={actualPercent} color={actualLegend?.color}></IndProgress2>
            </Flc>
        </Flc>
    );
};

const createLegend = (indicatorName: string, legendOption: CompareCardLegend): Required<CompareCardLegend> => {
    return {
        equal: {
            label: legendOption.equal?.label || indicatorName,
            color: legendOption.equal?.color || '#00A1FF',
        },
        more: {
            label: legendOption.more?.label || `好于${indicatorName}`,
            color: legendOption.more?.color || '#AC272E',
        },
        less: {
            label: legendOption.less?.label || `低于${indicatorName}`,
            color: legendOption.less?.color || '#54AC59',
        },
    };
};

const defaultFieldNames: Record<string, string> = {
    legendLabel: 'index_code_full_type_name',
    time: 'time_code',
    name: 'index_code_full_cname',
    value: 'val',
    unit: 'unit_name',
};

export const TrSxCompareCard: React.FC<PropsWithStyle<TrSxCompareCardProps>> = ({
    apiData,
    legend = {},
    fieldNames = defaultFieldNames,
    style,
}) => {
    if (!Array.isArray(apiData.data)) {
        return <div>比对数据不是数组</div>;
    }
    if (apiData.data.length < 2) {
        return <div>比对数据长度小于2</div>;
    }
    const [targetApiData, actualApiData] = apiData.data;

    const legendOption = createLegend(`${targetApiData[fieldNames.legendLabel]}`, legend);

    const target = {
        name: `${targetApiData[fieldNames.name]}(${targetApiData[fieldNames.time]})`,
        value: Number(targetApiData[fieldNames.value]),
        unit: `${targetApiData[fieldNames.unit]}`,
    };
    const actual = {
        name: `${actualApiData[fieldNames.name]}(${actualApiData[fieldNames.time]})`,
        value: Number(actualApiData[fieldNames.value]),
        unit: `${actualApiData[fieldNames.unit]}`,
    };

    return (
        <FlaIndTitle18 title="" style={{ ...style }}>
            <Flc gap={30} style={{ width: '100%', height: '100%' }}>
                <CardLegend legendOptions={legendOption} />
                <CompareCard legendOptions={legendOption} data={{ target, actual }}></CompareCard>
            </Flc>
        </FlaIndTitle18>
    );
};
