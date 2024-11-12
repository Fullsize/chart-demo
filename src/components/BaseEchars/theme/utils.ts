export function getOpacityColor(thisColor: string, thisOpacity: string) {
    let theColor = thisColor.toLowerCase();

    // 十六进制颜色值的正则表达式
    const hexRegex = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;

    // 如果是十六进制颜色
    if (theColor && hexRegex.test(theColor)) {
        if (theColor.length === 4) {
            let sColorNew = '#';
            for (let i = 1; i < 4; i += 1) {
                sColorNew += theColor.slice(i, i + 1).concat(theColor.slice(i, i + 1));
            }
            theColor = sColorNew;
        }

        // 处理六位的颜色值
        const sColorChange = [];
        for (let j = 1; j < 7; j += 2) {
            sColorChange.push(parseInt('0x' + theColor.slice(j, j + 2)));
        }

        return 'rgba(' + sColorChange.join(',') + ',' + thisOpacity + ')';
    }

    // 如果是 RGBA 或 RGB
    if (theColor.startsWith('rgb')) {
        let numbers: any = theColor.match(/(\d+(\.\d+)?)+/g);
        numbers = numbers.slice(0, 3).concat(thisOpacity);
        return 'rgba(' + numbers.join(',') + ')';
    }
    return theColor;
}
