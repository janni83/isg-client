import { VENTILATION } from '../constants';

class VentilationModule {
  constructor(isgClient) {
    this.isgClient = isgClient;
  }

  setDayStage(stage) {
    return this.isgClient.setParameter(VENTILATION.STAGE.DAY.withValue(stage));
  }
}

export default VentilationModule;
