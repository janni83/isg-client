const { VENTILATION } = require('../constants');

class VentilationModule {
  constructor(isgClient) {
    this.isgClient = isgClient;
  }

  /**
   * @param stage {number}
   * @returns {Promise<object>}
   */
  setDayStage(stage) {
    return this.isgClient.setParameter(VENTILATION.STAGE.DAY.withValue(stage));
  }
}

module.exports = VentilationModule;
