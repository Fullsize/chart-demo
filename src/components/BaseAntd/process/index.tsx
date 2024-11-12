/*
 * @Author: zhipengHuang
 * @Date: 2024-08-06 18:52:46
 * @LastEditors: zhipengHuang
 * @LastEditTime: 2024-08-28 16:25:17
 * @Description: 圆形进度条 基于antd-progress 扩展
 */
import React, { ReactElement } from 'react';
import { Progress, ProgressProps } from 'antd';

interface IBaseProgress extends ProgressProps {
    customdom?: ReactElement
}

const BaseCircleProgress = (props: IBaseProgress) => {
    const { customdom } = props;
    const formatContent = (percent?: number) => {
        return customdom ?  customdom : <div style={{fontFamily: "D-DIN"}}>{percent + "%"}</div>
    }
    return <Progress type="circle" format={formatContent} {...props}></Progress>
}

export default BaseCircleProgress;
