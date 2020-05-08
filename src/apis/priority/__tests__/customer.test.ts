import * as search from "../customer";

describe('customer search', function () {
  const phone = '0534321460';
  test("search succeed", async () => {
    const customer = await search.findByPhone(phone);
    expect(customer[0].PHONE).toBe(phone);
  });

  test("search succeed (needs format)", async () => {
    const customer = await search.findByPhone('+972534321460');
    expect(customer[0].PHONE).toBe(phone);
  });

  test("search succeed (includes national Id)", async () => {
    const customer = await search.findByPhone('+972534321460', '201306016');
    expect(customer[0].PHONE).toBe(phone);
  });

});
