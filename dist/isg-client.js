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
})({"Y/Oq":[function(require,module,exports) {
/**
 * @param object {object}
 * @param propertyName {string}
 * @param constructor {function}
 * @returns {object}
 */
const lazyCreateModule = (object, propertyName, constructor) => {
  if (!object[propertyName]) {
    // eslint-disable-next-line no-param-reassign
    object[propertyName] = new constructor(object);
  }
  return object[propertyName];
};

module.exports = lazyCreateModule;
},{}],"iJA9":[function(require,module,exports) {
class Parameter {
  /**
   * @param id {string}
   * @param [values] {array}
   * @param [min] {number}
   * @param [max] {number}
   */
  constructor({
    id, values, min, max
  }) {
    this.id = id;
    this.values = values;
    this.min = min;
    this.max = max;
  }

  /**
   * @param value {number|string}
   * @returns {{name: string, value: string}}
   */
  withValue(value) {
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

const PAGES = {
  INFO: {
    SYSTEM: '1,0'
  },
  DIAGNOSIS: {
    STATUS: '2,0'
  },
  COOLING: {
    STANDARD_SETTING: '4,3,4'
  },
  DHW: {
    STANDARD_SETTING: '4,1,1'
  },
  LANGUAGE: '5,3'
};

const LANGUAGE = new Parameter({ id: 'spracheeinstellung', values: ['DEUTSCH', 'ENGLISH'] });

const HEATING = {
  HC1: {
    TEMPERATURE: {
      TEMP_DAY: new Parameter({ id: '5', min: 10, max: 30 }),
      TEMP_NIGHT: new Parameter({ id: '7', min: 10, max: 30 }),
      TEMP_STANDBY: new Parameter({ id: '58', min: 10, max: 30 }),
      TEMP_MANUAL: new Parameter({ id: '54', min: 10, max: 30 })
    }
  },
  HC2: {
    TEMPERATURE: {
      TEMP_DAY: new Parameter({ id: '6', min: 10, max: 30 }),
      TEMP_NIGHT: new Parameter({ id: '8', min: 10, max: 30 }),
      TEMP_STANDBY: new Parameter({ id: '59', min: 10, max: 30 }),
      TEMP_MANUAL: new Parameter({ id: '55', min: 10, max: 30 })
    }
  },
  STANDARD_SETTING: {
    PROP_COMP: new Parameter({ id: '431', min: 0, max: 10 }),
    INTEGRAL_COMPONENT: new Parameter({ id: '432', min: 0, max: 500 }),
    MAX_BH_STAGES: new Parameter({ id: '130', min: 0, max: 3 }),
    MAX_FLOW_TEMP: new Parameter({ id: '21', min: 10, max: 75 }),
    SUMMER_MODE: new Parameter({ id: '40', min: 10, max: 25 }),
    HYST_SUMMER_MODE: new Parameter({ id: '133', min: 1, max: 7 }),
    DUAL_MODE_HEAT: new Parameter({ id: '64', min: -20, max: 10 }),
    BOOSTER_TIMEOUT: new Parameter({ id: '131', min: 0, max: 60 }),
    OUTSIDE_T_CORRECTION: new Parameter({ id: '134', min: -20, max: 30 }),
    SUPPR_TEMP_MEASURE: new Parameter({ id: '187', min: 0, max: 120 }),
    HEATING_SYS_TEMP_SIZING: new Parameter({ id: '433', min: -25, max: 5 }),
    HEATING_SYS_OUTPUT_SIZING: new Parameter({ id: '434', min: 40, max: 100 })
  }
};

const COOLING = {
  HC2: {
    MODE: {
      ENABLED: new Parameter({ id: '74', values: ['1', '0'] }),
      TYPE: new Parameter({ id: '190', values: ['1', '0'] }),
      TEMPERATURE: new Parameter({ id: '104' }),
      HYST_ROOM_TEMP: new Parameter({ id: '108' })
    },
    ROOM_TEMP: {
      DAY: new Parameter({ id: '77', min: 10, max: 30 }),
      NIGHT: new Parameter({ id: '81', min: 10, max: 30 }),
      STANDBY: new Parameter({ id: '79', min: 10, max: 30 })
    }
  },
  HC1: {
    MODE: {
      ENABLED: new Parameter({ id: '73', values: ['1', '0'] }),
      TYPE: new Parameter({ id: '189', values: ['1', '0'] }),
      TEMPERATURE: new Parameter({ id: '103' }),
      HYST_ROOM_TEMP: new Parameter({ id: '107' })
    },
    ROOM_TEMP: {
      DAY: new Parameter({ id: '76', min: 10, max: 30 }),
      NIGHT: new Parameter({ id: '80', min: 10, max: 30 }),
      STANDBY: new Parameter({ id: '78', min: 10, max: 30 })
    }
  },
  STANDARD_SETTING: {
    PERCENT_CAPACITY: new Parameter({ id: '411', min: 30, max: 50 }),
    HYST_FLOW_TEMP: new Parameter({ id: '105', min: 0, max: 3 })
  }
};

const VENTILATION = {
  STAGE: {
    DAY: new Parameter({ id: '82', values: ['0', '1', '2', '3'] }),
    NIGHT: new Parameter({ id: '83', values: ['0', '1', '2', '3'] }),
    STANDBY: new Parameter({ id: '84', values: ['0', '1', '2', '3'] }),
    MANUAL: new Parameter({ id: '88', values: ['0', '1', '2', '3'] }),
    PARTY: new Parameter({ id: '85', values: ['0', '1', '2', '3'] })
  },
  FLOW_RATE: {
    FAN_STAGE_VENT_AIR_1: new Parameter({ id: '91', min: 10, max: 300 }),
    FAN_STAGE_VENT_AIR_2: new Parameter({ id: '92', min: 80, max: 300 }),
    FAN_STAGE_VENT_AIR_3: new Parameter({ id: '93', min: 80, max: 300 }),
    FAN_STAGE_EXTRACT_AIR_1: new Parameter({ id: '94', min: 10, max: 300 }),
    FAN_STAGE_EXTRACT_AIR_2: new Parameter({ id: '95', min: 10, max: 300 }),
    FAN_STAGE_EXTRACT_AIR_3: new Parameter({ id: '96', min: 10, max: 300 })
  }
};

const DHW = {
  TEMPERATURE: {
    DAY: new Parameter({ id: '17', min: 10, max: 65 }),
    NIGHT: new Parameter({ id: '161', min: 10, max: 65 }),
    STANDBY: new Parameter({ id: '102', min: 10, max: 65 }),
    MANUAL: new Parameter({ id: '101', min: 10, max: 65 })
  },
  STANDARD_SETTING: {
    HYSTERESIS: new Parameter({ id: '60', min: 2, max: 10 }),
    BOOSTER_TIMEOUT: new Parameter({ id: '111', min: 0, max: 360 }),
    BOOSTER_T_ACTIVATE: new Parameter({ id: '112', min: -10, max: 10 }),
    PASTEURISATION: new Parameter({ id: '109', min: 1, max: 30 }),
    MAX_DHW_HTG_DURATION: new Parameter({ id: '62', min: 6, max: 12 }),
    PASTEUR_TEMP: new Parameter({ id: '110', min: 10, max: 65 }),
    DHW_BOOSTER_STAGE: new Parameter({ id: '113', min: 1, max: 3 }),
    DHW_BUFFER_MODE: new Parameter({ id: '114', values: ['0', '1'] }),
    MAX_FLOW_TEMP: new Parameter({ id: '115', min: 10, max: 75 }),
    DHW_ECO: new Parameter({ id: '116', values: ['0', '1'] }),
    DHW_OUTPUT_SUMMER: new Parameter({ id: '420', min: 30, max: 100 }),
    DHW_OUTPUT_WINTER: new Parameter({ id: '421', min: 30, max: 100 }),
    INTEGRAL_SENSOR: new Parameter({ id: '422', values: ['0', '1'] }),
    SECOND_DHW_CYLINDER: new Parameter({ id: '423', values: ['0', '1'] })
  }
};

module.exports = {
  PAGES,
  LANGUAGE,
  HEATING,
  COOLING,
  VENTILATION,
  DHW
};
},{}],"qQCB":[function(require,module,exports) {
const { COOLING, PAGES } = require('../constants');

const TEXT_COOLING = 'COOLING';
const TEXT_COMPRESSOR = 'COMPRESSOR';
const REGEX_VALUE_CAPACITY = new RegExp(`\\['${COOLING.STANDARD_SETTING.PERCENT_CAPACITY.id}'\\]\\['val'\\]='([0-9]{2})'`);

class CoolingModule {
  constructor(isgClient) {
    this.isgClient = isgClient;
  }

  /**
   * @param enabled {boolean}
   * @returns {Promise<object>}
   */
  setEnabledHC2(enabled) {
    return this.isgClient.setParameter(COOLING.HC2.MODE.ENABLED.withValue(enabled ? '1' : '0'));
  }

  /**
   * @param percent {number}
   * @returns {Promise<object>}
   */
  setCapacity(percent) {
    return this.isgClient.setParameter(COOLING.STANDARD_SETTING.PERCENT_CAPACITY.withValue(percent));
  }

  /**
   * cooling is active if operating status and processes contain 'COOLING'
   * @returns {Promise<boolean>}
   */
  async fetchIsActive() {
    const $ = await this.isgClient.fetchPage(PAGES.DIAGNOSIS.STATUS);
    const matchingElements = $('td').map((i, elem) => $(elem).text().trim()).filter((i, columnText) => [TEXT_COOLING, TEXT_COMPRESSOR].includes(columnText));
    return matchingElements.length >= 3;
  }

  /**
   * capacity value cannot be read from an html element; have to do a regex search on js code
   * @returns {Promise<number>}
   */
  async fetchCapacity() {
    const $ = await this.isgClient.fetchPage(PAGES.COOLING.STANDARD_SETTING);
    const matches = REGEX_VALUE_CAPACITY.exec($.html())[1];
    return parseInt(matches, 10);
  }
}

module.exports = CoolingModule;
},{"../constants":"iJA9"}],"Qy/x":[function(require,module,exports) {
const { VENTILATION } = require('../constants');

class VentilationModule {
  constructor(isgClient) {
    this.isgClient = isgClient;
  }

  /**
   * @param stage {number}
   * @returns {Promise<object>}
   */
  setDayStage(stage) {
    return this.isgClient.setParameter(VENTILATION.STAGE.DAY.withValue(stage));
  }
}

module.exports = VentilationModule;
},{"../constants":"iJA9"}],"EenY":[function(require,module,exports) {
const { DHW, PAGES } = require('../constants');

const REGEX_VALUE_OUTPUT_SUMMER = new RegExp(`\\['${DHW.STANDARD_SETTING.DHW_OUTPUT_SUMMER.id}'\\]\\['val'\\]='([0-9]{2,3})'`);

class DhwModule {
  constructor(isgClient) {
    this.isgClient = isgClient;
  }

  /**
   * @param percent
   * @returns {Promise<object>}
   */
  setOutputSummer(percent) {
    return this.isgClient.setParameter(DHW.STANDARD_SETTING.DHW_OUTPUT_SUMMER.withValue(percent));
  }

  /**
   * @returns {Promise<number>}
   */
  async fetchOutputSummer() {
    const $ = await this.isgClient.fetchPage(PAGES.DHW.STANDARD_SETTING);
    const matches = REGEX_VALUE_OUTPUT_SUMMER.exec($.html())[1];
    return parseInt(matches, 10);
  }
}

module.exports = DhwModule;
},{"../constants":"iJA9"}],"f9KS":[function(require,module,exports) {
const request = require('request-promise-native');
const uuid = require('uuid/v4');
const cheerio = require('cheerio');
const lazyCreateModule = require('./util');
const CoolingModule = require('./modules/cooling');
const VentilationModule = require('./modules/ventilation');
const DhwModule = require('./modules/dhw');
const {
  COOLING, DHW, HEATING, LANGUAGE, PAGES, VENTILATION
} = require('./constants');

const localRequest = request.defaults({
  forever: true,
  jar: true
});

const BASE_HEADERS = {
  Cookie: `PHPSESSID=${uuid()}`,
  Connection: 'keep-alive'
};

const BASE_POST_OPTIONS = {
  method: 'POST',
  headers: BASE_HEADERS
};

const TEXT_RELATIVE_HUMIDITY_HC2 = 'RELATIVE HUMIDITY HC2';
const TEXT_HEATING_STAGE = 'HEATING STAGE';
const DEFAULT_CONSTRUCTOR_ARGS = {
  url: 'http://servicewelt',
  version: '2.1'
};

class IsgClient {
  constructor({
    url, username, password, version
  } = DEFAULT_CONSTRUCTOR_ARGS) {
    this.url = url;
    this.username = username;
    this.password = password;
    this.version = version;
    this.languageSet = false;
    this.baseSaveOptions = Object.assign({
      url: `${this.url}/save.php`,
      json: true
    }, BASE_POST_OPTIONS);
  }

  /**
   * @returns {CoolingModule}
   */
  cooling() {
    return lazyCreateModule(this, 'coolingModule', CoolingModule);
  }

  /**
   * @returns {VentilationModule}
   */
  ventilation() {
    return lazyCreateModule(this, 'ventilationModule', VentilationModule);
  }

  /**
   * @returns {DhwModule}
   */
  dhw() {
    return lazyCreateModule(this, 'dhwModule', DhwModule);
  }

  login() {
    const options = Object.assign({
      uri: this.url,
      form: {
        make: 'send',
        user: this.username,
        pass: this.password
      }
    }, BASE_POST_OPTIONS);

    return localRequest(options).then(() => {
      this.session = { date: new Date() };
    }).catch(() => {
      this.session = null;
    });
  }

  /**
   * @returns {Promise<object>}
   */
  switchLanguageToEnglish() {
    return this.setParameter(LANGUAGE.withValue('ENGLISH'));
  }

  /**
   * @returns {Promise<string>}
   */
  async fetchLanguage() {
    const $ = await this.fetchPage(PAGES.LANGUAGE);
    return $(`#aval${LANGUAGE.id}`).val();
  }

  /**
   * @returns {Promise<number>}
   */
  async fetchHumidityHC2() {
    const $ = await this.fetchPage(PAGES.INFO.SYSTEM);
    const humidityText = $('td').filter((i, elem) => $(elem).text() === TEXT_RELATIVE_HUMIDITY_HC2).next().text();
    const humdityStrValue = humidityText.trim().substr(0, humidityText.length - 1).replace(',', '.');
    return parseFloat(humdityStrValue);
  }

  /**
   * @returns {Promise<number>}
   */
  async fetchHeatingStage() {
    const $ = await this.fetchPage(PAGES.INFO.SYSTEM);
    const humidityText = $('td').filter((i, elem) => $(elem).text() === TEXT_HEATING_STAGE).next().text();
    return parseFloat(humidityText.trim());
  }

  /**
   * @param name {string}
   * @param value {string|number}
   * @returns {Promise<object>}
   */
  async setParameter({ name, value }) {
    await this.verifyLoggedIn();
    const options = Object.assign({
      form: {
        data: JSON.stringify([{ name, value }])
      }
    }, this.baseSaveOptions);

    const { success, message } = await localRequest(options);
    if (success) {
      return message;
    }
    throw new Error(message);
  }

  /**
   * @param page {string}
   * @returns {Promise<Cheerio>}
   */
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
    const html = await localRequest.get(requestOpts);
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

module.exports = {
  IsgClient,
  VENTILATION,
  PAGES,
  HEATING,
  LANGUAGE,
  COOLING,
  DHW
};
},{"./util":"Y/Oq","./modules/cooling":"qQCB","./modules/ventilation":"Qy/x","./modules/dhw":"EenY","./constants":"iJA9"}]},{},["f9KS"], null)