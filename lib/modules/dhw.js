const { DHW, PAGES } = require("../constants");

const REGEX_VALUE_OUTPUT_SUMMER = new RegExp(
  `\\['${DHW.STANDARD_SETTING.DHW_OUTPUT_SUMMER.id}'\\]\\['val'\\]='([0-9]{2,3})'`,
);
const REGEX_VALUE_OUTPUT_WINTER = new RegExp(
  `\\['${DHW.STANDARD_SETTING.DHW_OUTPUT_WINTER.id}'\\]\\['val'\\]='([0-9]{2,3})'`,
);
const TEXT_DHW = "DHW";

class DhwModule {
  constructor(isgClient) {
    this.isgClient = isgClient;
  }

  /**
   * Fetches whether DHW is active
   */
  async isActive() {
    const $ = await this.isgClient.fetchPage(PAGES.DIAGNOSIS.STATUS);
    const matchingElements = $("td")
      .map((i, elem) => $(elem).text().trim())
      .filter((i, columnText) => [TEXT_DHW].includes(columnText));
    return matchingElements.length >= 1;
  }

  /**
   * @param percent
   * @returns {Promise<object>}
   */
  setOutputSummer(percent) {
    return this.isgClient.setParameter(
      DHW.STANDARD_SETTING.DHW_OUTPUT_SUMMER.withValue(percent),
    );
  }

  /**
   * @returns {Promise<number>}
   */
  async outputSummer() {
    const $ = await this.isgClient.fetchPage(PAGES.DHW.STANDARD_SETTING);
    const matches = REGEX_VALUE_OUTPUT_SUMMER.exec($.html())[1];
    return parseInt(matches, 10);
  }

  /**
   * @param percent
   * @returns {Promise<object>}
   */
  setOutputWinter(percent) {
    return this.isgClient.setParameter(
      DHW.STANDARD_SETTING.DHW_OUTPUT_WINTER.withValue(percent),
    );
  }

  /**
   * @returns {Promise<number>}
   */
  async outputWinter() {
    const $ = await this.isgClient.fetchPage(PAGES.DHW.STANDARD_SETTING);
    const matches = REGEX_VALUE_OUTPUT_WINTER.exec($.html())[1];
    return parseInt(matches, 10);
  }
}

module.exports = DhwModule;
