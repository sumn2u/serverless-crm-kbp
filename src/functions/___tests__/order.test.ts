import { create } from "../orders";

jest.setTimeout(10000); // 1 second

describe("orders logic", function () {
  test("createOrder", async () => {
    const event = { body: JSON.stringify({ order_id: "156" }) };
    const orderOnCrm = await create(event);
    // console.log('*** orderOnCrm', orderOnCrm);
    const body = JSON.parse(orderOnCrm.body);
    expect(body.CUSTNAME).toEqual("1");
  });
});
