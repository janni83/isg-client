const CoolingModule = require('../lib/modules/cooling');
const IsgClientMock = require('../lib/isg-client');

jest.mock('../lib/isg-client');

describe('cooling', () => {
  it('fetches active cooling state from the cooling page', async () => {
    const instance = new CoolingModule(new IsgClientMock({ coolingActive: true }));
    const isActive = await instance.fetchIsActive();
    expect(isActive).toEqual(true);
  });
  it('fetches inactive cooling state from the cooling page', async () => {
    const instance = new CoolingModule(new IsgClientMock({ coolingActive: false }));
    const isActive = await instance.fetchIsActive();
    expect(isActive).toEqual(false);
  });
  it('fetches capacity', async () => {
    const instance = new CoolingModule(new IsgClientMock({ coolingCapacity: 76 }));
    const capacity = await instance.fetchCapacity();
    expect(capacity).toEqual(76);
  });
});
