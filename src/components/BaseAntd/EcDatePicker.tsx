import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { DatePicker, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Flr, Flc, F14B } from '@/components/Indicator';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import weekOfMonth from './plugin/weekOfMonth';
import yearOfMonth from './plugin/yearOfMonth';

import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isoWeek from 'dayjs/plugin/isoWeek';
import weekday from 'dayjs/plugin/weekday'; // 导入 weekday 插件
import localeData from 'dayjs/plugin/localeData';

import { useLocation } from 'react-router-dom';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { generateAntdDatePresets, getAllWeekTime } from './utils';
import { isEmpty } from 'lodash';

dayjs.locale('zh-cn');
dayjs.extend(advancedFormat);
dayjs.extend(quarterOfYear);
dayjs.extend(yearOfMonth);
dayjs.extend(weekOfYear);
dayjs.extend(weekday); // 使用 weekday 插件
dayjs.extend(isoWeek);
dayjs.extend(localeData);
dayjs.extend(weekOfMonth);

// 年、季、月、年/周、月/周、日
// 年 2023
// 季 20233          |  2023-Q3
//    2023Q3         |  2023-Q3

// 月 202301         |  2023-12
//    202312         |  2023-12

// 周 2023001   [年] |  2023-1周
//    2023043   [年] |  2023-43周

// 周 202309003 [月] |  2023-09月 第3周

// 日 20230102       |  2023-01-02
//    20231201       |  2023-12-01

const FM = ['YYYY', 'YYYY-[Q]Q', 'YYYY-MM', 'YYYY-第YW周', 'YYYY-MM月 第MW周', 'YYYY-MM-DD'];
const FO = ['YYYY', 'YYYYQ', 'YYYYMM', 'YYYY0YW', 'YYYYMM000MW', 'YYYYMMDD'];
const FP = ['year', 'quarter', 'month', 'week', 'weekMonth', 'date'];

const MF = ['year', 'quarter', 'month', 'week', 'week', 'date'];
function formatOutDate(df: any): any {
    const [data, index] = df;
    if (Array.isArray(data)) {
        return [formatOutDate([data[0], index]), formatOutDate([data[1], index])];
    } else {
        const outData: any = {};
        for (let i = 0; i < FO.length; i++) {
            if (i <= index) {
                outData[FP[i]] = data.format(FO[i]);
                outData[FP[i] + 'Format'] = data.format(FM[i]);
            }
            if (i == 3) {
                outData[FP[4]] = data.format(FO[4]);
                outData[FP[4] + 'Format'] = data.format(FM[4]);
            }
        }
        return outData;
    }
}

function formatInDate(data: string | number, isEnd = false) {
    const dataStr = data?.toString();
    if (!dataStr) {
        return;
    }
    let d;
    let f;

    if (dataStr.includes('Q')) {
        // 季
        const year = dataStr.slice(0, 4);
        const quarter = parseInt(dataStr.slice(5, 6));
        d = dayjs(year, 'YYYY').quarter(quarter).format('YYYY-[Q]Q');
        f = 1;
    } else if (dataStr.length == 7) {
        // 周
        const year = dataStr.slice(0, 4);
        const week = dataStr.slice(5, dataStr.length);
        d = dayjs(year, 'YYYY').week(Number(week));
        f = 3;
    } else if (dataStr.length == 4) {
        // 年
        d = dayjs(dataStr, 'YYYY');
        f = 0;
    } else if (dataStr.length == 5) {
        // 季
        const year = dataStr.slice(0, 4);
        const quarter = parseInt(dataStr.slice(4, 5));
        d = dayjs(year, 'YYYY').quarter(quarter);
        f = 1;
    } else if (dataStr.length == 6) {
        // 月
        d = dayjs(dataStr, 'YYYYMM');
        f = 2;
    } else if (dataStr.length == 8) {
        // 日
        f = 5;
        d = dayjs(dataStr, 'YYYYMMDD');
    } else if (dataStr.length == 10) {
        // 月-周
        f = 4;
        const month = dataStr.slice(0, 6);
        const week = dataStr.slice(9, 10);
        const data: any = dayjs(month, 'YYYYMM');

        if (isEnd) {
            d = data.endDataOnWeekMonth(week);
        } else {
            d = data.startDataOnWeekMonth(week);
        }
    } else {
        return null;
    }
    return [d, f];
}

function formatStartTime(data: string | number) {
    return formatInDate(data);
}
function formatEndTime(data: string | number) {
    return formatInDate(data, true);
}

