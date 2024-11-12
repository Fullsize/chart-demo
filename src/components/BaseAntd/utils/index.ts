import dayjs from 'dayjs';
import { datePresets, weekPresets, monthPresets, yearPresets } from '../constant/dataPicker';

import type { PresetType } from '../EcDatePicker';

const getAllWeekTime = (startTime: string, endTime: string) => {
    const startYear = startTime.substring(0, 4);
    const startWeek = startTime.slice(-2);

    const endYear = endTime.substring(0, 4);
    const endWeek = endTime.slice(-2);

    return {
        start: dayjs(`${startYear}`).add(Number(startWeek), 'w'),
        end: dayjs(`${endYear}`).add(Number(endWeek) - 1, 'w'),
    };
};

const generateAntdDatePresets = (presetType: PresetType, startTime: string, endTime: string) => {
    if (!endTime) return [];

    let startTimeVal = startTime.toString();
    let endTimeVal = endTime.toString();

    const getPressetList = () => {
        if (presetType === 'date') return datePresets;
        if (presetType === 'week') return weekPresets;
        if (presetType === 'allWeek') return weekPresets;
        if (presetType == 'month') return monthPresets;
        if (presetType == 'year') return yearPresets;

        return [];
    };

    const pressetList = getPressetList();

    if (presetType === 'allWeek') {
        const { start, end } = getAllWeekTime(startTimeVal, endTimeVal);
        startTimeVal = start.format('YYYY-MM-DD');
        endTimeVal = end.format('YYYY-MM-DD');
    }

    return pressetList.map((item) => {
        const isAll = item.value === 'all';
        const startTimeInfo = item.type
            ? dayjs(endTimeVal).subtract(Number(item.value), item.type)
            : isAll
              ? dayjs(startTimeVal)
              : '';

        return {
            label: item.text,
            value: [startTimeInfo, dayjs(endTimeVal)],
        };
    });
};

export { generateAntdDatePresets, getAllWeekTime };
