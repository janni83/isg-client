const cheerio = require('cheerio');
const { PAGES } = require('../constants');

const PAGE_COOLING_ACTIVE = '<html><head></head><body><table><td>COOLING</td><td>COOLING</td><td>COMPRESSOR</td></table></body></html>';
const PAGE_COOLING_INACTIVE = '<html><head></head><body><table><td>COOLING</td><td>COOLING</td><td></td></table></body></html>';
const PAGE_COOLING_CAPACITY = ({ coolingCapacity }) => `<html><head></head><body><script>
                                                          jsvalues['411']['id']='val411';jsvalues['411']['val']='${coolingCapacity}';
                                                        </script></body></html>`;
const PAGE_INFO_SYSTEM = ({ humidity, heatingStage }) => `<html><head></head><body><table>
                                                            <td>RELATIVE HUMIDITY HC2</td><td>${humidity} %</td>
                                                            <td>HEATING STAGE</td><td>${heatingStage}</td>
                                                          </table></body></html>`;
const PAGE_LANGUAGE = ({ language }) => `<html><head></head><body><input id="avalspracheeinstellung" value="${language}" readonly="readonly" class="dropdown dropdown_text" style="width:9em"></body></html>`;

class IsgClientMock {
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
        result = PAGE_COOLING_CAPACITY(this.options);
        break;
      case PAGES.INFO.SYSTEM:
        result = PAGE_INFO_SYSTEM(this.options);
        break;
      case PAGES.LANGUAGE:
        result = PAGE_LANGUAGE(this.options);
        break;
      default:
        result = '';
    }
    return cheerio.load(result);
  }
}

module.exports = IsgClientMock;
