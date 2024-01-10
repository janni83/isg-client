const { HEATING, PAGES } = require("../constants");

const TEXT_HEATING = "HEATING";
const TEXT_COMPRESSOR = "COMPRESSOR";
const REGEX_VALUE_CAPACITY = new RegExp(
  `\\['${HEATING.STANDARD_SETTING.HEATING_SYS_OUTPUT_SIZING.id}'\\]\\['val'\\]='([0-9]{2,3})'`,
);

class HeatingModule {
  constructor(isgClient) {
    this.isgClient = isgClient;
  }

  async output() {
    const $ = await this.isgClient.fetchPage(PAGES.HEATING.STANDARD_SETTING);
    const matches = REGEX_VALUE_CAPACITY.exec($.html())[1];
    return parseInt(matches, 10);
  }

  /**
   * heating is active if operating status and processes contain 'HEATING'
   * @returns {Promise<boolean>}
   */
  async isActive() {
    const $ = await this.isgClient.fetchPage(PAGES.DIAGNOSIS.STATUS);
    const matchingElements = $("td")
      .map((i, elem) => $(elem).text().trim())
      .filter((i, columnText) =>
        [TEXT_HEATING, TEXT_COMPRESSOR].includes(columnText),
      );
    return matchingElements.length >= 3;
  }
}

module.exports = HeatingModule;
