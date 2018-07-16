const request = require('request-promise-native').defaults({
  forever: true,
  jar: true,
});
const uuid = require('uuid/v4');
const cheerio = require('cheerio');
const CoolingModule = require('./modules/cooling');
const { VENTILATION, LANGUAGE } = require('./constants');

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

class IsgClient {
  constructor({
    url, username, password, version,
  }) {
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
    this.cooling = new CoolingModule(this);
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
    return request(options)
      .then(() => {
        this.session = { date: new Date() };
      })
      .catch(() => {
        this.session = null;
      });
  }

  setVentilationDay(stage) {
    return this.setParameter(VENTILATION.STAGES.DAY.forRequest(stage));
  }

  switchLanguageToEnglish() {
    return this.setParameter(LANGUAGE.forRequest('ENGLISH'));
  }

  fetchLanguage() {
    return this.fetchPage(LANGUAGE_PAGE)
      .then(body => cheerio.load(body))
      .then($ => $('#avalspracheeinstellung').attr('value'));
  }

  fetchHumidityHC2() {
    return this.fetchPage(INFO_SYSTEM_PAGE)
      .then(body => cheerio.load(body))
      .then($ => $('td')
        .filter((i, elem) => $(elem).text() === TEXT_RELATIVE_HUMIDITY_HC2)
        .next()
        .text())
      .then(value => value.trim().substr(0, value.length - 1).replace(',', '.'))
      .then(value => parseFloat(value));
  }

  setParameter({ name, value }) {
    return this.verifyLoggedIn()
      .then(() => {
        const options = {
          form: {
            data: JSON.stringify([
              { name, value },
            ]),
          },
          ...this.baseSaveOptions,
        };
        return request(options);
      })
      .then(({ success, message }) => (success ? message : new Error(message)));
  }

  fetchPage(page) {
    const requestOpts = {
      url: this.url,
      headers: BASE_HEADERS,
      qs: {
        s: page,
      },
    };
    return this.verifyLoggedIn()
      .then(() => this.verifyEnglishLanguage())
      .then(() => request.get(requestOpts));
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
      .then(() => { this.languageSet = true; })
      .catch((error) => { throw new Error(`failed to set language to english: ${error}`); });
  }
}

module.exports = IsgClient;
