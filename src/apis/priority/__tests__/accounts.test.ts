import {findById, IAccount} from "../accounts";

describe('accounts', function () {
  test("search succeed", async () => {
    const id = "100001";
    const account: [IAccount] = await findById(id);
    // console.log('*** account', account);
    expect(account[0]).toHaveProperty('BALANCE1');
  });
});
