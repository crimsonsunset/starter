const path = require('path');
const webpack = require('webpack');
var d = require('babel-register');
const WebpackUtils = require('./build-helpers/webpackUtil');
import {mapValues} from 'lodash';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')

const LAUNCH_COMMAND = process.env.npm_lifecycle_event;
const isProduction = LAUNCH_COMMAND === 'build';
const buildInfoPlugin =
	new webpack.DefinePlugin({
		"build.info": {
			version: JSON.stringify(require(path.resolve(__dirname, 'package.json')).version),
			date: JSON.stringify(`${new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")}`),
			environment: JSON.stringify((isProduction) ? 'PRODUCTION' : 'DEVELOPMENT'),
			name: JSON.stringify(require(path.resolve(__dirname, 'package.json')).name),
		}
	});

const consoleRainbowPlugin =
	new webpack.DefinePlugin({
		'console.rainbow': function (color, input) {
			console.log(`%c${input}`, `color:${color};`);
		}
	});


const PATHS = {

	app: path.join(__dirname, './app'),
	// build: path.join(__dirname, 'dist', folder,'presentation-app/styleguide'),
	// public: path.join(__dirname, 'assets/'),
	// publicJs: './scripts/',
	// publicStyles: './styles/',
	// lib: path.join(__dirname, 'www/lib'),
	// html: path.join(__dirname, './src/styleguide/index.html'),

	//sugared for import sanity
	// actionTypes: path.join(__dirname, '/src/action-types'),
	components: path.join(__dirname, './app/components'),
	config: path.join(__dirname, './app/config'),
	// util: path.join(__dirname, '/src/util'),
	// assets: path.join(__dirname, '/static'),
	// styles: path.join(__dirname, '/src/scss'),
	// styleguide: path.join(__dirname, '/src/styleguide'),
	// services: path.join(__dirname, '/src/services'),
};

const alias = {
	// ...WebpackUtils.createComponentAliases(PATHS.components),
	...mapValues(PATHS, (e, i) => {
			return path.resolve(__dirname, PATHS[i]);
		})
};


module.exports = {
  // entry: './app/main.js',
  // output: {
  // 	path: path.resolve(__dirname, './dist'),
  // 	// publicPath: '/dist/',
  // 	filename: 'build.js'
  // },
  entry: './app/main.js',
  output: {
    path: __dirname + '/dist',
    filename: 'build.js'
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
      // {
      // 	test: /\.svg$/,
      // 	loader: 'file-loader'
      // },
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
      {
        test: /\.styl$/,
        // loader: 'css-loader!stylus-loader?paths=node_modules/bootstrap-stylus/stylus/'
        loader: ['style-loader', 'css-loader', 'stylus-loader']
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.min.js'],
    alias
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    // noInfo: true
    // historyApiFallback: {
    //     index: path.resolve(PATHS.views, 'index.html'),
    // },

  },
  plugins: [
    new HtmlWebpackPlugin({
      showErrors: true,
      title: 'Sports Rank',
      template: 'index.tmpl'
      // favicon: 'Sports Rank',
    }),
    // new WebpackCdnPlugin({
    //   modules: [
    //     // {
    //     //   name: 'vue',
    //     //   var: 'Vue',
    //     //   style: 'dist/vue.css'
    //     // },
    //     {
    //       name: 'bootstrap',
    //       // cssOnly: true,
    //       cdn: 'https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css'
    //     }
    //   ]
    // }),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'bootstrap',
          entry: {
            path: 'https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css',
            type: 'css',
          }
        },
        {
          module: 'google-roboto',
          entry: {
            path: 'https://fonts.googleapis.com/css?family=Roboto',
            type: 'css',
          },
        },
      ],
    }),
    consoleRainbowPlugin,
    buildInfoPlugin
  ],
  // performance: 'warning',
  devtool: '#eval-source-map'
};


if (process.env.NODE_ENV === 'production') {
	module.exports.devtool = '#source-map'
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compress: {
				warnings: false
			}
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		})
	])
}
