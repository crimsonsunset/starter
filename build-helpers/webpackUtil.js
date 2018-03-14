const webpack = require('webpack');
const {resolve, join} = require('path');
const {lstatSync, readdirSync, existsSync} = require('fs');

class WebpackUtils {
  constructor() {
    let packageJSON;
    try {
      packageJSON = require(resolve(__dirname, '../package.json'));
    } catch (err) {
      console.log('cant find', err);
    }

    const {NODE_ENV} = process.env;
    const version = (packageJSON) ? packageJSON.version : 'NA-Version';
    const name = (packageJSON) ? packageJSON.name : 'NA-Name';

    this.consoleRainbowPlugin =
      new webpack.DefinePlugin({
        'console.rainbow': function (color, input) {
          console.log(`%c${input}`, `color:${color};`);
        }
      });

    this.buildInfoPlugin =
      new webpack.DefinePlugin({
        'build.info': {
          version: JSON.stringify(version),
          date: JSON.stringify(`${new Date().toLocaleDateString() + ' '
          + new Date().toLocaleTimeString()
            .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, '$1$3')}`),
          name: JSON.stringify(name),
          environment: JSON.stringify(NODE_ENV)
        }
      });
  }

  createComponentAliases(source) {
    const isDirectory = source => lstatSync(source)
      .isDirectory();

    const folderList = readdirSync(source)
      .map(name => join(source, name))
      .filter(isDirectory);

    let aliases = {};
    folderList.forEach((e, i) => {
      const name = e.replace(`${source}/`, '');
      const possPath = `${source}/${name}/${name}`;
      if (existsSync(`${possPath}.jsx`) || existsSync(`${possPath}.js`)) {
        aliases[name] = possPath;
      } else {
        aliases[name] = `${source}/${name}`;
      }
    });

    return aliases;
  }

  // resolveLoaders() {
  //   const {LEVEL} = process.env;
  //   //can set default levels here
  //   let outputLevel = 'silent',
  //     eslintLoader = undefined,
  //     postCSSLoader = {
  //       loader: 'postcss-loader',
  //       options: {
  //         sourceMap: true
  //       }
  //     };
  //
  //   if (LEVEL === 'warn') {
  //     outputLevel = 'warn';
  //     eslintLoader = {
  //       loader: 'eslint-loader',
  //       options: {
  //         emitWarning: true,
  //         formatter: lintFormatter
  //       }
  //     };
  //     postCSSLoader = {
  //       loader: 'postcss-loader',
  //       options: {
  //         sourceMap: true,
  //         plugins: [
  //           require('stylelint')(),
  //           cssReporter({
  //             clearReportedMessages: true
  //           })
  //         ]
  //       }
  //     };
  //   } else if (LEVEL === 'error') {
  //     outputLevel = 'error';
  //     eslintLoader = {
  //       loader: 'eslint-loader',
  //       options: {
  //         emitError: true,
  //         formatter: lintFormatter
  //       }
  //     };
  //     postCSSLoader = {
  //       loader: 'postcss-loader',
  //       options: {
  //         sourceMap: true,
  //         plugins: [
  //           require('stylelint')(),
  //           cssReporter({
  //             clearReportedMessages: true,
  //             throwError: true //todo: this will make the style linter throw errors
  //           })
  //         ]
  //       }
  //     };
  //
  //   } else if (LEVEL === 'silent') {
  //     outputLevel = 'silent';
  //   }
  //   return {
  //     postCSSLoader,
  //     eslintLoader,
  //     outputLevel
  //   };
  // }

}

module.exports = new WebpackUtils();
