import {has, get, flow, camelCase, upperFirst, forEach} from 'lodash';

export function pascalCase(str) {
  return flow(camelCase, upperFirst)(str);
}

export function printBuildInfo() {
  const {name, version, environment, date, commitHash} = build.info; // eslint-disable-line no-undef
  console.rainbow('red', `${name} v${version} - ${environment}`);
  console.rainbow('blue', `Built at: ${date}`);
  console.rainbow('green', `Last commit: ${`http://gitlab.marvel.com/terrigen-dev/presentation-app/commit/${commitHash}`}`);
}

// export function fetchMockData(componentName, suffix) {
//   suffix = (suffix) ? `-${suffix}` : '';
//   return require(`../components/${pascalCase(componentName)}/mock-data${suffix}.json`);
// }

export function getCamelCaseVariables(inObj) {
  let retObj = {};
  forEach(inObj, (e, i) => {
    retObj[camelCase(i)] = e;
  });
  return retObj;
}

export function getBackground({background, backgroundRepeat, backgroundSize, backgroundPosition}) {
  let _background = {};
  if (background) {
    _background = {
      backgroundImage: `url(${background})`,
      backgroundRepeat,
      backgroundPosition,
      backgroundSize
    };
  } else {
    _background = {backgroundImage: 'none'};
  }
  return _background;
}

/**
 * Browser Detection
 */
export const OPERA = 'OPERA';
export const FIREFOX = 'FIREFOX';
export const SAFARI = 'SAFARI';
export const IE = 'IE';
export const EDGE = 'EDGE';
export const CHROME = 'CHROME';
export const BLINK = 'BLINK';
export const UNKNOWN = 'UNKNOWN';

export function getBrowser() {
  const isOpera = has(window, 'opr.addons') || has(window, 'opera') ||
    navigator.userAgent.indexOf(' OPR/') >= 0;
  const isFirefox = typeof InstallTrigger !== 'undefined';
  const isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
  const isIE = /*@cc_on!@*/false || has(document, ['documentMode']);
  const isEdge = !(isIE) && has(window, 'StyleMedia');
  const isChrome = has(window, 'chrome.webstore');
  const isBlink = (isChrome || isOpera) && has(window, 'CSS');

  let browser;

  if (isOpera) {
    browser = OPERA;
  } else if (isFirefox) {
    browser = FIREFOX;
  } else if (isSafari) {
    browser = SAFARI;
  } else if (isIE) {
    browser = IE;
  } else if (isEdge) {
    browser = EDGE;
  } else if (isChrome) {
    browser = CHROME;
  } else if (isBlink) {
    browser = BLINK;
  } else {
    browser = UNKNOWN;
  }

  return browser;

}

export function isServer() {
  return (typeof window === 'undefined');
}

// export function fakeReact() {
  export const React = {
    createElement: function (tag, attrs, children) {
      var e = document.createElement(tag);

      // Add attributes
      for (var name in attrs) {
        if (name && attrs.hasOwnProperty(name)) {
          var v = attrs[name];
          if (v === true) {
            e.setAttribute(name, name);
          } else if (v !== false && v != null) {
            e.setAttribute(name, v.toString());
          }
        }
      }

      // Append children
      for (var i = 2; i < arguments.length; i++) {
        var child = arguments[i];
        e.appendChild(
          child.nodeType == null ?
          document.createTextNode(child.toString()) :
          child);
      }

      return e;
    }
  };
  // return React;
// }
