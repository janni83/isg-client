import { VENTILATION } from '../constants';

class VentilationModule {
  constructor(isgClient) {
    this.isgClient = isgClient;
  }

  setDayStage(stage) {
    return this.isgClient.setParameter(VENTILATION.STAGES.DAY.forRequest(stage));
  }
}

export default VentilationModule;
