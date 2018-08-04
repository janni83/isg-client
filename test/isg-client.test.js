const IsgClientMock = require('../lib/__mocks__/isg-client');
const { IsgClient } = require('../lib/isg-client');

Object.setPrototypeOf(IsgClientMock.prototype, new IsgClient());

describe('isg-client', () => {
  it('fetches humidity 55%', async () => {
    const instance = new IsgClientMock({ humidity: 55.2 });
    const humidity = await instance.fetchHumidityHC2();
    expect(humidity).toEqual(55.2);
  });
  it('fetches heating stage 3', async () => {
    const instance = new IsgClientMock({ heatingStage: 3 });
    const humidity = await instance.fetchHeatingStage();
    expect(humidity).toEqual(3);
  });
  it('fetches language', async () => {
    const instance = new IsgClientMock({ language: 'ENGLISH' });
    const language = await instance.fetchLanguage();
    expect(language).toEqual('ENGLISH');
  });
});
