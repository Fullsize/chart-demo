// 获取URL中的参数
export const getUrlSearchParameter = (variable: string) => {
    let query = window.location.search.substring(1);
    if (query[query.length - 1] == '/') {
        query = query.substring(0, query.length - 1);
    }
    const vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split('=');
        if (pair[0].toLowerCase() == variable.toLowerCase()) {
            return pair[1];
        }
    }
    return null;
};

export const getDecodeUrlParameter = (variable: string) => {
    const win: any = window;
    const search: any = win.location.search;
    let query = search.substring(1);
    if (query[query.length - 1] == '/') {
        query = query.substring(0, query.length - 1);
    }
    const vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
        const [name, params] = vars[i].split('=');
        if (name.toLowerCase() == variable.toLowerCase()) {
            return decodeURIComponent(params);
        }
    }
    return null;
};
