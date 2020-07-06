import { getOrderById } from "../getOrder";
import { initSettings } from "../../../config/getSettings";

jest.setTimeout(10000); // 1 second

const testOrder = 986;
describe("Wordpress API", function () {
  beforeAll(async () => {
    await initSettings();
  });

  test("getOrder", async () => {
    const order = await getOrderById(testOrder.toString());
    expect(order.id).toEqual(testOrder);
  });
});
