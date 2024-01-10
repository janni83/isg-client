const CoolingModule = require("../lib/modules/heating");
const IsgClientMock = require("../lib/isg-client");

jest.mock("../lib/isg-client");

describe("heating", () => {
  it("fetches active heating state from the info system page", async () => {
    const instance = new CoolingModule(
      new IsgClientMock({ heatingActive: true }),
    );
    const isActive = await instance.isActive();
    expect(isActive).toEqual(true);
  });
  it("fetches inactive heating state from the info system page", async () => {
    const instance = new CoolingModule(
      new IsgClientMock({ heatingActive: false }),
    );
    const isActive = await instance.isActive();
    expect(isActive).toEqual(false);
  });
  it("fetches output of 76", async () => {
    const instance = new CoolingModule(
      new IsgClientMock({ heatingOutput: 76 }),
    );
    const capacity = await instance.output();
    expect(capacity).toEqual(76);
  });
  it("fetches output of 100", async () => {
    const instance = new CoolingModule(
      new IsgClientMock({ heatingOutput: 100 }),
    );
    const capacity = await instance.output();
    expect(capacity).toEqual(100);
  });
});