const DateError = ({ children, error, picker }: any) => {
    return (
        <>
            {error ? (
                <Tooltip
                    placement="right"
                    title={() => {
                        return (
                            <Flr alignItems="flex-start" padding="2px 10px 2px 2px">
                                <QuestionCircleOutlined
                                    style={{
                                        color: 'orange',
                                        marginTop: 4,
                                        marginRight: 6,
                                    }}
                                />
                                <Flc>
                                    <F14B>{`无法转换时间维度-${picker}`}</F14B>
                                    {`请选择:[${error}]中的维度`}
                                </Flc>
                            </Flr>
                        );
                    }}
                    open={error ? true : false}
                >
                    {children}
                </Tooltip>
            ) : (
                children
            )}
        </>
    );
};
// 日期选择
const AntdDatePicker = ({ date, style, onChange, picker, ...props }: any) => {
    const [df, setDf] = useState<any>();
    const [error, setError] = useState<any>();
    const [dRange, setDRange] = useState<Array<any>>();

    useEffect(() => {
        if (!date) {
            return;
        }
        const { current_value, start_time, end_time } = date;
        const fc: any = formatInDate(current_value);
        const fs: any = formatStartTime(start_time);
        const fe: any = formatEndTime(end_time);
        if (!fc) {
            return;
        }
        let isErr = false;
        const errTr = [];
        if (picker) {
            for (let i = 0; i < FP.length; i++) {
                const element = FP[i];
                if (picker == element) {
                    if (i <= fc[1]) {
                        fc[1] = i;
                        isErr = false;
                        break;
                    } else {
                        isErr = true;
                        break;
                    }
                }
                if (i <= fc[1]) {
                    errTr.push(element);
                }
            }
        }
        if (isErr) {
            setError(errTr.join(','));
        } else {
            setError(null);
        }
        setDf(fc);
        setDRange([fs?.[0], fe?.[0]]);
    }, [date, picker]);

    useEffect(() => {
        if (df?.[0]) {
            const dataStr = df[0].format(FO[df[1]]);
            onChange?.(dataStr, formatOutDate(df));
        }
    }, [df]);

    return (
        <DateError picker={picker} error={error}>
            <DatePicker
                style={{ width: 150, ...style }}
                {...props}
                disabled={error ? true : false}
                value={df?.[0]}
                onChange={(date) => {
                    const d = [...(df ?? [])];
                    d[0] = date;
                    setDf(d);
                }}
                allowClear={false}
                format={FM[df?.[1]]}
                picker={MF[df?.[1]]}
                disabledDate={(v: any) => {
                    if (dRange && (dayjs(v) < dRange[0] || dayjs(v) > dRange[1])) {
                        return true;
                    }
                    return false;
                }}
            />
        </DateError>
    );
};
// 日期范围选择
const AntdRangePicker = ({ date, style, onChange, picker, ...props }: any) => {
    const [df, setDf] = useState<any>();
    const [error, setError] = useState<any>();
    const [dRange, setDRange] = useState<Array<any>>();

    useEffect(() => {
        if (!date) {
            return;
        }

        const { start_default_time, end_default_time, start_time, end_time } = date;
        const fds: any = formatStartTime(start_default_time);
        const fde: any = formatEndTime(end_default_time);

        const fs: any = formatStartTime(start_time);
        const fe: any = formatEndTime(end_time);
        if (!fds || !fde) {
            return;
        }
        let isErr = false;
        const errTr = [];
        if (picker) {
            for (let i = 0; i < FP.length; i++) {
                const element = FP[i];
                if (picker == element) {
                    if (i <= fds[1]) {
                        fds[1] = i;
                        isErr = false;
                        break;
                    } else {
                        isErr = true;
                        break;
                    }
                }
                if (i <= fds[1]) {
                    errTr.push(element);
                }
            }
        }
        if (isErr) {
            setError(errTr.join(','));
        } else {
            setError(null);
        }
        setDf([[fds[0], fde[0]], fds[1]]);
        setDRange([fs?.[0], fe?.[0]]);
    }, [date, picker]);

    useEffect(() => {
        if (df?.[0]) {
            const data1Str = df[0][0].format(FO[df[1]]);
            const data2Str = df[0][1].format(FO[df[1]]);
            onChange && onChange([data1Str, data2Str], [formatOutDate(df)]);
        }
    }, [df]);

    return (
        <DateError picker={picker} error={error}>
            <DatePicker.RangePicker
                style={{ width: 250, ...style }}
                {...props}
                disabled={error ? true : false}
                value={df?.[0]}
                onChange={(date) => {
                    const d = [...(df ?? [])];
                    d[0] = date;
                    setDf(d);
                }}
                allowClear={false}
                format={FM[df?.[1]]}
                picker={MF[df?.[1]]}
                disabledDate={(v: any) => {
                    if (dRange && (dayjs(v) < dRange[0] || dayjs(v) > dRange[1])) {
                        return true;
                    }
                    return false;
                }}
            />
        </DateError>
    );
};

