const request = require('request-promise-native').defaults({
  forever: true,
  jar: true,
});
const uuid = require('uuid/v4');
const cheerio = require('cheerio');
const { COOLING, VENTILATION } = require('./constants');

const BASE_HEADERS = {
  Cookie: `PHPSESSID=${uuid()}`,
  Connection: 'keep-alive',
};

const basePostOptions = {
  method: 'POST',
  headers: BASE_HEADERS,
};

const INFO_PAGE_QUERY = { s: '1,0' };
const DIAGNOSIS_STATUS_PAGE_QUERY = { s: '2,0' };
const TEXT_RELATIVE_HUMIDITY_HC2 = 'RELATIVE HUMIDITY HC2';
const TEXT_COOLING = 'COOLING';

class IsgApi {
  constructor({ url, username, password }) {
    this.url = url;
    this.username = username;
    this.password = password;
    this.baseSaveOptions = {
      url: `${this.url}/save.php`,
      json: true,
      ...basePostOptions,
    };
  }

  login() {
    const options = {
      uri: this.url,
      form: {
        make: 'send',
        user: this.username,
        pass: this.password,
      },
      ...basePostOptions,
    };
    return request(options)
      .then(() => {
        this.session = { date: new Date() };
      })
      .catch(() => {
        this.session = null;
      });
  }

  enableCoolingHK2(enabled) {
    return this.setParameter(COOLING.HC2.ENABLED.forRequest(enabled ? '1' : '0'));
  }

  setCoolingPowerPercent(percent) {
    return this.setParameter(COOLING.BASIC_SETTINGS.PERCENT_POWER.forRequest(percent));
  }

  setVentilationDay(stage) {
    return this.setParameter(VENTILATION.STAGES.DAY.forRequest(stage));
  }

  fetchHumidityHC2() {
    const requestOpts = {
      url: this.url,
      headers: BASE_HEADERS,
      qs: INFO_PAGE_QUERY,
    };

    return this.verifyLoggedIn()
      .then(() => request.get(requestOpts))
      .then(body => cheerio.load(body))
      .then($ => $('td')
        .filter((i, elem) => $(elem).text() === TEXT_RELATIVE_HUMIDITY_HC2)
        .next()
        .text())
      .then(value => value.trim().substr(0, value.length - 1).replace(',', '.'))
      .then(value => parseFloat(value));
  }

  fetchIsCoolingActive() {
    const requestOpts = {
      url: this.url,
      headers: BASE_HEADERS,
      qs: DIAGNOSIS_STATUS_PAGE_QUERY,
    };

    return this.verifyLoggedIn()
      .then(() => request.get(requestOpts))
      .then(body => cheerio.load(body))
      .then($ => $('td')
        .filter((i, elem) => $(elem).text().trim() === TEXT_COOLING))
      .then(elems => elems.length === 1);
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

  verifyLoggedIn() {
    if (!this.username && !this.password) {
      return Promise.resolve();
    }
    if (this.session) {
      return Promise.resolve();
    }
    return this.login();
  }
}

module.exports = IsgApi;
