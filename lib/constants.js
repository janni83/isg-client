class Parameter {
  /**
   * @param id {string}
   * @param [values] {array}
   * @param [min] {number}
   * @param [max] {number}
   */
  constructor({ id, values, min, max }) {
    this.id = id;
    this.values = values;
    this.min = min;
    this.max = max;
  }

  /**
   * @param value {number|string}
   * @returns {{name: string, value: string}}
   */
  withValue(value) {
    if (this.values && this.values.indexOf(value) === -1) {
      throw new Error(
        `'${value}' is not a valid value for parameter ${this.id}`,
      );
    }
    if (this.min != null && value < this.min) {
      throw new Error(
        `'${value}' is below min value of '${this.min}' for parameter ${this.id}`,
      );
    }
    if (this.max != null && value > this.max) {
      throw new Error(
        `'${value}' is above max value of '${this.max}' for parameter ${this.id}`,
      );
    }
    return {
      name: `val${this.id}`,
      value: `${value}`,
    };
  }
}

const PAGES = {
  COOLING: {
    STANDARD_SETTING: "4,3,4",
  },
  DIAGNOSIS: {
    STATUS: "2,0",
  },
  DHW: {
    STANDARD_SETTING: "4,1,1",
  },
  HEATING: {
    STANDARD_SETTING: "4,0,4",
  },
  INFO: {
    SYSTEM: "1,0",
  },
  LANGUAGE: "5,3",
};

const LANGUAGE = new Parameter({
  id: "spracheeinstellung",
  values: ["DEUTSCH", "ENGLISH"],
});

const HEATING = {
  HC1: {
    TEMPERATURE: {
      TEMP_DAY: new Parameter({ id: "5", min: 10, max: 30 }),
      TEMP_NIGHT: new Parameter({ id: "7", min: 10, max: 30 }),
      TEMP_STANDBY: new Parameter({ id: "58", min: 10, max: 30 }),
      TEMP_MANUAL: new Parameter({ id: "54", min: 10, max: 30 }),
    },
  },
  HC2: {
    TEMPERATURE: {
      TEMP_DAY: new Parameter({ id: "6", min: 10, max: 30 }),
      TEMP_NIGHT: new Parameter({ id: "8", min: 10, max: 30 }),
      TEMP_STANDBY: new Parameter({ id: "59", min: 10, max: 30 }),
      TEMP_MANUAL: new Parameter({ id: "55", min: 10, max: 30 }),
    },
  },
  STANDARD_SETTING: {
    PROP_COMP: new Parameter({ id: "431", min: 0, max: 10 }),
    INTEGRAL_COMPONENT: new Parameter({ id: "432", min: 0, max: 500 }),
    MAX_BH_STAGES: new Parameter({ id: "130", min: 0, max: 3 }),
    MAX_FLOW_TEMP: new Parameter({ id: "21", min: 10, max: 75 }),
    SUMMER_MODE: new Parameter({ id: "40", min: 10, max: 25 }),
    HYST_SUMMER_MODE: new Parameter({ id: "133", min: 1, max: 7 }),
    DUAL_MODE_HEAT: new Parameter({ id: "64", min: -20, max: 10 }),
    BOOSTER_TIMEOUT: new Parameter({ id: "131", min: 0, max: 60 }),
    OUTSIDE_T_CORRECTION: new Parameter({ id: "134", min: -20, max: 30 }),
    SUPPR_TEMP_MEASURE: new Parameter({ id: "187", min: 0, max: 120 }),
    HEATING_SYS_TEMP_SIZING: new Parameter({ id: "433", min: -25, max: 5 }),
    HEATING_SYS_OUTPUT_SIZING: new Parameter({ id: "434", min: 40, max: 100 }),
  },
};

