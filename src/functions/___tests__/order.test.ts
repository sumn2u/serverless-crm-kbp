import { create } from "../orders";

jest.setTimeout(20000); // 2 seconds

describe("orders logic", function () {
  // todo: requires defining: priority test env customer, new auth0 test env, connecting it to test wp.
  // or: run the tests with prod wp and prod priority. The impact will be false orders on prod priority. not so bad
  test.skip("createOrder", async () => {
    const event = { body: JSON.stringify({ order_id: "986" }) };
    const orderOnCrm = await create(event);
    // console.log('*** orderOnCrm', orderOnCrm);
    const body = JSON.parse(orderOnCrm.body);
    expect(body.data).toHaveProperty("CUSTNAME");
  });
});
