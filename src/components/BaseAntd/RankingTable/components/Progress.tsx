import React from "react";
import { IndProgress2 } from '@/components/Indicator'
const ColumnProgress = (props: any) => {
    const { percent = 10, color}  = props;
    return  <IndProgress2 percent={percent} color={color}/>
}

export default ColumnProgress;