const nowApiData = {
    current_value: dayjs().format('YYYYMMDD'),
    end_time: dayjs().format('YYYYMMDD'),
    start_time: dayjs().subtract(1, 'year').format('YYYYMMDD'),
    disable_dates: null,
};

const EcDatePickerType = ({ apiData, ...props }: any) => {
    const [pickerType, setPickerType] = useState<any>();
    const [presets, setPresets] = useState<any>();
    useEffect(() => {
        if (apiData?.ok) {
            let data = Array.isArray(apiData.data) ? apiData.data[0] : apiData.data;
            const { end_default_time, start_default_time, current_value, start_time, end_time } = data ?? {};

            const getFormat = (presetType: PresetType) => {
                if (!presetType) return 'YYYYMMDD';

                if (['date', 'week', 'allWeek'].includes(presetType)) {
                    return 'YYYYMMDD';
                }
                if (presetType == 'month') {
                    return 'YYYYMM';
                }
                if (presetType == 'year') {
                    return 'YYYY';
                }
                return 'YYYY';
            };

            if (end_default_time || start_default_time) {
                if (props.presetType) {
                    const pressetList = getPresset(
                        props.presetType,
                        start_time.toString(),
                        end_default_time.toString(),
                    );

                    if (!isEmpty(pressetList[0])) {
                        const [start, end] = pressetList[0].value;
                        const format = getFormat(props.presetType);

                        setPickerType({
                            type: 'RangePicker',
                            date: {
                                ...data,
                                start_time: null,
                                default_time: Number(dayjs(end).format(format)),
                                end_default_time: Number(dayjs(end).format(format)),
                                end_time: Number(dayjs(end).format(format)),
                                start_default_time: Number(dayjs(start).format(format)),
                            },
                        });
                    }
                } else {
                    setPickerType({
                        type: 'RangePicker',
                        date: data,
                    });
                }
            } else {
                if (current_value == null || !data) {
                    data = { ...nowApiData };
                }

                setPickerType({
                    type: 'DatePicker',
                    date: data,
                });
            }
        }
    }, [apiData?.sign, props.presetType]);

    const getPresset = (presetType: PresetType, startTime: string | number, currentTime: string | number) => {
        if (!presetType || !currentTime) return [];

        const presset = generateAntdDatePresets(presetType, startTime.toString(), currentTime.toString());
        setPresets(presset);

        return presset;
    };

    const picker = useMemo(() => {
        if (!props.presetType) return null;

        if (['date', 'week'].includes(props.presetType)) {
            return 'date';
        }
        if (props.presetType == 'allWeek') {
            return 'week';
        }
        return props.presetType;
    }, [props.presetType]);

    return (
        <>
            {pickerType?.type == 'DatePicker' && <AntdDatePicker date={pickerType.date} {...props} />}
            {pickerType?.type == 'RangePicker' && (
                <AntdRangePicker date={pickerType.date} presets={presets} picker={picker} {...props} />
            )}
        </>
    );
};

export type PresetType = 'date' | 'week' | 'month' | 'year' | 'allWeek' | undefined;

export const EcDatePicker = ({
    fixedPosition = false,
    style,
    ...props
}: {
    fixedPosition?: boolean;
    style?: React.CSSProperties;
    presetType?: PresetType;
    [key: string]: any;
}) => {
    const location = useLocation();
    const [p, setP] = useState({});
    useEffect(() => {
        if (fixedPosition === true) {
            const p = location.pathname.split('/');
            let s = {};
            if (p?.[1] == 'jjtsgz') {
                s = { position: 'fixed', right: 20, top: '-100%' };
            } else if (p.length > 2) {
                s = { position: 'fixed', right: 20, top: 125 };
            } else {
                s = { position: 'fixed', right: 20, top: 60 };
            }
            setP(s);
        }
    }, [location, fixedPosition]);
    return <EcDatePickerType style={{ ...style, ...p }} {...props}></EcDatePickerType>;
};
