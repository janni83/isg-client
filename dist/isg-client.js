// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"iJA9":[function(require,module,exports) {
class Parameter {
  constructor({
    id, values, min, max
  }) {
    this.id = id;
    this.values = values;
    this.min = min;
    this.max = max;
  }

  forRequest(value) {
    if (this.values && this.values.indexOf(value) === -1) {
      throw new Error(`'${value}' is not a valid value for parameter ${this.id}`);
    }
    if (this.min != null && value < this.min) {
      throw new Error(`'${value}' is below min value of '${this.min}' for parameter ${this.id}`);
    }
    if (this.max != null && value > this.max) {
      throw new Error(`'${value}' is above max value of '${this.max}' for parameter ${this.id}`);
    }
    return {
      name: `val${this.id}`,
      value: `${value}`
    };
  }
}

module.exports = {
  PAGES: {
    DIAGNOSIS: {
      STATUS: '2,0'
    },
    COOLING: {
      STANDARD_SETTING: '4,3,4'
    }
  },
  LANGUAGE: new Parameter({ id: 'spracheeinstellung', values: ['DEUTSCH', 'ENGLISH'] }),
  COOLING: {
    HC2: {
      ENABLED: new Parameter({ id: '74', values: ['1', '0'] }),
      TYPE: new Parameter({ id: '190', values: ['1', '0'] }),
      TEMPERATURE: new Parameter({ id: '104' }),
      HYST_ROOM_TEMP: new Parameter({ id: '108' })
    },
    STANDARD_SETTING: {
      PERCENT_CAPACITY: new Parameter({ id: '411', min: 30, max: 50 }),
      HYST_FLOW_TEMP: new Parameter({ id: '105', min: 0, max: 3 })
    }
  },
  VENTILATION: {
    STAGES: {
      DAY: new Parameter({ id: '82', values: ['0', '1', '2', '3'] }),
      NIGHT: new Parameter({ id: '83', values: ['0', '1', '2', '3'] }),
      STANDBY: new Parameter({ id: '84', values: ['0', '1', '2', '3'] }),
      PARTY: new Parameter({ id: '85', values: ['0', '1', '2', '3'] }),
      MANUAL: new Parameter({ id: '88', values: ['0', '1', '2', '3'] })
    }
  }
};
},{}],"qQCB":[function(require,module,exports) {
const { COOLING, PAGES } = require('../constants');

const TEXT_COOLING = 'COOLING';
const REGEX_VALUE_CAPACITY = new RegExp(`\\['${COOLING.STANDARD_SETTING.PERCENT_CAPACITY.id}'\\]\\['val'\\]='([0-9]{2})'`);

class CoolingModule {
  constructor(isgClient) {
    this.isgClient = isgClient;
  }

  setEnabledHC2(enabled) {
    return this.isgClient.setParameter(COOLING.HC2.ENABLED.forRequest(enabled ? '1' : '0'));
  }

  setCapacity(percent) {
    return this.isgClient.setParameter(COOLING.STANDARD_SETTING.PERCENT_CAPACITY.forRequest(percent));
  }

  // cooling is active if operating status and processes contain 'COOLING'
  async fetchIsActive() {
    const $ = await this.isgClient.fetchPage(PAGES.DIAGNOSIS.STATUS);
    const matchingElements = $('td').filter((i, elem) => $(elem).text().trim() === TEXT_COOLING);
    return matchingElements.length >= 2;
  }

  async fetchCapacity() {
    const $ = await this.isgClient.fetchPage(PAGES.COOLING.STANDARD_SETTING);
    const matches = REGEX_VALUE_CAPACITY.exec($.html())[1];
    return parseInt(matches, 10);
  }
}

module.exports = CoolingModule;
},{"../constants":"iJA9"}],"f9KS":[function(require,module,exports) {
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

const request = require('request-promise-native').defaults({
  forever: true,
  jar: true
});
const uuid = require('uuid/v4');
const cheerio = require('cheerio');
const CoolingModule = require('./modules/cooling');
const { VENTILATION, LANGUAGE } = require('./constants');

const BASE_HEADERS = {
  Cookie: `PHPSESSID=${uuid()}`,
  Connection: 'keep-alive'
};

const BASE_POST_OPTIONS = {
  method: 'POST',
  headers: BASE_HEADERS
};

const INFO_SYSTEM_PAGE = '1,0';
const LANGUAGE_PAGE = '5,3';
const TEXT_RELATIVE_HUMIDITY_HC2 = 'RELATIVE HUMIDITY HC2';

class IsgClient {
  constructor({
    url, username, password, version
  }) {
    this.url = url;
    this.username = username;
    this.password = password;
    this.version = version;
    this.languageSet = false;
    this.baseSaveOptions = _extends({
      url: `${this.url}/save.php`,
      json: true
    }, BASE_POST_OPTIONS);
    this.cooling = new CoolingModule(this);
  }

  login() {
    const options = _extends({
      uri: this.url,
      form: {
        make: 'send',
        user: this.username,
        pass: this.password
      }
    }, BASE_POST_OPTIONS);
    return request(options).then(() => {
      this.session = { date: new Date() };
    }).catch(() => {
      this.session = null;
    });
  }

  setVentilationDay(stage) {
    return this.setParameter(VENTILATION.STAGES.DAY.forRequest(stage));
  }

  switchLanguageToEnglish() {
    return this.setParameter(LANGUAGE.forRequest('ENGLISH'));
  }

  async fetchLanguage() {
    const $ = await this.fetchPage(LANGUAGE_PAGE);
    return $(`#a${LANGUAGE.forRequest().name}`).val();
  }

  async fetchHumidityHC2() {
    const $ = await this.fetchPage(INFO_SYSTEM_PAGE);
    const humidityText = $('td').filter((i, elem) => $(elem).text() === TEXT_RELATIVE_HUMIDITY_HC2).next().text();
    const humdityStrValue = humidityText.trim().substr(0, humidityText.length - 1).replace(',', '.');
    return parseFloat(humdityStrValue);
  }

  setParameter({ name, value }) {
    return this.verifyLoggedIn().then(() => {
      const options = _extends({
        form: {
          data: JSON.stringify([{ name, value }])
        }
      }, this.baseSaveOptions);
      return request(options);
    }).then(({ success, message }) => success ? message : new Error(message));
  }

  async fetchPage(page) {
    const requestOpts = {
      url: this.url,
      headers: BASE_HEADERS,
      qs: {
        s: page
      }
    };
    await this.verifyLoggedIn();
    await this.verifyEnglishLanguage();
    const html = await request.get(requestOpts);
    return cheerio.load(html);
  }

  verifyLoggedIn() {
    if (!this.username && !this.password) {
      return Promise.resolve();
    }
    if (this.session) {
      return Promise.resolve();
    }
    return this.login();
  }

  verifyEnglishLanguage() {
    if (this.languageSet) {
      return Promise.resolve();
    }
    return this.switchLanguageToEnglish().then(() => {
      this.languageSet = true;
    }).catch(error => {
      throw new Error(`failed to set language to english: ${error}`);
    });
  }
}

module.exports = IsgClient;
},{"./modules/cooling":"qQCB","./constants":"iJA9"}]},{},["f9KS"], null)