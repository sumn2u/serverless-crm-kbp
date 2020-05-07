import * as search from "../customer";

describe('customer search', function () {
  test("search succeed", async () => {
    const phone = '0534321460';
    const customer = await search.findByPhone(phone);
    expect(customer[0].PHONE).toBe(phone);
  });

  test("search succeed (needs format)", async () => {
    const phone = '+972534321460';
    const customer = await search.findByPhone(phone);
    expect(customer[0].PHONE).toBe('0534321460');
  });
});
