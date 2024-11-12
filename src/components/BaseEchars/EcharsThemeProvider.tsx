import React, { createContext, useContext, useEffect, useState } from 'react';

import * as echarts from 'echarts';
import ectThemeFgw from './theme/ectThemeFgw.json';
import theme1 from './theme/ectTheme1.json';
import theme2 from './theme/ectTheme2.json';
import themeGz from './theme/ectThemeGz.json';
import themeSjz from './theme/ectThemeSjz.json';

import { getCustom } from './theme/customFgw';

import custom from './theme/custom.json';
import customGz from './theme/customGz.json';
import _ from 'lodash';

const themeStore = new Map();

// 先这样用，需要在优化
(() => {
    const deepTheme1 = _.defaultsDeep(JSON.parse(JSON.stringify(custom)), theme1);
    echarts.registerTheme('ect1', deepTheme1);
    themeStore.set('ect1', deepTheme1);

    const deepTheme2 = _.defaultsDeep(JSON.parse(JSON.stringify(custom)), theme2);
    echarts.registerTheme('ect2', deepTheme2);
    themeStore.set('ect2', deepTheme2);

    const deepTheme3 = _.defaultsDeep(getCustom(), ectThemeFgw);
    echarts.registerTheme('ectFgw', deepTheme3);
    themeStore.set('ectFgw', deepTheme3);

    const deepThemeGz = _.defaultsDeep(JSON.parse(JSON.stringify(customGz)), themeGz);
    echarts.registerTheme('ectGz', deepThemeGz);
    themeStore.set('ectGz', deepThemeGz);

    const deepThemeSjz = _.defaultsDeep(JSON.parse(JSON.stringify(custom)), themeSjz);
    echarts.registerTheme('ectSjz', deepThemeSjz);
    themeStore.set('ectSjz', deepThemeSjz);
})();

export const EcharsThemeContext: any = createContext(null);
export const EcharsThemeProvider = ({ value, children }: any) => {
    return <EcharsThemeContext.Provider value={value}>{children}</EcharsThemeContext.Provider>;
};

export const useEcharsTheme = (themeName?: string) => {
    const echartsTheme: any = useContext(EcharsThemeContext);
    const [theme] = useState(() => {
        if (themeName) {
            return themeStore.get(themeName);
        } else {
            return themeStore.get(echartsTheme);
        }
    });
    return theme;
};
