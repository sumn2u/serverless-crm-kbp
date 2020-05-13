import { getOrderById } from "../getOrder";
import { initSettings } from "../../../config/getSettings";

jest.setTimeout(10000); // 1 second

describe("Wordpress API", function () {
  beforeAll(async () => {
    await initSettings();
  });

  test("getOrder", async () => {
    const order = await getOrderById("156");
    expect(order.id).toEqual(156);
  });
});
