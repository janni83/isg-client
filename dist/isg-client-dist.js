var $kIu9n$uuid = require("uuid");
var $kIu9n$cheerio = require("cheerio");



var $2429056a9cd033ad$exports = {};
/**
 * @param object {object}
 * @param propertyName {string}
 * @param constructor {function}
 * @returns {object}
 */ const $2429056a9cd033ad$var$lazyCreateModule = (object, propertyName, constructor)=>{
    if (!object[propertyName]) // eslint-disable-next-line no-param-reassign
    object[propertyName] = new constructor(object);
    return object[propertyName];
};
$2429056a9cd033ad$exports = $2429056a9cd033ad$var$lazyCreateModule;


var $65b728b2397734f8$exports = {};
var $2c7bf509a8ddec7b$exports = {};
class $2c7bf509a8ddec7b$var$Parameter {
    /**
   * @param id {string}
   * @param [values] {array}
   * @param [min] {number}
   * @param [max] {number}
   */ constructor({ id: id, values: values, min: min, max: max }){
        this.id = id;
        this.values = values;
        this.min = min;
        this.max = max;
    }
    /**
   * @param value {number|string}
   * @returns {{name: string, value: string}}
   */ withValue(value) {
        if (this.values && this.values.indexOf(value) === -1) throw new Error(`'${value}' is not a valid value for parameter ${this.id}`);
        if (this.min != null && value < this.min) throw new Error(`'${value}' is below min value of '${this.min}' for parameter ${this.id}`);
        if (this.max != null && value > this.max) throw new Error(`'${value}' is above max value of '${this.max}' for parameter ${this.id}`);
        return {
            name: `val${this.id}`,
            value: `${value}`
        };
    }
}
const $2c7bf509a8ddec7b$var$PAGES = {
    COOLING: {
        STANDARD_SETTING: "4,3,4"
    },
    DIAGNOSIS: {
        STATUS: "2,0"
    },
    DHW: {
        STANDARD_SETTING: "4,1,1"
    },
    HEATING: {
        STANDARD_SETTING: "4,0,4"
    },
    INFO: {
        SYSTEM: "1,0"
    },
    LANGUAGE: "5,3"
};
const $2c7bf509a8ddec7b$var$LANGUAGE = new $2c7bf509a8ddec7b$var$Parameter({
    id: "spracheeinstellung",
    values: [
        "DEUTSCH",
        "ENGLISH"
    ]
});
const $2c7bf509a8ddec7b$var$HEATING = {
    HC1: {
        TEMPERATURE: {
            TEMP_DAY: new $2c7bf509a8ddec7b$var$Parameter({
                id: "5",
                min: 10,
                max: 30
            }),
            TEMP_NIGHT: new $2c7bf509a8ddec7b$var$Parameter({
                id: "7",
                min: 10,
                max: 30
            }),
            TEMP_STANDBY: new $2c7bf509a8ddec7b$var$Parameter({
                id: "58",
                min: 10,
                max: 30
            }),
            TEMP_MANUAL: new $2c7bf509a8ddec7b$var$Parameter({
                id: "54",
                min: 10,
                max: 30
            })
        }
    },
    HC2: {
        TEMPERATURE: {
            TEMP_DAY: new $2c7bf509a8ddec7b$var$Parameter({
                id: "6",
                min: 10,
                max: 30
            }),
            TEMP_NIGHT: new $2c7bf509a8ddec7b$var$Parameter({
                id: "8",
                min: 10,
                max: 30
            }),
            TEMP_STANDBY: new $2c7bf509a8ddec7b$var$Parameter({
                id: "59",
                min: 10,
                max: 30
            }),
            TEMP_MANUAL: new $2c7bf509a8ddec7b$var$Parameter({
                id: "55",
                min: 10,
                max: 30
            })
        }
    },
    STANDARD_SETTING: {
        PROP_COMP: new $2c7bf509a8ddec7b$var$Parameter({
            id: "431",
            min: 0,
            max: 10
        }),
        INTEGRAL_COMPONENT: new $2c7bf509a8ddec7b$var$Parameter({
            id: "432",
            min: 0,
            max: 500
        }),
        MAX_BH_STAGES: new $2c7bf509a8ddec7b$var$Parameter({
            id: "130",
            min: 0,
            max: 3
        }),
        MAX_FLOW_TEMP: new $2c7bf509a8ddec7b$var$Parameter({
            id: "21",
            min: 10,
            max: 75
        }),
        SUMMER_MODE: new $2c7bf509a8ddec7b$var$Parameter({
            id: "40",
            min: 10,
            max: 25
        }),
        HYST_SUMMER_MODE: new $2c7bf509a8ddec7b$var$Parameter({
            id: "133",
            min: 1,
            max: 7
        }),
        DUAL_MODE_HEAT: new $2c7bf509a8ddec7b$var$Parameter({
            id: "64",
            min: -20,
            max: 10
        }),
        BOOSTER_TIMEOUT: new $2c7bf509a8ddec7b$var$Parameter({
            id: "131",
            min: 0,
            max: 60
        }),
        OUTSIDE_T_CORRECTION: new $2c7bf509a8ddec7b$var$Parameter({
            id: "134",
            min: -20,
            max: 30
        }),
        SUPPR_TEMP_MEASURE: new $2c7bf509a8ddec7b$var$Parameter({
            id: "187",
            min: 0,
            max: 120
        }),
        HEATING_SYS_TEMP_SIZING: new $2c7bf509a8ddec7b$var$Parameter({
            id: "433",
            min: -25,
            max: 5
        }),
        HEATING_SYS_OUTPUT_SIZING: new $2c7bf509a8ddec7b$var$Parameter({
            id: "434",
            min: 40,
            max: 100
        })
    }
};
const $2c7bf509a8ddec7b$var$COOLING = {
    HC2: {
        MODE: {
            ENABLED: new $2c7bf509a8ddec7b$var$Parameter({
                id: "74",
                values: [
                    "1",
                    "0"
                ]
            }),
            TYPE: new $2c7bf509a8ddec7b$var$Parameter({
                id: "190",
                values: [
                    "1",
                    "0"
                ]
            }),
            TEMPERATURE: new $2c7bf509a8ddec7b$var$Parameter({
                id: "104"
            }),
            HYST_ROOM_TEMP: new $2c7bf509a8ddec7b$var$Parameter({
                id: "108"
            })
        },
        ROOM_TEMP: {
            DAY: new $2c7bf509a8ddec7b$var$Parameter({
                id: "77",
                min: 10,
                max: 30
            }),
            NIGHT: new $2c7bf509a8ddec7b$var$Parameter({
                id: "81",
                min: 10,
                max: 30
            }),
            STANDBY: new $2c7bf509a8ddec7b$var$Parameter({
                id: "79",
                min: 10,
                max: 30
            })
        }
    },
    HC1: {
        MODE: {
            ENABLED: new $2c7bf509a8ddec7b$var$Parameter({
                id: "73",
                values: [
                    "1",
                    "0"
                ]
            }),
            TYPE: new $2c7bf509a8ddec7b$var$Parameter({
                id: "189",
                values: [
                    "1",
                    "0"
                ]
            }),
            TEMPERATURE: new $2c7bf509a8ddec7b$var$Parameter({
                id: "103"
            }),
            HYST_ROOM_TEMP: new $2c7bf509a8ddec7b$var$Parameter({
                id: "107"
            })
        },
        ROOM_TEMP: {
            DAY: new $2c7bf509a8ddec7b$var$Parameter({
                id: "76",
                min: 10,
                max: 30
            }),
            NIGHT: new $2c7bf509a8ddec7b$var$Parameter({
                id: "80",
                min: 10,
                max: 30
            }),
            STANDBY: new $2c7bf509a8ddec7b$var$Parameter({
                id: "78",
                min: 10,
                max: 30
            })
        }
    },
    STANDARD_SETTING: {
        PERCENT_CAPACITY: new $2c7bf509a8ddec7b$var$Parameter({
            id: "411",
            min: 30,
            max: 50
        }),
        HYST_FLOW_TEMP: new $2c7bf509a8ddec7b$var$Parameter({
            id: "105",
            min: 0,
            max: 3
        })
    }
};
const $2c7bf509a8ddec7b$var$VENTILATION = {
    STAGE: {
        DAY: new $2c7bf509a8ddec7b$var$Parameter({
            id: "82",
            values: [
                "0",
                "1",
                "2",
                "3"
            ]
        }),
        NIGHT: new $2c7bf509a8ddec7b$var$Parameter({
            id: "83",
            values: [
                "0",
                "1",
                "2",
                "3"
            ]
        }),
        STANDBY: new $2c7bf509a8ddec7b$var$Parameter({
            id: "84",
            values: [
                "0",
                "1",
                "2",
                "3"
            ]
        }),
        MANUAL: new $2c7bf509a8ddec7b$var$Parameter({
            id: "88",
            values: [
                "0",
                "1",
                "2",
                "3"
            ]
        }),
        PARTY: new $2c7bf509a8ddec7b$var$Parameter({
            id: "85",
            values: [
                "0",
                "1",
                "2",
                "3"
            ]
        })
    },
    FLOW_RATE: {
        FAN_STAGE_VENT_AIR_1: new $2c7bf509a8ddec7b$var$Parameter({
            id: "91",
            min: 10,
            max: 300
        }),
        FAN_STAGE_VENT_AIR_2: new $2c7bf509a8ddec7b$var$Parameter({
            id: "92",
            min: 80,
            max: 300
        }),
        FAN_STAGE_VENT_AIR_3: new $2c7bf509a8ddec7b$var$Parameter({
            id: "93",
            min: 80,
            max: 300
        }),
        FAN_STAGE_EXTRACT_AIR_1: new $2c7bf509a8ddec7b$var$Parameter({
            id: "94",
            min: 10,
            max: 300
        }),
        FAN_STAGE_EXTRACT_AIR_2: new $2c7bf509a8ddec7b$var$Parameter({
            id: "95",
            min: 10,
            max: 300
        }),
        FAN_STAGE_EXTRACT_AIR_3: new $2c7bf509a8ddec7b$var$Parameter({
            id: "96",
            min: 10,
            max: 300
        })
    }
};
const $2c7bf509a8ddec7b$var$DHW = {
    TEMPERATURE: {
        DAY: new $2c7bf509a8ddec7b$var$Parameter({
            id: "17",
            min: 10,
            max: 65
        }),
        NIGHT: new $2c7bf509a8ddec7b$var$Parameter({
            id: "161",
            min: 10,
            max: 65
        }),
        STANDBY: new $2c7bf509a8ddec7b$var$Parameter({
            id: "102",
            min: 10,
            max: 65
        }),
        MANUAL: new $2c7bf509a8ddec7b$var$Parameter({
            id: "101",
            min: 10,
            max: 65
        })
    },
    STANDARD_SETTING: {
        HYSTERESIS: new $2c7bf509a8ddec7b$var$Parameter({
            id: "60",
            min: 2,
            max: 10
        }),
        BOOSTER_TIMEOUT: new $2c7bf509a8ddec7b$var$Parameter({
            id: "111",
            min: 0,
            max: 360
        }),
        BOOSTER_T_ACTIVATE: new $2c7bf509a8ddec7b$var$Parameter({
            id: "112",
            min: -10,
            max: 10
        }),
        PASTEURISATION: new $2c7bf509a8ddec7b$var$Parameter({
            id: "109",
            min: 1,
            max: 30
        }),
        MAX_DHW_HTG_DURATION: new $2c7bf509a8ddec7b$var$Parameter({
            id: "62",
            min: 6,
            max: 12
        }),
        PASTEUR_TEMP: new $2c7bf509a8ddec7b$var$Parameter({
            id: "110",
            min: 10,
            max: 65
        }),
        DHW_BOOSTER_STAGE: new $2c7bf509a8ddec7b$var$Parameter({
            id: "113",
            min: 1,
            max: 3
        }),
        DHW_BUFFER_MODE: new $2c7bf509a8ddec7b$var$Parameter({
            id: "114",
            values: [
                "0",
                "1"
            ]
        }),
        MAX_FLOW_TEMP: new $2c7bf509a8ddec7b$var$Parameter({
            id: "115",
            min: 10,
            max: 75
        }),
        DHW_ECO: new $2c7bf509a8ddec7b$var$Parameter({
            id: "116",
            values: [
                "0",
                "1"
            ]
        }),
        DHW_OUTPUT_SUMMER: new $2c7bf509a8ddec7b$var$Parameter({
            id: "420",
            min: 30,
            max: 100
        }),
        DHW_OUTPUT_WINTER: new $2c7bf509a8ddec7b$var$Parameter({
            id: "421",
            min: 30,
            max: 100
        }),
        INTEGRAL_SENSOR: new $2c7bf509a8ddec7b$var$Parameter({
            id: "422",
            values: [
                "0",
                "1"
            ]
        }),
        SECOND_DHW_CYLINDER: new $2c7bf509a8ddec7b$var$Parameter({
            id: "423",
            values: [
                "0",
                "1"
            ]
        })
    }
};
const $2c7bf509a8ddec7b$var$ENERGY_MANAGEMENT = {
    // ENABLE_EMI: new Parameter({id: "val60302", values: ["0", "1"]}),
    // BUFFER_TYPE: new Parameter({id: "val60317", values: ["0", "1", "2"]}),
    UPPER_TEMP_HK1: new $2c7bf509a8ddec7b$var$Parameter({
        id: "val60310",
        min: 20,
        max: 50
    }),
    UPPER_TEMP_HK2: new $2c7bf509a8ddec7b$var$Parameter({
        id: "val60311",
        min: 20,
        max: 30
    }),
    UPPER_TEMP_DH: new $2c7bf509a8ddec7b$var$Parameter({
        id: "val60312",
        min: 40,
        max: 65
    })
};
$2c7bf509a8ddec7b$exports = {
    PAGES: $2c7bf509a8ddec7b$var$PAGES,
    LANGUAGE: $2c7bf509a8ddec7b$var$LANGUAGE,
    HEATING: $2c7bf509a8ddec7b$var$HEATING,
    COOLING: $2c7bf509a8ddec7b$var$COOLING,
    VENTILATION: $2c7bf509a8ddec7b$var$VENTILATION,
    DHW: $2c7bf509a8ddec7b$var$DHW,
    ENERGY_MANAGEMENT: $2c7bf509a8ddec7b$var$ENERGY_MANAGEMENT
};


