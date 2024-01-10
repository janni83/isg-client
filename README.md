# isg-client

An HTTP client for accessing the Internet Services Gateway (ISG) API to control heat pumps of Stiebel Eltron / Tecalor.

It is only tested with the **THZ/LWZ 504** and the ISG at version **12.1.2**.
API parameters for other heat pumps or ISG version may be different.

Use at your own risk! Invalid parameters may damage your heat pump.

## Supported API

- isg-client may be used to set various parameters, like HC temperatures, DH temperatures, ventilation levels, etc. by using
  the ISG's PHP API.
- fetching various values by parsing ISG's HTML pages (see below)

## Reading Heat Pump Values

There is no clean API to read values available.
Therefor I do html and regex look ups to read values like i.e. if cooling is active.
I personally recommend to read values using MODBUS.

## When To Use This Library

Usually it is preferred to use MODBUS to read and write data to the heat pump, but in my case I've got the EMI (Energy Management Interface) module installed on the ISG. If the EMI module is installed on the ISG, whenever data is written to the ISG using MODBUS, it can be overwritten by the EMI at any time. For this reason I'm using the ISG's HTTP interface to update heat pump values programmatically.

My current use case is to make my heat pump aware to low and high energy prices on tibber.

## Usage

```javascript
const { IsgClient, HEATING } = require("isg-client");

const isg = new IsgClient({
  username: "<USERNAME>",
  password: "<PASSWORD>",
  url: "http://isg-host-or-ip",
});

// fetch relative humidity from HC2, done via html lookup
isg
  .fetchHumidityHC2()
  .then((humidity) => console.log(`humidity HC2 is ${humidity}`))
  .catch(console.error);

// set any parameter using setParameter
isg
  .setParameter(HEATING.HC2.TEMPERATURE.DAY.withValue(21))
  .then(() => console.log("HC2 day temperature updated to 21 degrees"))
  .catch(console.error);

// set multiple parameters at once using setParameters
isg
  .setParameters([
    HEATING.HC1.TEMPERATURE.DAY.withValue(21),
    HEATING.HC2.TEMPERATURE.DAY.withValue(21),
    DHW.TEMPERATURE.DAY.withValue(45),
  ])
  .then(() =>
    console.log("HC1, HC2 day temperature updated to 21 degrees and DH water temperature updated to 45 degrees")
  )
  .catch(console.error);
```
