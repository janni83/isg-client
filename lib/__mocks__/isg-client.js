const cheerio = require('cheerio');
const { PAGES } = require('../constants');

const PAGE_COOLING_ACTIVE = '<html><head></head><body><table><td>COOLING</td><td>COOLING</td><td>COMPRESSOR</td></table></body></html>';
const PAGE_COOLING_INACTIVE = '<html><head></head><body><table><td>COOLING</td><td>COOLING</td><td></td></table></body></html>';
const PAGE_COOLING_CAPACITY = capacity => `<html><head></head><body><script>jsvalues['411']['id']='val411';jsvalues['411']['val']='${capacity}';</script></body></html>`;

class IsgClient {
  constructor(options) {
    this.options = options || {};
  }

  // eslint-disable-next-line class-methods-use-this
  async fetchPage(page) {
    let result;
    switch (page) {
      case PAGES.DIAGNOSIS.STATUS:
        result = this.options.coolingActive ? PAGE_COOLING_ACTIVE : PAGE_COOLING_INACTIVE;
        break;
      case PAGES.COOLING.STANDARD_SETTING:
        result = PAGE_COOLING_CAPACITY(this.options.coolingCapacity);
        break;
      default:
        result = '';
    }
    return cheerio.load(result);
  }
}

module.exports = IsgClient;
