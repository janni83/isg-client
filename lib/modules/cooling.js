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
    return this.isgClient.setParameter(
      COOLING.STANDARD_SETTING.PERCENT_CAPACITY.withValue(percent),
    );
  }

  /**
   * cooling is active if operating status and processes contain 'COOLING'
   * @returns {Promise<boolean>}
   */
  async fetchIsActive() {
    const $ = await this.isgClient.fetchPage(PAGES.DIAGNOSIS.STATUS);
    const matchingElements = $('td')
      .map((i, elem) => $(elem).text().trim())
      .filter((i, columnText) => [TEXT_COOLING, TEXT_COMPRESSOR].includes(columnText));
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
