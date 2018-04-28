require('babel-register');
require('dotenv').config();
const path = require('path');
const basePath = path.join(__dirname, '../');
const webpack = require('webpack');

import {mapValues, bindAll} from 'lodash';
import WebpackUtils from './webpackUtil';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const packageJSON = require(path.resolve(basePath, 'package.json'));
// const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');


export default class WebpackBase {

  constructor(env) {
    this.env = env;
    this.isDev = (this.env === 'development');
    // this.config = {}
    bindAll(this, [
      '_generateConfig',
    ]);
    this._generateConfig();
  }

  _generateConfig() {
    this.config = {
      // entry: [
      //   'react-hot-loader/patch',
      //   './app/main.js'
      // ],
      entry: {
        app: ['react-hot-loader/patch', WebpackBase.PATHS.entry],
        // vendors: Object.keys(packageJSON.dependencies)
        // vendors: Object.keys(packageJSON.devDependencies)
      },
      output: {
        path: WebpackBase.PATHS.dist,
        filename: 'build.js'
      },
      context: basePath,
      mode: this.env,
      optimization: {
        runtimeChunk: 'single',
        splitChunks: {
          cacheGroups: {
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              enforce: true,
              chunks: 'all'
            }
          }
        }
      },
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
      resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.jsx', '.min.js'],
        alias: WebpackBase.alias
      },
      devServer: {
        contentBase: WebpackBase.PATHS.dist,
        compress: true,
        historyApiFallback: true,
        hot: true,
        open: true,
      },
      stats: {
        children: false
      },
      plugins: [
        new HtmlWebpackPlugin({
          showErrors: true,
          title: packageJSON.name,
          template: 'index.tmpl',
          favicon: 'favicon.ico',
          minify: {
            collapseWhitespace: true,
            conservativeCollapse: true,
            preserveLineBreaks: true,
            useShortDoctype: true,
            html5: true
          }
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        ...WebpackUtils.plugins,
      ],
      // devtool: 'eval',
      devtool: '#eval-source-map'
    };
  }

  static PATHS = {

    app: path.join(basePath, './app'),
    entry: path.join(basePath, './app/main.js'),

    //sugared for import sanity
    components: path.join(basePath, './app/components'),
    styles: path.join(basePath, './app/styles'),
    config: path.join(basePath, './app/config'),
    app_redux: path.join(basePath, './app/redux'),
    assets: path.join(basePath, './app/assets'),
    util: path.join(basePath, './app/util'),
    node_modules: path.join(basePath, './node_modules'),
    server: path.join(basePath, './server'),
    dist: path.join(basePath, './dist')
  };

  static alias = {
    ...WebpackUtils.createComponentAliases(WebpackBase.PATHS.components),
    ...mapValues(WebpackBase.PATHS, (e, i) => {
      return path.resolve(basePath, WebpackBase.PATHS[i]);
    })
  };
}

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

