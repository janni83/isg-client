const cheerio = require('cheerio');
const { PAGES } = require('../constants');

const PAGE_COOLING_ACTIVE = '<table><td>COOLING</td><td>COOLING</td><td>COMPRESSOR</td></table>';
const PAGE_COOLING_INACTIVE = '<table><td>COOLING</td><td>COOLING</td><td></td></table>';
const PAGE_COOLING_CAPACITY = ({ coolingCapacity }) => `<script>jsvalues['411']['id']='val411';jsvalues['411']['val']='${coolingCapacity}';</script>`;
const PAGE_INFO_SYSTEM = ({ humidity, heatingStage }) => `<table><td>RELATIVE HUMIDITY HC2</td><td>${humidity} %</td><td>HEATING STAGE</td><td>${heatingStage}</td></table>`;
const PAGE_LANGUAGE = ({ language }) => `<input id="avalspracheeinstellung" value="${language}" readonly="readonly" class="dropdown dropdown_text" style="width:9em">`;
const PAGE_HEATING_ACTIVE = '<table><td>HEATING</td><td>HEATING</td><td>COMPRESSOR</td></table>';
const PAGE_HEATING_INACTIVE = '<table><td>HEATING</td><td>HEATING</td><td></td></table>';
const PAGE_HEATING_OUTPUT = ({ heatingOutput }) => `<script language="javascript" type="text/javascript">jsvalues['434']['id']='val434';jsvalues['434']['val']='${heatingOutput}';</script>`;

class IsgClientMock {
  constructor(options) {
    this.options = options || {};
  }

  // eslint-disable-next-line class-methods-use-this
  async fetchPage(page) {
    let result;
    switch (page) {
      case PAGES.DIAGNOSIS.STATUS:
        if (this.options.coolingActive != null) {
          result = this.options.coolingActive ? PAGE_COOLING_ACTIVE : PAGE_COOLING_INACTIVE;
        } else {
          result = this.options.heatingActive ? PAGE_HEATING_ACTIVE : PAGE_HEATING_INACTIVE;
        }
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
      case PAGES.HEATING.STANDARD_SETTING:
        result = PAGE_HEATING_OUTPUT(this.options);
        break;
      default:
        result = '';
    }
    return cheerio.load(result);
  }
}

module.exports = IsgClientMock;
