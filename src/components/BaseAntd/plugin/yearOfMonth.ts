import dayjs from 'dayjs';

const yearOfMonth = (option: any, dayjsClass: any) => {
    const dayjsFormat = dayjsClass.prototype.format;
    dayjsClass.prototype.format = function (formatStr: any) {
        if (formatStr?.includes?.('YW')) {
            const year = this.year();
            const week = this.week();
            const weekStr = week > 9 ? week : '0' + week;
            return formatStr.replace('YYYY', year).replace('YW', weekStr);
        }
        return dayjsFormat.bind(this)(formatStr);
    };
};
export default yearOfMonth;
