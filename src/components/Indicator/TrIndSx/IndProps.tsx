// 通用指标卡类型
export type HgjjCardProps = {
    apiData: any;
    titleField?: string | Array<string>;
    uniqueField?: Array<any> | string | number;
    selected?: any;
    onChange?: (v: any) => void;
    style?: React.CSSProperties;
    [key: string]: any;
};

// 通用指标卡类型-数组
export type HgjjCardArrProps = {
    apiData: any;
    titleField?: string | Array<string>;
    uniqueField?: Array<any> | string | number;
    selected?: any;
    onChange?: (v: any) => void;
    childrenStyle?: React.CSSProperties;
    style?: React.CSSProperties;
    [key: string]: any;
};
