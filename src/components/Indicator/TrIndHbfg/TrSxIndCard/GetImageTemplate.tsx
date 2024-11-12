/*
 * @Author: zhipengHuang
 * @Date: 2024-08-02 18:17:25
 * @LastEditors: zhipengHuang
 * @LastEditTime: 2024-09-05 19:42:06
 * @Description: 根据indexCode 来获取图片
 */
import React from 'react';
import defaultIcon1 from './image/defaultIcon1.png';
import defaultIcon2 from './image/defaultIcon2.png';
import icon3 from './image/icon03.png';
import icon4 from './image/icon04.png';
import icon5 from './image/icon05.png';
import icon6 from "./image/country.png";
import icon7 from "./image/country2.png";
import icon8 from "./image/guojiafeiyi.png";
import icon9 from "./image/school.png";
import icon10 from "./image/house.png";
import icon11 from "./image/bed.png";
import icon12 from "./image/xiangcunlvyou.png";
import icon13 from "./image/hongselvyou.png";
import icon14 from "./image/farmerIn.png";
import icon15 from "./image/farmerOut.png";
import icon16 from "./image/takeaway.png";
import icon17 from "./image/truck.png";
import icon18 from "./image/intcar.png";
import icon19 from "./image/courier.png";
import icon20 from "./image/student.png";
import icon21 from "./image/local.png";
import icon22 from "./image/local2.png";
import icon23 from "./image/local3.png";
import icon24 from "./image/local4.png";
import icon25 from "./image/jiuyeguimo.png";
import icon26 from "./image/zhinenghuameikuang.png";
import icon27 from "./image/chart.png";
import icon28 from "./image/shuziwenlv1.png";
import icon29 from "./image/shuziwenlv2.png";
import icon30 from "./image/shuziwenlv3.png";
import icon31 from "./image/shuziwenlv4.png";
import icon32 from "./image/pai.png";
import icon33 from "./image/guoyidashi.png";
import icon34 from "./image/zhongyiyao.png";
import icon35 from "./image/quanguomingzhongyi.png";
import icon36 from "./image/shanxizhongyi.png";
interface IImageWrapperProps {
    indexCode?: string;
    type?: string;
    style?: any;
}

const imageMap: any = {
    ZB002501: defaultIcon1,
    ZB002502: defaultIcon2,
    ZB002510: icon3,
    ZB00250201: icon4,
    ZB002509: icon5,
    ZB00250111: defaultIcon1,
    "ZB0026300201": icon6,
    "ZB0026300101": icon7,
    "ZB0026300102": icon8,
    "ZB001807": icon9,
    "ZB00180901": icon10,
    "ZB00180902": icon11,
    "ZB00181702": icon12,
    "ZB00181701": icon13,
    "农民工流出": icon14,
    "农民工流入": icon15,
    "外卖小哥人数": icon16,
    "网约车司机人数": icon18,
    "货车司机人数": icon17,
    "快递员人数": icon19,
    "毕业生规模": icon20,
    "本地居留规模":icon21,
    "本地留存率": icon22,
    "流出规模": icon23,
    "流入规模": icon24,
    "就业规模": icon25,
    "ZB001529290101": icon26,
    "ZB001529290501": icon27,
    "ZB001529290502": icon27,
    "ZB001529290503": icon27,
    "ZB001529290504": icon27,
    "ZB001529290601": icon28,
    "ZB001529290602": icon29,
    "ZB001529290603": icon30,
    "ZB001529290604": icon31,
    "ZB0029081201": icon32,
    "ZB0029081202": icon32,
    "ZB0023020701": icon33,
    "ZB0023020702": icon34,
    "ZB0023020703": icon35,
    "ZB0023020704": icon36,
};

const getImageUrl = (indexCode?: string): string => {
    if (indexCode) {
        return imageMap[indexCode];
    }
    return defaultIcon1;
};

const ImageWrapper = (props: IImageWrapperProps) => {
    const { indexCode, style, type = "1" } = props;
    const url: string = getImageUrl(indexCode) || (type == "1" ? defaultIcon1 : defaultIcon2);
    return <img src={url} alt="" style={{ ...style }} />;
};

export default ImageWrapper;
