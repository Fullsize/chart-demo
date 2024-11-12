/**
 * 时间接口返回参数，非range 模式
 */
export type IDateResponseType = {
    current_value: string | number; // 202403,
    end_time?: number; // 202403,
    start_time?: number; // 201801,
    disable_dates?: unknown;
}[];
