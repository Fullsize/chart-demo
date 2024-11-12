/*
 * @Date: 2023-06-30 15:28:31
 * @LastEditors: sungy
 * @LastEditTime: 2024-03-26 15:13:41
 * @FilePath: /monorepo/apps/economy-shaoxing-react-16-9/webpack/webpack.dev.js
 * @Author: Fullsize
 */
const path = require('path');
const { merge } = require('webpack-merge');
const base = require('./webpack.base.cjs');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = merge(base, {
    mode: 'development', // 开发模式
    devtool: 'cheap-module-source-map',
    devServer: {
        // open: true, // 编译完自动打开浏览器
        port: 8083,
        historyApiFallback: true,
        client: {
            overlay: false,
        },
    },
    watchOptions: {
        ignored: ['**/node_modules'],
    },
    cache: {
        type: 'memory',
        maxGenerations: 1,
        cacheUnaffected: true,
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: 'assets', to: 'assets' }],
        }),
    ],
});
