/*
 * @Author: sungy
 * @Date: 2024-03-29 11:37:28
 * @LastEditors: sungy
 * @LastEditTime: 2024-04-22 16:42:40
 * @Description: 项目入口
 */
import React from 'react';
import { DeepBlueTheme } from '@/components/BaseAntd';
import Main from './Main';
import { EcharsThemeProvider } from '../BaseEchars/EcharsThemeProvider';
import useStore from '@/store';

const Layout = () => {
    const { echartsTheme } = useStore();

    return (
        <DeepBlueTheme>
            <EcharsThemeProvider value={echartsTheme}>
                <Main></Main>
            </EcharsThemeProvider>
        </DeepBlueTheme>
    );
};
export default Layout;
