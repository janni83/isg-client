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
  ENERGY_MANAGEMENT,
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
    this.loginTries = 0;
    this.loginPromise = null;
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
    if (this.loginTries > 2) {
      this.session = null;
      this.loginTries = 0;
      this.loginPromise = null;
      throw new Error("too many login tries");
    }

    if (this.loginPromise) {
      return this.loginPromise;
    }

    this.loginTries += 1;

    const formData = new FormData();
    formData.append("make", "send");
    formData.append("user", this.username);
    formData.append("pass", this.password);

    const options = {
      body: formData,
      credentials: "same-origin",
      ...BASE_POST_OPTIONS,
    };

    this.loginPromise = fetch(this.url, options)
      .then(() => {
        this.session = { date: new Date() };
        this.loginTries = 0;
      })
      .catch(() => {
        this.session = null;
      })
      .finally(() => {
        this.loginPromise = null;
      });

    return this.loginPromise;
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
   * @param param {name: string, value: string|number}
   * @returns {Promise<object>}
   */
  async setParameter({ name, value }) {
    return this.setParameters([{ name, value }]);
  }

  /**
   * @param params [{name, value}] list of parameter name / value pairs
   * @returns {Promise<object>}
   */
  async setParameters(params) {
    await this.verifyLoggedIn();

    const formData = new FormData();
    formData.append("data", JSON.stringify(params));

    const options = {
      body: formData,
      ...BASE_POST_OPTIONS,
    };

    const response = await fetch(this.baseSaveOptions.url, options);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.text().then((resultText) => {
      try {
        return JSON.parse(resultText);
      } catch (e) {
        // assume session not valid anymore, retry with new session
        this.session = null;
        return this.setParameters(params);
      }
    });
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
      `${this.url}?${new URLSearchParams({
        s: page,
      })}`,
      requestOpts,
    ).then((response) => response.text());

    if (html.indexOf("loginscreen") >= 0) {
      // assume session not valid anymore, retry with new session
      this.session = null;
      return this.fetchPage(page);
    }

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
  ENERGY_MANAGEMENT,
};