var $65b728b2397734f8$require$COOLING = $2c7bf509a8ddec7b$exports.COOLING;
var $65b728b2397734f8$require$PAGES = $2c7bf509a8ddec7b$exports.PAGES;
const $65b728b2397734f8$var$TEXT_COOLING = "COOLING";
const $65b728b2397734f8$var$TEXT_COMPRESSOR = "COMPRESSOR";
const $65b728b2397734f8$var$REGEX_VALUE_CAPACITY = new RegExp(`\\['${$65b728b2397734f8$require$COOLING.STANDARD_SETTING.PERCENT_CAPACITY.id}'\\]\\['val'\\]='([0-9]{2})'`);
class $65b728b2397734f8$var$CoolingModule {
    constructor(isgClient){
        this.isgClient = isgClient;
    }
    /**
   * @param enabled {boolean}
   * @returns {Promise<object>}
   */ setEnabledHC2(enabled) {
        return this.isgClient.setParameter($65b728b2397734f8$require$COOLING.HC2.MODE.ENABLED.withValue(enabled ? "1" : "0"));
    }
    /**
   * @param percent {number}
   * @returns {Promise<object>}
   */ setCapacity(percent) {
        return this.isgClient.setParameter($65b728b2397734f8$require$COOLING.STANDARD_SETTING.PERCENT_CAPACITY.withValue(percent));
    }
    /**
   * cooling is active if operating status and processes contain 'COOLING'
   * @returns {Promise<boolean>}
   */ async isActive() {
        const $ = await this.isgClient.fetchPage($65b728b2397734f8$require$PAGES.DIAGNOSIS.STATUS);
        const matchingElements = $("td").map((i, elem)=>$(elem).text().trim()).filter((i, columnText)=>[
                $65b728b2397734f8$var$TEXT_COOLING,
                $65b728b2397734f8$var$TEXT_COMPRESSOR
            ].includes(columnText));
        return matchingElements.length >= 3;
    }
    /**
   * capacity value cannot be read from an html element; have to do a regex search on js code
   * @returns {Promise<number>}
   */ async capacity() {
        const $ = await this.isgClient.fetchPage($65b728b2397734f8$require$PAGES.COOLING.STANDARD_SETTING);
        const matches = $65b728b2397734f8$var$REGEX_VALUE_CAPACITY.exec($.html())[1];
        return parseInt(matches, 10);
    }
}
$65b728b2397734f8$exports = $65b728b2397734f8$var$CoolingModule;