const COOLING = {
  HC2: {
    MODE: {
      ENABLED: new Parameter({ id: "74", values: ["1", "0"] }),
      TYPE: new Parameter({ id: "190", values: ["1", "0"] }),
      TEMPERATURE: new Parameter({ id: "104" }),
      HYST_ROOM_TEMP: new Parameter({ id: "108" }),
    },
    ROOM_TEMP: {
      DAY: new Parameter({ id: "77", min: 10, max: 30 }),
      NIGHT: new Parameter({ id: "81", min: 10, max: 30 }),
      STANDBY: new Parameter({ id: "79", min: 10, max: 30 }),
    },
  },
  HC1: {
    MODE: {
      ENABLED: new Parameter({ id: "73", values: ["1", "0"] }),
      TYPE: new Parameter({ id: "189", values: ["1", "0"] }),
      TEMPERATURE: new Parameter({ id: "103" }),
      HYST_ROOM_TEMP: new Parameter({ id: "107" }),
    },
    ROOM_TEMP: {
      DAY: new Parameter({ id: "76", min: 10, max: 30 }),
      NIGHT: new Parameter({ id: "80", min: 10, max: 30 }),
      STANDBY: new Parameter({ id: "78", min: 10, max: 30 }),
    },
  },
  STANDARD_SETTING: {
    PERCENT_CAPACITY: new Parameter({ id: "411", min: 30, max: 50 }),
    HYST_FLOW_TEMP: new Parameter({ id: "105", min: 0, max: 3 }),
  },
};

const VENTILATION = {
  STAGE: {
    DAY: new Parameter({ id: "82", values: ["0", "1", "2", "3"] }),
    NIGHT: new Parameter({ id: "83", values: ["0", "1", "2", "3"] }),
    STANDBY: new Parameter({ id: "84", values: ["0", "1", "2", "3"] }),
    MANUAL: new Parameter({ id: "88", values: ["0", "1", "2", "3"] }),
    PARTY: new Parameter({ id: "85", values: ["0", "1", "2", "3"] }),
  },
  FLOW_RATE: {
    FAN_STAGE_VENT_AIR_1: new Parameter({ id: "91", min: 10, max: 300 }),
    FAN_STAGE_VENT_AIR_2: new Parameter({ id: "92", min: 80, max: 300 }),
    FAN_STAGE_VENT_AIR_3: new Parameter({ id: "93", min: 80, max: 300 }),
    FAN_STAGE_EXTRACT_AIR_1: new Parameter({ id: "94", min: 10, max: 300 }),
    FAN_STAGE_EXTRACT_AIR_2: new Parameter({ id: "95", min: 10, max: 300 }),
    FAN_STAGE_EXTRACT_AIR_3: new Parameter({ id: "96", min: 10, max: 300 }),
  },
};

const DHW = {
  TEMPERATURE: {
    DAY: new Parameter({ id: "17", min: 10, max: 65 }),
    NIGHT: new Parameter({ id: "161", min: 10, max: 65 }),
    STANDBY: new Parameter({ id: "102", min: 10, max: 65 }),
    MANUAL: new Parameter({ id: "101", min: 10, max: 65 }),
  },
  STANDARD_SETTING: {
    HYSTERESIS: new Parameter({ id: "60", min: 2, max: 10 }),
    BOOSTER_TIMEOUT: new Parameter({ id: "111", min: 0, max: 360 }),
    BOOSTER_T_ACTIVATE: new Parameter({ id: "112", min: -10, max: 10 }),
    PASTEURISATION: new Parameter({ id: "109", min: 1, max: 30 }),
    MAX_DHW_HTG_DURATION: new Parameter({ id: "62", min: 6, max: 12 }),
    PASTEUR_TEMP: new Parameter({ id: "110", min: 10, max: 65 }),
    DHW_BOOSTER_STAGE: new Parameter({ id: "113", min: 1, max: 3 }),
    DHW_BUFFER_MODE: new Parameter({ id: "114", values: ["0", "1"] }),
    MAX_FLOW_TEMP: new Parameter({ id: "115", min: 10, max: 75 }),
    DHW_ECO: new Parameter({ id: "116", values: ["0", "1"] }),
    DHW_OUTPUT_SUMMER: new Parameter({ id: "420", min: 30, max: 100 }),
    DHW_OUTPUT_WINTER: new Parameter({ id: "421", min: 30, max: 100 }),
    INTEGRAL_SENSOR: new Parameter({ id: "422", values: ["0", "1"] }),
    SECOND_DHW_CYLINDER: new Parameter({ id: "423", values: ["0", "1"] }),
  },
};

module.exports = {
  PAGES,
  LANGUAGE,
  HEATING,
  COOLING,
  VENTILATION,
  DHW,
};
