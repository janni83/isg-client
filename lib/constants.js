class Parameter {
  constructor({
    name, values, min, max,
  }) {
    this.name = name;
    this.values = values;
    this.min = min;
    this.max = max;
  }

  forRequest(value) {
    if (this.values && this.values.indexOf(value) === -1) {
      throw new Error(`'${value}' is not a valid value for parameter ${this.name}`);
    }
    if (this.min != null && value < this.min) {
      throw new Error(`'${value}' is below min value of '${this.min}' for parameter ${this.name}`);
    }
    if (this.max != null && value > this.max) {
      throw new Error(`'${value}' is above max value of '${this.max}' for parameter ${this.name}`);
    }
    return {
      name: this.name,
      value: `${value}`,
    };
  }
}

module.exports = {
  COOLING: {
    HC2: {
      ENABLED: new Parameter({ name: 'val74', values: ['1', '0'] }),
      TYPE: new Parameter({ name: 'val190', values: ['1', '0'] }),
      TEMPERATURE: new Parameter({ name: 'val104' }),
      HYST_ROOM_TEMP: new Parameter({ name: 'val108' }),
    },
    BASIC_SETTINGS: {
      PERCENT_POWER: new Parameter({ name: 'val411', min: 30, max: 50 }),
      HYST_VORLAUF: new Parameter({ name: 'val105', min: 0, max: 3 }),
    },
  },
  VENTILATION: {
    STAGES: {
      DAY: new Parameter({ name: 'val82', values: ['0', '1', '2', '3'] }),
      NIGHT: new Parameter({ name: 'val83', values: ['0', '1', '2', '3'] }),
      STANDBY: new Parameter({ name: 'val84', values: ['0', '1', '2', '3'] }),
      PARTY: new Parameter({ name: 'val85', values: ['0', '1', '2', '3'] }),
      MANUAL: new Parameter({ name: 'val88', values: ['0', '1', '2', '3'] }),
    },
  },
};
