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
  async outputSummer() {
    const $ = await this.isgClient.fetchPage(PAGES.DHW.STANDARD_SETTING);
    const matches = REGEX_VALUE_OUTPUT_SUMMER.exec($.html())[1];
    return parseInt(matches, 10);
  }
}

module.exports = DhwModule;
