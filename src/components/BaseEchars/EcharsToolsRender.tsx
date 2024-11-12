import React, { useState, useEffect } from 'react';
import { useEcharsTools, useIndTitle } from './EcharsToolsProvider';
import { GrComMaxDialog } from '@/components/Indicator';
import { ArrowsAltOutlined, DownloadOutlined, SwitcherOutlined } from '@ant-design/icons';
import { Table } from '@/components/BaseAntd';
import { tableExportExcel } from '@/utils/tableExportExcel';
import styles from './index.module.css';
import { RenderEchars, ChartTypeEnum } from './BaseEchars';
import _ from 'lodash';

/**
 * 定义tool的图表类型以处理不同数据
 */

export enum IEcharsToolType {
    EcharsAxis = 'EcharsAxis',
    DotPlot = 'DotPlot',
    EcharsAxisDouble = 'EcharsAxisDouble',
}

export default function EcharsToolsRender({ ...props }: any) {
    const setTools = useEcharsTools();
    const title = useIndTitle();
    const { resApi, onRender, chartRef, chartType, setChartType, option, trToolsType } = props;
    const [tableData, setTableData] = useState<any>();
    const [tableWidth, setTableWidth] = useState('100%');
    const handleChangeChartType = async () => {
        if (chartType === ChartTypeEnum.TABLE) {
            setChartType(ChartTypeEnum.DEFAULT_CHAET);
        } else {
            const width = chartRef.getChartInstance().getWidth();
            const chartData: any = onRender(resApi?.data);
            const data = marshallTableData(chartData);
            setTableWidth(width + 'px');
            setTableData(data);
            setChartType(ChartTypeEnum.TABLE);
        }
    };

    const handleDownloadChartImg = (ch: any) => {
        const image = new Image();
        image.src = ch?.getDataURL({ type: 'png', pixelRatio: 3 });
        image.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(image, 0, 0);
            const dataURL = canvas.toDataURL('image/png');
            const a = document.createElement('a');
            const event = new MouseEvent('click');
            a.download = resApi?.data[0]?.index_code_cname || '默认标题';
            a.href = dataURL;
            a.dispatchEvent(event);
        };
    };

    const handleDownload = () => {
        if (chartType === ChartTypeEnum.TABLE) {
            const chartData: any = onRender(resApi?.data);
            const { columns, dataSource } = marshallTableData(chartData);
            const title = resApi?.data[0]?.index_code_cname || '默认标题';
            tableExportExcel(columns, dataSource, title);
        } else {
            const echartInstance = chartRef.getChartInstance();
            handleDownloadChartImg(echartInstance);
        }
    };

    const getColumnDataTypeFromAxis = (xAxis: any, yAxis: any): any => {
        let columnArray;
        if (Array.isArray(xAxis) && Array.isArray(yAxis)) {
            //取第一个值去比较type
            if (xAxis[0].type === 'category') {
                columnArray = xAxis[0].data; //column data
            }
            if (yAxis[0].type === 'category') {
                columnArray = yAxis[0].data;
            }
        }
        if (_.isPlainObject(xAxis)) {
            if (xAxis.type === 'category') {
                columnArray = xAxis.data;
            }
        }
        if (_.isPlainObject(yAxis)) {
            if (yAxis.type === 'category') {
                columnArray = yAxis.data;
            }
        }
        return columnArray;
    };
    //TODO: 处理数据层次需要再次修改以支持所有类型
    const marshallTableData = (chartData: any) => {
        try {
            const columns: object[] = [
                {
                    dataIndex: 'index_code_full_cname',
                    key: 'index_code_full_cname',
                    title: '指标名称',
                },
                {
                    dataIndex: 'unit_name',
                    key: 'unit_name',
                    title: '单位',
                },
            ];
            const columnArray = getColumnDataTypeFromAxis(chartData.xAxis, chartData.yAxis);
            columnArray?.forEach((item: any) => {
                columns.push({
                    dataIndex: item,
                    key: item,
                    title: item,
                });
            });
            if (!columnArray) {
                throw new Error('表头不能为空');
            }
            const dataSource = chartData?.series.map((item: any, index: number) => {
                const parseObj: any = {};
                item?.data?.forEach((metaData: any, index: number) => {
                    if (typeof metaData !== 'object') {
                        parseObj[columnArray[index]] = metaData;
                    } else {
                        if (Array.isArray(metaData)) {
                            parseObj[metaData[0]] = metaData[1];
                        }
                        if (Array.isArray(metaData.value)) {
                            parseObj[metaData.value[0]] = metaData.value[1];
                        } else if (_.isPlainObject(metaData) && metaData.value) {
                            parseObj[columnArray[index]] = metaData.value;
                        }
                    }
                });
                return {
                    index_code_full_cname: item.name,
                    unit_name: item.unitName,
                    key: index,
                    ...parseObj,
                };
            });
            return {
                columns,
                dataSource: dataSource,
            };
        } catch (error) {
            console.log(error);
        }
    };

    const getDialogContentDom = () => {
        return chartType === ChartTypeEnum.DEFAULT_CHAET ? (
            <RenderEchars {...props} />
        ) : (
            <Table.AutoColumnWidth
                dataSource={tableData?.dataSource}
                columns={tableData?.columns}
                pagination={false}
            ></Table.AutoColumnWidth>
        );
    };

    const toolDom = (
        <div className={styles['tools']}>
            <GrComMaxDialog
                title={title}
                children={getDialogContentDom()}
                icon={<ArrowsAltOutlined title="放大" />}
                scaleValue={1.35}
            ></GrComMaxDialog>
            <DownloadOutlined onClick={handleDownload} title="下载" />
            <SwitcherOutlined onClick={() => handleChangeChartType()} title="切换" />
        </div>
    );

    useEffect(() => {
        if (trToolsType && option) {
            setTools && setTools(toolDom);
        }
    }, [resApi, option, chartType, tableData, chartRef, title]);

    useEffect(() => {
        if (resApi?.data && trToolsType && chartType === ChartTypeEnum.TABLE) {
            const chartData: any = onRender(resApi?.data);
            const data = marshallTableData(chartData);
            setTableData(data);
        }
    }, [resApi?.sign]);

    return (
        <>
            {chartType === ChartTypeEnum.TABLE ? (
                <div style={{ width: tableWidth || '100%', height: '100%', overflow: 'hidden' }}>
                    <Table.AutoColumnWidth
                        dataSource={tableData?.dataSource}
                        columns={tableData?.columns}
                        pagination={false}
                    ></Table.AutoColumnWidth>
                </div>
            ) : null}
        </>
    );
}
