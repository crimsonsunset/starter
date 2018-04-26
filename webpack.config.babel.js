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


// import webpackBase from './base.config.babel';


const PATHS = {

  app: path.join(__dirname, './app'),
  entry: path.join(__dirname, './app/main.js'),

  //sugared for import sanity
  components: path.join(__dirname, './app/components'),
  styles: path.join(__dirname, './app/styles'),
  config: path.join(__dirname, './app/config'),
  app_redux: path.join(__dirname, './app/redux'),
  assets: path.join(__dirname, './app/assets'),
  util: path.join(__dirname, './app/util'),
  node_modules: path.join(__dirname, './node_modules'),
  server: path.join(__dirname, './server'),
  dist: path.join(__dirname, './dist')
};

const alias = {
  ...WebpackUtils.createComponentAliases(PATHS.components),
  ...mapValues(PATHS, (e, i) => {
    return path.resolve(__dirname, PATHS[i]);
  })
};


module.exports = {
  // entry: [
  //   'react-hot-loader/patch',
  //   './app/main.js'
  // ],
  entry: {
    app: ['react-hot-loader/patch', PATHS.entry],
    // vendors: Object.keys(packageJSON.dependencies)
    // vendors: Object.keys(packageJSON.devDependencies)
  },
  output: {
    path: PATHS.dist,
    filename: 'build.js'
  },
  context: __dirname,
  mode: 'development', //todo: process.env.npm_lifecycle_event
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
      title: packageJSON.name,
      template: 'index.tmpl',
      minify: {
        collapseWhitespace: true,
        conservativeCollapse: true,
        preserveLineBreaks: true,
        useShortDoctype: true,
        html5: true
      }
    }),
    WebpackUtils.consoleRainbowPlugin,
    WebpackUtils.buildInfoPlugin,
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  // devtool: 'eval',
  devtool: '#eval-source-map'
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

