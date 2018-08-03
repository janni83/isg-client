const CoolingModule = require('../lib/modules/cooling');
const IsgClientMock = require('../lib/isg-client');

jest.mock('../lib/isg-client');

describe('cooling', () => {
  it('fetches active cooling state from the cooling page', async () => {
    expect.assertions(1);
    const instance = new CoolingModule(new IsgClientMock({ coolingActive: true }));
    const isActive = await instance.fetchIsActive();
    expect(isActive).toEqual(true);
  });
  it('fetches inactive cooling state from the cooling page', async () => {
    expect.assertions(1);
    const instance = new CoolingModule(new IsgClientMock({ coolingActive: false }));
    const isActive = await instance.fetchIsActive();
    expect(isActive).toEqual(false);
  });
});
