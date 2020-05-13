import { searchByPhoneNumber } from "../management";
import {initSettings} from "../../../config/getSettings";

describe("auth0 - management", function () {
  beforeAll(async () => {
    await initSettings();
  });

  test("init", async () => {
    const customer = await searchByPhoneNumber('972534321460');
    // console.log('*** customer', customer);
    expect(customer[0]).toHaveProperty('name');
  });
});
