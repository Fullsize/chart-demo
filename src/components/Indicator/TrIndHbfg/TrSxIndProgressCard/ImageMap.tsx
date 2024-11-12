/*
 * @Author: zhipengHuang
 * @Date: 2024-08-07 09:58:05
 * @LastEditors: zhipengHuang
 * @LastEditTime: 2024-08-07 10:06:20
 * @Description: 
 */
import React from "react";
import p1Url from "./image/icon01.png";
import p2Url from "./image/icon02.png";
import p3Url from "./image/icon03.png"

const mappingIcon: any = {
    省级重点项目总开工率: p1Url,
    省级重点项目存续复工率: p2Url,
    省级重点项目新建开工率: p3Url,
    省级重点项目总竣工率:p1Url,
    省级重点项目存续竣工率:p2Url,
    省级重点项目新建竣工率:p3Url,
};
const ImageMapWrapper = ({title}: {title: string}) => {
    return <img src={mappingIcon[title]} width={48}/>
}

export default ImageMapWrapper;