const { COOLING, PAGES } = require('../constants');

const TEXT_COOLING = 'COOLING';
const REGEX_VALUE_CAPACITY = new RegExp(`\\['${COOLING.STANDARD_SETTING.PERCENT_CAPACITY.id}'\\]\\['val'\\]='([0-9]{2})'`);

class CoolingModule {
  constructor(isgClient) {
    this.isgClient = isgClient;
  }

  setEnabledHC2(enabled) {
    return this.isgClient.setParameter(COOLING.HC2.ENABLED.forRequest(enabled ? '1' : '0'));
  }

  setCapacity(percent) {
    return this.isgClient.setParameter(
      COOLING.STANDARD_SETTING.PERCENT_CAPACITY.forRequest(percent),
    );
  }

  // cooling is active if operating status and processes contain 'COOLING'
  async fetchIsActive() {
    const $ = await this.isgClient.fetchPage(PAGES.DIAGNOSIS.STATUS);
    const matchingElements = $('td').filter((i, elem) => $(elem).text().trim() === TEXT_COOLING);
    return matchingElements.length >= 2;
  }

  // capacity value cannot be read from an html element; have to do a regex search on js code
  async fetchCapacity() {
    const $ = await this.isgClient.fetchPage(PAGES.COOLING.STANDARD_SETTING);
    const matches = REGEX_VALUE_CAPACITY.exec($.html())[1];
    return parseInt(matches, 10);
  }
}

module.exports = CoolingModule;