var $a793c53df8f2f3d5$exports = {};

var $a793c53df8f2f3d5$require$VENTILATION = $2c7bf509a8ddec7b$exports.VENTILATION;
class $a793c53df8f2f3d5$var$VentilationModule {
    constructor(isgClient){
        this.isgClient = isgClient;
    }
    /**
   * @param stage {number}
   * @returns {Promise<object>}
   */ setDayStage(stage) {
        return this.isgClient.setParameter($a793c53df8f2f3d5$require$VENTILATION.STAGE.DAY.withValue(stage));
    }
}
$a793c53df8f2f3d5$exports = $a793c53df8f2f3d5$var$VentilationModule;


var $2a353d1676489305$exports = {};

var $2a353d1676489305$require$DHW = $2c7bf509a8ddec7b$exports.DHW;
var $2a353d1676489305$require$PAGES = $2c7bf509a8ddec7b$exports.PAGES;
const $2a353d1676489305$var$REGEX_VALUE_OUTPUT_SUMMER = new RegExp(`\\['${$2a353d1676489305$require$DHW.STANDARD_SETTING.DHW_OUTPUT_SUMMER.id}'\\]\\['val'\\]='([0-9]{2,3})'`);
const $2a353d1676489305$var$REGEX_VALUE_OUTPUT_WINTER = new RegExp(`\\['${$2a353d1676489305$require$DHW.STANDARD_SETTING.DHW_OUTPUT_WINTER.id}'\\]\\['val'\\]='([0-9]{2,3})'`);
const $2a353d1676489305$var$TEXT_DHW = "DHW";
class $2a353d1676489305$var$DhwModule {
    constructor(isgClient){
        this.isgClient = isgClient;
    }
    /**
   * Fetches whether DHW is active
   */ async isActive() {
        const $ = await this.isgClient.fetchPage($2a353d1676489305$require$PAGES.DIAGNOSIS.STATUS);
        const matchingElements = $("td").map((i, elem)=>$(elem).text().trim()).filter((i, columnText)=>[
                $2a353d1676489305$var$TEXT_DHW
            ].includes(columnText));
        return matchingElements.length >= 1;
    }
    /**
   * @param percent
   * @returns {Promise<object>}
   */ setOutputSummer(percent) {
        return this.isgClient.setParameter($2a353d1676489305$require$DHW.STANDARD_SETTING.DHW_OUTPUT_SUMMER.withValue(percent));
    }
    /**
   * @returns {Promise<number>}
   */ async outputSummer() {
        const $ = await this.isgClient.fetchPage($2a353d1676489305$require$PAGES.DHW.STANDARD_SETTING);
        const matches = $2a353d1676489305$var$REGEX_VALUE_OUTPUT_SUMMER.exec($.html())[1];
        return parseInt(matches, 10);
    }
    /**
   * @param percent
   * @returns {Promise<object>}
   */ setOutputWinter(percent) {
        return this.isgClient.setParameter($2a353d1676489305$require$DHW.STANDARD_SETTING.DHW_OUTPUT_WINTER.withValue(percent));
    }
    /**
   * @returns {Promise<number>}
   */ async outputWinter() {
        const $ = await this.isgClient.fetchPage($2a353d1676489305$require$PAGES.DHW.STANDARD_SETTING);
        const matches = $2a353d1676489305$var$REGEX_VALUE_OUTPUT_WINTER.exec($.html())[1];
        return parseInt(matches, 10);
    }
}
$2a353d1676489305$exports = $2a353d1676489305$var$DhwModule;



