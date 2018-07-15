# isg-client
An HTTP client for accessing the Internet Services Gateway (ISG) API to control heat pumps of Stiebel Eltron / Tecalor

I use it at home to control my LWZ 504 heat pump depending on the amount of solar power
my solar collectors are generating, specifically to control cooling.
It is only tested with the LWZ 504 and the ISG at version 2.1.69.
API parameters for other heat pumps or ISG version may vary.

Use at your own risk! Invalid parameters may damage your heat pump.

## Supported API

Right now only what I need:

- Cooling: standard setting, cooling mode HC2
- Ventilation: ventilation stages
- ... plan to add the remaining settings later

## Usage

```javascript
const IsgClient = require('isg-client');

const isg = new IsgClient({
  username: '<USERNAME>',
  password: '<PASSWORD>',
  url: 'http://isg-host-or-ip'
});

// fetch relative humidity from HC2, done via html lookup
isg.fetchHumidityHC2()
  .then(humidity => console.log(`humidity HC2 is ${humidity}`))
  .catch(console.error);
```
