import XLSX from 'xlsx';

function getRowData(columns: any, row: any) {
    if (columns && row) {
        const hKey: any = {};
        const hNameArr: any = [];
        const rData: any = [];
        let index = 1;
        columns.forEach((element: any, i: any) => {
            const { dataIndex, title } = element;
            if (element?.dataIndex) {
                hKey[index] = [dataIndex, title];
                index++;
                hNameArr.push(title);
            }
        });
        const keys = Object.keys(hKey);
        row.forEach((item: any) => {
            const rd: any = {};
            keys.forEach((k) => {
                rd[k] = item[hKey[k][0]];
            });
            rData.push(rd);
        });

        return {
            hKey,
            header: hNameArr,
            rows: rData,
        };
    }
}
export function tableExportExcel(mkColumns: any, mkRow: any, fileName: string) {
    if (!Array.isArray(mkColumns) || !Array.isArray(mkRow)) {
        return;
    }
    const trData: any = getRowData(mkColumns, mkRow);
    const worksheet = XLSX.utils.json_to_sheet(trData.rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Dates');

    /* fix headers */
    XLSX.utils.sheet_add_aoa(worksheet, [trData.header], { origin: 'A1' });
    const wch: any = [];
    Object.keys(trData.hKey).map((key) => {
        const max_width = trData.rows.reduce((w: any, r: any) => {
            return Math.max(w, r?.[key.toString()]?.length ?? 10);
        }, 10);
        wch.push({ wch: max_width });
    });
    worksheet['!cols'] = wch;
    XLSX.writeFile(workbook, fileName + '.xlsx', { compression: true });
}