var $969a7c14ee2ae0ae$require$COOLING = $2c7bf509a8ddec7b$exports.COOLING;
var $969a7c14ee2ae0ae$require$DHW = $2c7bf509a8ddec7b$exports.DHW;
var $969a7c14ee2ae0ae$require$HEATING = $2c7bf509a8ddec7b$exports.HEATING;
var $969a7c14ee2ae0ae$require$LANGUAGE = $2c7bf509a8ddec7b$exports.LANGUAGE;
var $969a7c14ee2ae0ae$require$PAGES = $2c7bf509a8ddec7b$exports.PAGES;
var $969a7c14ee2ae0ae$require$VENTILATION = $2c7bf509a8ddec7b$exports.VENTILATION;
var $969a7c14ee2ae0ae$require$ENERGY_MANAGEMENT = $2c7bf509a8ddec7b$exports.ENERGY_MANAGEMENT;
const $969a7c14ee2ae0ae$var$BASE_HEADERS = {
    Cookie: `PHPSESSID=${$kIu9n$uuid.v4()}`,
    Connection: "keep-alive"
};
const $969a7c14ee2ae0ae$var$BASE_POST_OPTIONS = {
    method: "POST",
    credentials: "same-origin",
    headers: $969a7c14ee2ae0ae$var$BASE_HEADERS
};
const $969a7c14ee2ae0ae$var$TEXT_RELATIVE_HUMIDITY_HC2 = "RELATIVE HUMIDITY HC2";
const $969a7c14ee2ae0ae$var$TEXT_HEATING_STAGE = "HEATING STAGE";
const $969a7c14ee2ae0ae$var$DEFAULT_CONSTRUCTOR_ARGS = {
    url: "http://servicewelt",
    version: "2.1"
};
class $969a7c14ee2ae0ae$var$IsgClient {
    constructor({ url: url, username: username, password: password, version: version } = $969a7c14ee2ae0ae$var$DEFAULT_CONSTRUCTOR_ARGS){
        this.url = url;
        this.username = username;
        this.password = password;
        this.version = version;
        this.languageSet = false;
        this.baseSaveOptions = {
            url: `${this.url}/save.php`,
            json: true,
            ...$969a7c14ee2ae0ae$var$BASE_POST_OPTIONS
        };
    }
    /**
   * @returns {CoolingModule}
   */ cooling() {
        return $2429056a9cd033ad$exports(this, "coolingModule", $65b728b2397734f8$exports);
    }
    /**
   * @returns {VentilationModule}
   */ ventilation() {
        return $2429056a9cd033ad$exports(this, "ventilationModule", $a793c53df8f2f3d5$exports);
    }
    /**
   * @returns {DhwModule}
   */ dhw() {
        return $2429056a9cd033ad$exports(this, "dhwModule", $2a353d1676489305$exports);
    }
    login() {
        const formData = new FormData();
        formData.append("make", "send");
        formData.append("user", this.username);
        formData.append("pass", this.password);
        const options = {
            body: formData,
            credentials: "same-origin",
            ...$969a7c14ee2ae0ae$var$BASE_POST_OPTIONS
        };
        return fetch(this.url, options).then(()=>{
            this.session = {
                date: new Date()
            };
        }).catch(()=>{
            this.session = null;
        });
    }
    /**
   * @returns {Promise<object>}
   */ switchLanguageToEnglish() {
        return this.setParameter($969a7c14ee2ae0ae$require$LANGUAGE.withValue("ENGLISH"));
    }
    /**
   * @returns {Promise<string>}
   */ async fetchLanguage() {
        const $ = await this.fetchPage($969a7c14ee2ae0ae$require$PAGES.LANGUAGE);
        return $(`#aval${$969a7c14ee2ae0ae$require$LANGUAGE.id}`).val();
    }
    /**
   * @returns {Promise<number>}
   */ async fetchHumidityHC2() {
        const $ = await this.fetchPage($969a7c14ee2ae0ae$require$PAGES.INFO.SYSTEM);
        const humidityText = $("td").filter((i, elem)=>$(elem).text() === $969a7c14ee2ae0ae$var$TEXT_RELATIVE_HUMIDITY_HC2).next().text();
        const humdityStrValue = humidityText.trim().substr(0, humidityText.length - 1).replace(",", ".");
        return parseFloat(humdityStrValue);
    }
    /**
   * @returns {Promise<number>}
   */ async fetchHeatingStage() {
        const $ = await this.fetchPage($969a7c14ee2ae0ae$require$PAGES.INFO.SYSTEM);
        const humidityText = $("td").filter((i, elem)=>$(elem).text() === $969a7c14ee2ae0ae$var$TEXT_HEATING_STAGE).next().text();
        return parseFloat(humidityText.trim());
    }
    /**
   * @param param {name: string, value: string|number}
   * @returns {Promise<object>}
   */ async setParameter({ name: name, value: value }) {
        return this.setParameters([
            {
                name: name,
                value: value
            }
        ]);
    }
    /**
   * @param params [{name, value}] list of parameter name / value pairs
   * @returns {Promise<object>}
   */ async setParameters(params) {
        await this.verifyLoggedIn();
        const formData = new FormData();
        formData.append("data", JSON.stringify(params));
        const options = {
            body: formData,
            ...$969a7c14ee2ae0ae$var$BASE_POST_OPTIONS
        };
        const response = await fetch(this.baseSaveOptions.url, options);
        if (response.ok) return response.statusText;
        throw new Error(response.statusText);
    }
    /**
   * @param page {string}
   * @returns {Promise<Cheerio>}
   */ async fetchPage(page) {
        const requestOpts = {
            headers: $969a7c14ee2ae0ae$var$BASE_HEADERS,
            credentials: "same-origin"
        };
        await this.verifyLoggedIn();
        await this.verifyEnglishLanguage();
        const html = await fetch(`${this.url}?${new URLSearchParams({
            s: page
        })}`, requestOpts).then((response)=>response.text());
        return $kIu9n$cheerio.load(html);
    }
    verifyLoggedIn() {
        if (!this.username && !this.password) return Promise.resolve();
        if (this.session) return Promise.resolve();
        return this.login();
    }
    verifyEnglishLanguage() {
        if (this.languageSet) return Promise.resolve();
        return this.switchLanguageToEnglish().then(()=>{
            this.languageSet = true;
        }).catch((error)=>{
            throw new Error(`failed to set language to english: ${error}`);
        });
    }
}
module.exports = {
    IsgClient: $969a7c14ee2ae0ae$var$IsgClient,
    VENTILATION: $969a7c14ee2ae0ae$require$VENTILATION,
    PAGES: $969a7c14ee2ae0ae$require$PAGES,
    HEATING: $969a7c14ee2ae0ae$require$HEATING,
    LANGUAGE: $969a7c14ee2ae0ae$require$LANGUAGE,
    COOLING: $969a7c14ee2ae0ae$require$COOLING,
    DHW: $969a7c14ee2ae0ae$require$DHW,
    ENERGY_MANAGEMENT: $969a7c14ee2ae0ae$require$ENERGY_MANAGEMENT
};


