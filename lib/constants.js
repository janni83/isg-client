class Parameter {
  constructor({
    id, values, min, max,
  }) {
    this.id = id;
    this.values = values;
    this.min = min;
    this.max = max;
  }

  forRequest(value) {
    if (this.values && this.values.indexOf(value) === -1) {
      throw new Error(`'${value}' is not a valid value for parameter ${this.id}`);
    }
    if (this.min != null && value < this.min) {
      throw new Error(`'${value}' is below min value of '${this.min}' for parameter ${this.id}`);
    }
    if (this.max != null && value > this.max) {
      throw new Error(`'${value}' is above max value of '${this.max}' for parameter ${this.id}`);
    }
    return {
      name: `val${this.id}`,
      value: `${value}`,
    };
  }
}

const PAGES = {
  DIAGNOSIS: {
    STATUS: '2,0',
  },
  COOLING: {
    STANDARD_SETTING: '4,3,4',
  },
};

const LANGUAGE = new Parameter({ id: 'spracheeinstellung', values: ['DEUTSCH', 'ENGLISH'] });

const COOLING = {
  HC2: {
    ENABLED: new Parameter({ id: '74', values: ['1', '0'] }),
    TYPE: new Parameter({ id: '190', values: ['1', '0'] }),
    TEMPERATURE: new Parameter({ id: '104' }),
    HYST_ROOM_TEMP: new Parameter({ id: '108' }),
  },
  STANDARD_SETTING: {
    PERCENT_CAPACITY: new Parameter({ id: '411', min: 30, max: 50 }),
    HYST_FLOW_TEMP: new Parameter({ id: '105', min: 0, max: 3 }),
  },
};

const VENTILATION = {
  STAGES: {
    DAY: new Parameter({ id: '82', values: ['0', '1', '2', '3'] }),
    NIGHT: new Parameter({ id: '83', values: ['0', '1', '2', '3'] }),
    STANDBY: new Parameter({ id: '84', values: ['0', '1', '2', '3'] }),
    MANUAL: new Parameter({ id: '88', values: ['0', '1', '2', '3'] }),
    PARTY: new Parameter({ id: '85', values: ['0', '1', '2', '3'] }),
  },
};

export {
  PAGES,
  LANGUAGE,
  COOLING,
  VENTILATION,
};
