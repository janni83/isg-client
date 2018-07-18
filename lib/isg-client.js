import request from 'request-promise-native';
import uuid from 'uuid/v4';
import cheerio from 'cheerio';
import { LANGUAGE } from './constants';
import lazyCreateModule from './util';
import CoolingModule from './modules/cooling';
import VentilationModule from './modules/ventilation';

const localRequest = request.defaults({
  forever: true,
  jar: true,
});

const BASE_HEADERS = {
  Cookie: `PHPSESSID=${uuid()}`,
  Connection: 'keep-alive',
};

const BASE_POST_OPTIONS = {
  method: 'POST',
  headers: BASE_HEADERS,
};

const INFO_SYSTEM_PAGE = '1,0';
const LANGUAGE_PAGE = '5,3';
const TEXT_RELATIVE_HUMIDITY_HC2 = 'RELATIVE HUMIDITY HC2';
const DEFAULT_CONSTRUCTOR_ARGS = {
  url: 'http://servicewelt',
  version: '2.1',
};

class IsgClient {
  constructor({
    url, username, password, version,
  } = DEFAULT_CONSTRUCTOR_ARGS) {
    this.url = url;
    this.username = username;
    this.password = password;
    this.version = version;
    this.languageSet = false;
    this.baseSaveOptions = {
      url: `${this.url}/save.php`,
      json: true,
      ...BASE_POST_OPTIONS,
    };
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

  login() {
    const options = {
      uri: this.url,
      form: {
        make: 'send',
        user: this.username,
        pass: this.password,
      },
      ...BASE_POST_OPTIONS,
    };
    return localRequest(options)
      .then(() => {
        this.session = { date: new Date() };
      })
      .catch(() => {
        this.session = null;
      });
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
    const humidityText = $('td').filter((i, elem) => $(elem).text() === TEXT_RELATIVE_HUMIDITY_HC2)
      .next()
      .text();
    const humdityStrValue = humidityText.trim().substr(0, humidityText.length - 1).replace(',', '.');
    return parseFloat(humdityStrValue);
  }

  async setParameter({ name, value }) {
    await this.verifyLoggedIn();
    const options = {
      form: {
        data: JSON.stringify([
          { name, value },
        ]),
      },
      ...this.baseSaveOptions,
    };
    const { success, message } = await localRequest(options);
    if (success) {
      return message;
    }
    throw new Error(message);
  }

  async fetchPage(page) {
    const requestOpts = {
      url: this.url,
      headers: BASE_HEADERS,
      qs: {
        s: page,
      },
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
    return this.switchLanguageToEnglish()
      .then(() => {
        this.languageSet = true;
      })
      .catch((error) => {
        throw new Error(`failed to set language to english: ${error}`);
      });
  }
}

export default IsgClient;
