# isg-client
An HTTP client for accessing the Internet Services Gateway (ISG) API to control heat pumps of Stiebel Eltron / Tecalor

I use it at home to control my __THZ/LWZ 504__ heat pump depending on the amount of solar power
my solar collectors are generating, specifically to control cooling.
It is only tested with the __THZ/LWZ 504__ and the ISG at version __2.1.69__.
API parameters for other heat pumps or ISG version may vary.

Use at your own risk! Invalid parameters may damage your heat pump.

## Supported API

Right now only what I need:

- Cooling: 
  - change standard settings
  - change cooling mode on HC2
- Ventilation:
  - change ventilation stages
- ... plan to add the remaining settings later

## Reading Heat Pump Values

There is no clean API to read values available.
Therefor I do html and regex look ups to read values like i.e. if cooling is active.

## Usage

```javascript
const { IsgClient, VENTILATION } = require('isg-client');

const isg = new IsgClient({
  username: '<USERNAME>',
  password: '<PASSWORD>',
  url: 'http://isg-host-or-ip'
});

// fetch relative humidity from HC2, done via html lookup
isg.fetchHumidityHC2()
  .then(humidity => console.log(`humidity HC2 is ${humidity}`))
  .catch(console.error);

// set day ventilation stage to 3
isg.ventilation().setDayStage(3)
  .then(() => console.log('ventilation day stage updated to 3'))
  .catch(console.error);

// set any parameter using setParameter
isg.setParameter(VENTILATION.STAGE.NIGHT.withValue(0))
  .then(() => console.log('ventilation night stage updated to 0'))
  .catch(console.error);
```
