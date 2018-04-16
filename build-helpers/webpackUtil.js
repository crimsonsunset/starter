const webpack = require('webpack');
const {resolve, join} = require('path');
const {lstatSync, readdirSync, existsSync} = require('fs');
require('dotenv').config();

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
          date: JSON.stringify(`${new Date().toLocaleDateString('en-US')} - ${WebpackUtils.formatAMPM(new Date())}`),
          name: JSON.stringify(name),
          environment: JSON.stringify(NODE_ENV)
        },
        'build.keys': {
          GMAPS_API_KEY: JSON.stringify(process.env.GMAPS_API_KEY),
        }
      });
  }
  static formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
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
}

module.exports = new WebpackUtils();
