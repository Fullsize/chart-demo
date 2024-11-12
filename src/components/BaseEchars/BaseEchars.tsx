/*
 * @Author: sungy
 * @Date: 2023-09-07 10:13:12
 * @LastEditors: zhipengHuang
 * @LastEditTime: 2024-08-21 11:22:52
 * @Description:
 */
import React, { useRef, useEffect, useState, useContext, forwardRef, useImperativeHandle } from 'react';
import * as echarts from 'echarts';
import _ from 'lodash';
import Empty from '@/components/Empty';
import Loading from '@/components/Loading';
import { EcharsThemeContext } from './EcharsThemeProvider';
import EcharsToolsRender from './EcharsToolsRender';
import colors from './theme/ectThemeFgwColors';

export type EchartMapProps = {
    option?: any;
    theme?: string;
    renderer?: any;
    config?: any;
    style?: any;
    resApi?: any;
    onRender?: any;
    setChart?: any;
    trToolsType?: string;
    ref?: any;
};

export enum ChartTypeEnum {
    TABLE = 'table',
    DEFAULT_CHAET = 'default_chart',
}

export const RenderEchars = forwardRef(function RenderEchars(
    { option, style, setChart, theme, renderer = 'canvas', ...props }: EchartMapProps,
    ref,
) {
    const domRef = useRef<HTMLDivElement>(null);
    const [ch, setCh] = useState<any>();
    const [ecTheme, setEcTheme] = useState(theme);
    const echartsTheme: any = useContext(EcharsThemeContext);

    useImperativeHandle(
        ref,
        () => ({
            getChartInstance() {
                return ch;
            },
        }),
        [ch],
    );
    useEffect(() => {
        if (theme) {
            setEcTheme(theme);
        } else {
            setEcTheme(echartsTheme);
        }
    }, [theme, echartsTheme]);

    useEffect(() => {
        let chart: any;
        if (domRef.current && ecTheme) {
            chart = echarts.init(domRef.current, ecTheme, {
                renderer: renderer,
            });
            setCh(chart);
            setChart && setChart(chart);
        }
        return () => {
            chart && chart.dispose();
        };
    }, [ecTheme]);

    useEffect(() => {
        const setO = _.debounce((option: any) => {
            ch.setOption(option, true);
        }, 50);
        if (ch && option) {
            setO(option);
        }
    }, [option, ch]);

    useEffect(() => {
        const resize = () => {
            if (ch) {
                ch.resize({
                    width: 'auto',
                    height: 'auto',
                    silent: false,
                    animation: {
                        duration: 0,
                        easing: 'linear',
                    },
                });
            }
        };

        const observer = new ResizeObserver(resize);
        if (domRef.current) {
            observer.observe(domRef.current);
        }
        window.addEventListener('resize', resize);
        return () => {
            observer && observer.disconnect();
            window.removeEventListener('resize', resize);
        };
    }, [ch]);

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                ...style,
            }}
        >
            <div ref={domRef} style={{ width: '100%', height: '100%', position: 'absolute' }}></div>
        </div>
    );
});

const ControlDisplayEchars = (props: any) => {
    const [chartType, setChartType] = useState<ChartTypeEnum>(ChartTypeEnum.DEFAULT_CHAET);
    const [chartRefState, setChartRef] = useState<any>();
    return (
        <>
            <EcharsToolsRender {...props} chartRef={chartRefState} chartType={chartType} setChartType={setChartType} />
            {chartType === ChartTypeEnum.DEFAULT_CHAET ? <RenderEchars {...props} ref={setChartRef} /> : null}
        </>
    );
};

export default function BaseEchars({ resApi, option, onRender, ...props }: EchartMapProps) {
    const [ecOption, setEcOption] = useState<any>();
    const [empty, setEmpty] = useState<any>();
    useEffect(() => {
        if (resApi?.ok === true) {
            if (resApi?.data?.empty === true) {
                const msg: any = resApi?.data?.msg;
                if (Array.isArray(msg)) {
                    setEmpty(msg.join(','));
                } else {
                    setEmpty(msg);
                }
            } else if (typeof onRender === 'function') {
                setEmpty(null);
                const o: any = onRender(resApi?.data);
                if (o) {
                    const t = o?.series?.[0]?.type;
                    if (o?.legend && o?.legend?.show != false && (t == 'line' || t == 'bar' || t == 'scatter')) {
                        const legendData: any = [];
                        o?.series?.map?.((item: any, index: any) => {
                            if (item.type === 'line') {
                                legendData.push({
                                    name: item.name,
                                    itemStyle: {
                                        color: '#FFF0',
                                    },
                                    lineStyle: {
                                        width: 3,
                                    },
                                });
                            } else {
                                legendData.push({
                                    name: item.name,
                                    itemStyle: {
                                        color: colors[index]?.[0],
                                    },
                                });
                            }
                        });
                        o.legend.data = legendData;
                    }
                    setEcOption(o);
                } else {
                    setEmpty('暂无数据');
                }
            }
        } else if (resApi?.ok === false) {
            setEmpty('数据异常,请检查接口请求');
        }
    }, [resApi?.sign]);

    useEffect(() => {
        if (typeof onRender !== 'function') {
            setEcOption(option);
        }
    }, [option]);

    if (resApi?.loading === true) {
        return <Loading></Loading>;
    } else {
        return empty ? (
            <Empty msg={empty} style={{ ...props?.style }}></Empty>
        ) : (
            <ControlDisplayEchars {...props} option={ecOption} onRender={onRender} resApi={resApi} />
        );
    }
}
