const { merge } = require('webpack-merge');
const base = require('./webpack.base.cjs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const WebpackBar = require('webpackbar');
const TerserPlugin = require('terser-webpack-plugin');
const progressPlugin = new WebpackBar({
    color: '#85d', // 默认green，进度条颜色支持HEX
    basic: true, // 默认true，启用一个简单的日志报告器
    profile: false, // 默认false，启用探查器。
});

const smp = new SpeedMeasurePlugin({
    compareLoadersBuild: {
        filePath: './buildInfo.json',
    },
});
// smp.wrap(webpackConfig)
module.exports = merge(base, {
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                react: {
                    test: /(react|react-dom)/,
                    name: 'vendors',
                    chunks: 'all',
                    priority: 20,
                },
                geoMap:{
                    test: /(EchartMapGeo)/,
                    name: 'geoMap',
                    chunks: 'all',
                    priority: 15,
                },
                echarts: {
                    test: /(echarts)/,
                    name: 'echarts',
                    chunks: 'all',
                    priority: 10,
                },
                xlsx: {
                    test: /(xlsx)/,
                    name: 'xlsx',
                    chunks: 'all',
                    priority: 5,
                },
                lodash: {
                    test: /(lodash)/,
                    name: 'lodash',
                    chunks: 'all',
                    priority: 10,
                },
                moment: {
                    test: /(moment)/,
                    name: 'moment',
                    chunks: 'all',
                    priority: 10,
                },
            },
        },
        runtimeChunk: true,
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
        }),
        new CopyPlugin({
            patterns: [{ from: 'assets/js', to: 'assets/js' }],
        }),
        progressPlugin,
        new CompressionPlugin({
            threshold: 10240,
            minRatio: 0.8,
            test: /\.(css|js)/i,
            algorithm: 'gzip',
        }),
        // new BundleAnalyzerPlugin(),
    ],
    output: {
        clean: true,
    },
});
