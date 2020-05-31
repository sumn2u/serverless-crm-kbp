import { create } from "../orders";

jest.setTimeout(20000); // 2 seconds

describe("orders logic", function () {
  test("createOrder", async () => {
    const event = { body: JSON.stringify({ order_id: "416" }) };
    const orderOnCrm = await create(event);
    // console.log('*** orderOnCrm', orderOnCrm);
    const body = JSON.parse(orderOnCrm.body);
    expect(body.CUSTNAME).toEqual("1");
  });
});
