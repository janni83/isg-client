const cheerio = require('cheerio');
const { PAGES } = require('../constants');

const PAGE_COOLING_ACTIVE = '<html><head></head><body><table><td>COOLING</td><td>COOLING</td><td>COMPRESSOR</td></table></body></html>';
const PAGE_COOLING_INACTIVE = '<html><head></head><body><table><td>COOLING</td><td>COOLING</td><td></td></table></body></html>';


class IsgClient {
  constructor({ coolingActive = false } = {}) {
    this.coolingActive = coolingActive;
  }

  // eslint-disable-next-line class-methods-use-this
  async fetchPage(page) {
    let result;
    switch (page) {
      case PAGES.DIAGNOSIS.STATUS:
        result = this.coolingActive ? PAGE_COOLING_ACTIVE : PAGE_COOLING_INACTIVE;
        break;
      default:
        result = '';
    }
    return cheerio.load(result);
  }
}

module.exports = IsgClient;
