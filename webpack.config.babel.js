require('babel-register');
require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
import {mapValues} from 'lodash';
import WebpackUtils from './build-helpers/webpackUtil';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const packageJSON = require(path.resolve(__dirname, 'package.json'));
// const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

const LAUNCH_COMMAND = process.env.npm_lifecycle_event;
const isProduction = LAUNCH_COMMAND === 'build';

// const PATHS = {
//
//     app: path.join(__dirname, './app'),
//
//     //sugared for import sanity
//     components: path.join(__dirname, './app/components'),
//     styles: path.join(__dirname, './app/styles'),
//     config: path.join(__dirname, './app/config'),
//     app_redux: path.join(__dirname, './app/redux'),
//     assets: path.join(__dirname, './app/assets'),
//     util: path.join(__dirname, './app/util'),
//     node_modules: path.join(__dirname, './node_modules'),
//     server: path.join(__dirname, './server'),
// };

// const alias = {
//     ...WebpackUtils.createComponentAliases(PATHS.components),
//     ...mapValues(PATHS, (e, i) => {
//         return path.resolve(__dirname, PATHS[i]);
//     })
// };


module.exports = {
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true
                }
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                // loader: 'file?name=/public/fonts/[name].[ext]',
                loaders: ['url-loader']
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader'],
            },
            // {
            //     test: /\.styl$/,
            //     loader: ['style-loader', 'css-loader', 'stylus-loader']
            // },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {minimize: true}
                    }
                ]
            },

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            showErrors: true,
            title: packageJSON.name,
            template: 'index.tmpl'
        }),
        WebpackUtils.consoleRainbowPlugin,
        WebpackUtils.buildInfoPlugin
    ]

    // plugins: [
    //   new HtmlWebPackPlugin({
    //     template: "./src/index.html",
    //     filename: "./index.html"
    //   }),
    //   // new MiniCssExtractPlugin({
    //   //   filename: "[name].css",
    //   //   chunkFilename: "[id].css"
    //   // })
    // ]
};


// if (process.env.NODE_ENV === 'production') {
//     module.exports.devtool = '#source-map';
//     module.exports.plugins = (module.exports.plugins || []).concat([
//         new webpack.DefinePlugin({
//             'process.env': {
//                 NODE_ENV: '"production"'
//             }
//         }),
//         new webpack.optimize.UglifyJsPlugin({
//             sourceMap: true,
//             compress: {
//                 warnings: false
//             }
//         }),
//         new webpack.LoaderOptionsPlugin({
//             minimize: true
//         })
//     ])
// }

