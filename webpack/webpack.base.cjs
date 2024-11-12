const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

require('dotenv').config();
module.exports = {
    entry: path.resolve(__dirname, '../src/index.tsx'),
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].[fullhash].js',
        // publicPath: "./"
    },
    resolve: {
        extensions: ['.mjs', '.js', '.json', '.jsx', '.ts', '.tsx', '.json'],
        alias: {
            '@': path.resolve(__dirname, '../src'),
            '@images': path.resolve(__dirname, '../assets/images'),
            '@svg': path.resolve(__dirname, '../assets/svg'),
        },
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(process.env),
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../index-webpack.html'),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
                        options:
                            process.env.NODE_ENV === 'development'
                                ? {}
                                : {
                                    publicPath: '../',
                                },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            esModule: false,
                            // url: process.env.NODE_ENV === 'development' ? false : true,
                            modules: {
                                auto: (resourcePath) => resourcePath.endsWith('.module.css'), // 匹配.less文件来进行css模块化。
                                localIdentName: '[local]_[hash:base64:10]',
                                exportLocalsConvention: 'as-is',
                            },
                        },
                    },
                    'postcss-loader',
                ],
            },
            {
                test: /\.([cm]?ts|tsx)$/,
                exclude: /node_modules/,
                use: [
                    ...(process.env.NODE_ENV !== 'development' ? ['thread-loader'] : []),
                    'babel-loader',
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            happyPackMode: true,
                            configFile: path.resolve(__dirname, '../tsconfig.app.json'),
                        }
                    }
                ]
            },
            {
                test: /.([cm]?js|jsx)$/,
                exclude: /node_modules/,
                use: [...(process.env.NODE_ENV !== 'development' ? ['thread-loader'] : []), 'babel-loader'],
            },
            {
                test: /\.(svg|png|jpe?g|gif|webp)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[hash].[ext]',
                            outputPath: 'assets/images',
                        },
                    },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|OTF)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[hash].[ext]',
                            outputPath: 'assets/fonts',
                        },
                    },
                ],
            },
        ],
    },
};
