import {findById, IAccount} from "../accounts";
import {initSettings} from "../../../config/getSettings";

describe('accounts', function () {
  beforeAll(async () => {
    await initSettings();
  });

  test("search succeed", async () => {
    const id = "100001";
    const account: [IAccount] = await findById(id);
    // console.log('*** account', account);
    expect(account[0]).toHaveProperty('BALANCE1');
  });
});
