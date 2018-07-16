const cheerio = require('cheerio');
const { COOLING, PAGES } = require('../constants');

const TEXT_COOLING = 'COOLING';

class CoolingModule {
  constructor(isgClient) {
    this.isgClient = isgClient;
  }

  setCoolingEnabledHC2(enabled) {
    return this.isgClient.setParameter(COOLING.HC2.ENABLED.forRequest(enabled ? '1' : '0'));
  }

  setCoolingCapacity(percent) {
    return this.isgClient.setParameter(
      COOLING.STANDARD_SETTING.PERCENT_CAPACITY.forRequest(percent),
    );
  }

  fetchIsCoolingActive() {
    return this.isgClient.fetchPage(PAGES.DIAGNOSIS.STATUS)
      .then(body => cheerio.load(body))
      .then($ => $('td')
        .filter((i, elem) => $(elem).text().trim() === TEXT_COOLING))
      .then(elems => elems.length === 1);
  }
}

module.exports = CoolingModule;
