const uuid = require("uuid");
const cheerio = require("cheerio");
const lazyCreateModule = require("./util");
const CoolingModule = require("./modules/cooling");
const VentilationModule = require("./modules/ventilation");
const DhwModule = require("./modules/dhw");
const {
  COOLING,
  DHW,
  HEATING,
  LANGUAGE,
  PAGES,
  VENTILATION,
} = require("./constants");

const BASE_HEADERS = {
  Cookie: `PHPSESSID=${uuid.v4()}`,
  Connection: "keep-alive",
};

const BASE_POST_OPTIONS = {
  method: "POST",
  credentials: "same-origin",
  headers: BASE_HEADERS,
};

const TEXT_RELATIVE_HUMIDITY_HC2 = "RELATIVE HUMIDITY HC2";
const TEXT_HEATING_STAGE = "HEATING STAGE";
const DEFAULT_CONSTRUCTOR_ARGS = {
  url: "http://servicewelt",
  version: "2.1",
};

class IsgClient {
  constructor({ url, username, password, version } = DEFAULT_CONSTRUCTOR_ARGS) {
    this.url = url;
    this.username = username;
    this.password = password;
    this.version = version;
    this.languageSet = false;
    this.baseSaveOptions = Object.assign(
      {
        url: `${this.url}/save.php`,
        json: true,
      },
      BASE_POST_OPTIONS
    );
  }

  /**
   * @returns {CoolingModule}
   */
  cooling() {
    return lazyCreateModule(this, "coolingModule", CoolingModule);
  }

  /**
   * @returns {VentilationModule}
   */
  ventilation() {
    return lazyCreateModule(this, "ventilationModule", VentilationModule);
  }

  /**
   * @returns {DhwModule}
   */
  dhw() {
    return lazyCreateModule(this, "dhwModule", DhwModule);
  }

  login() {
    const formData = new FormData();
    formData.append("make", "send");
    formData.append("user", this.username);
    formData.append("pass", this.password);

    const options = {
      body: formData,
  credentials: "same-origin",
      ...BASE_POST_OPTIONS,
    };

    return fetch(this.url, options)
      .then((response) => {
        this.session = { date: new Date() };
      })
      .catch(() => {
        this.session = null;
      });
  }

  /**
   * @returns {Promise<object>}
   */
  switchLanguageToEnglish() {
    return this.setParameter(LANGUAGE.withValue("ENGLISH"));
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
    const humidityText = $("td")
      .filter((i, elem) => $(elem).text() === TEXT_RELATIVE_HUMIDITY_HC2)
      .next()
      .text();
    const humdityStrValue = humidityText
      .trim()
      .substr(0, humidityText.length - 1)
      .replace(",", ".");
    return parseFloat(humdityStrValue);
  }

  /**
   * @returns {Promise<number>}
   */
  async fetchHeatingStage() {
    const $ = await this.fetchPage(PAGES.INFO.SYSTEM);
    const humidityText = $("td")
      .filter((i, elem) => $(elem).text() === TEXT_HEATING_STAGE)
      .next()
      .text();
    return parseFloat(humidityText.trim());
  }

  /**
   * @param name {string}
   * @param value {string|number}
   * @returns {Promise<object>}
   */
  async setParameter({ name, value }) {
    await this.verifyLoggedIn();
    const formData = new FormData();
    formData.append("data", JSON.stringify([{ name, value }]));
    const options = {
      body: formData,
      ...BASE_POST_OPTIONS,
    };

    const response = await fetch(this.baseSaveOptions.url, options);
    if (response.ok) {
      return response.statusText;
    }
    throw new Error(response.statusText);
  }

  /**
   * @param page {string}
   * @returns {Promise<Cheerio>}
   */
  async fetchPage(page) {
    const requestOpts = {
      headers: BASE_HEADERS,
      credentials: "same-origin",
    };
    await this.verifyLoggedIn();
    await this.verifyEnglishLanguage();
    const html = await fetch(
      this.url +
        "?" +
        new URLSearchParams({
          s: page,
        }),
      requestOpts
    ).then((response) => response.text());
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

module.exports = {
  IsgClient,
  VENTILATION,
  PAGES,
  HEATING,
  LANGUAGE,
  COOLING,
  DHW,
};
