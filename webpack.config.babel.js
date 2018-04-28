import WebpackBase from './webpack/base.config.babel';

const TARGET = process.env.npm_lifecycle_event;
let configStr;

if (TARGET === 'start' || TARGET === 'dev' || !TARGET) {
  console.info('----BUILDING USING DEV FLAG----');
  configStr = 'development';
}

if (TARGET === 'build' || TARGET === 'stats') {
  console.info('----BUILDING USING PROD FLAG----');
  configStr = 'production';
}
const webpackBase = new WebpackBase(configStr);
module.exports = webpackBase.config;
