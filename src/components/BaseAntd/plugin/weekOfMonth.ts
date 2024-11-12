import dayjs from 'dayjs';

const weekOfMonth = (option: any, dayjsClass: any) => {
    dayjsClass.prototype.weekOfMonth = function () {
        const year = this.year();
        const month = this.month() + 1;
        const markEm = this.startOf('month').day() - 1;
        const week = Math.ceil((this.date() + markEm) / 7);
        return `${year}年${month}月 第${week}周`;
    };
    dayjsClass.prototype.startDataOnWeekMonth = function (N: number) {
        const startDay = dayjs(this.year() + '-' + (this.month() + 1)).startOf('month');
        const monthWeek = this.startOf('month')
            .add(N - 1, 'week')
            .startOf('week')
            .add(1, 'day');
        if (monthWeek < startDay) {
            return startDay;
        } else {
            return monthWeek;
        }
    };
    dayjsClass.prototype.endDataOnWeekMonth = function (N: number) {
        const endDay = dayjs(this.year() + '-' + (this.month() + 1)).endOf('month');
        const monthWeek = this.startOf('month')
            .add(N - 1, 'week')
            .endOf('week')
            .add(1, 'day');
        if (monthWeek > endDay) {
            return endDay;
        } else {
            return monthWeek;
        }
    };
    const dayjsFormat = dayjsClass.prototype.format;
    dayjsClass.prototype.format = function (formatStr: any) {
        if (formatStr?.includes?.('MW')) {
            const year = this.year();
            let month = this.month() + 1;
            if (month < 10) {
                month = '0' + month;
            }
            const markEm = this.startOf('month').day() - 1;
            const week = Math.ceil((this.date() + markEm) / 7);
            return formatStr.replace('YYYY', year).replace('MM', month).replace('MW', week);
        }
        return dayjsFormat.bind(this)(formatStr);
    };
};
export default weekOfMonth;
