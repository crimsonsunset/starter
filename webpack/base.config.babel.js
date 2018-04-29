require('babel-register');
require('dotenv').config();
const path = require('path');
const basePath = path.join(__dirname, '../');
const webpack = require('webpack');
import {mapValues, bindAll, words} from 'lodash';
import WebpackUtils from './webpackUtil';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const packageJSON = require(path.resolve(basePath, 'package.json'));
// const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');


export default class WebpackBase {

  constructor(env) {
    this.env = env;
    this.isProd = (this.env === 'production');
    bindAll(this, [
      '_generateConfig',
    ]);
    this._generateConfig();
  }

  _generateConfig() {
    const {PATHS, alias} = WebpackBase;

    this.config = {
      entry: {
        app: ['react-hot-loader/patch', PATHS.entry],
        vendors: Object.keys(packageJSON.dependencies)
      },
      output: {
        path: PATHS.dist,
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
            test: /\.(scss|sass)$/,
            use: [
              {
                loader: 'style-loader'
              },
              {
                loader: 'css-loader',
                options: {
                  // modules: true,
                  camelCase: 'dashes',
                  minimize: this.isProd
                  // localIdentName: '[path][name]__[local]'
                }
              },
              {
                loader: 'sass-loader'
              }
            ]
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
        alias
      },
      devServer: {
        contentBase: PATHS.dist,
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
          title: words(packageJSON.name),
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
        new webpack.DefinePlugin({
          PRODUCTION: JSON.stringify(this.isProd)
        }),

        // (this.isProd) ? new MiniCssExtractPlugin({
        //   filename: '[name].[chunkhash].css'
        // }) : {},

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