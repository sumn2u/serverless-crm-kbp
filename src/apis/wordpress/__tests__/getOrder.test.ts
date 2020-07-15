import { getOrderById } from "../getOrder";
import getSettings, {
  initSettings,
  iSettings,
} from "../../../config/getSettings";

jest.setTimeout(10000); // 1 second

describe.skip("Wordpress API", function () {
  beforeAll(async () => {
    await initSettings();
  });

  test("getOrder", async () => {
    const {
      wooCommerce: { orderIdForTest },
    }: iSettings = getSettings();

    const order = await getOrderById(orderIdForTest.toString());
    expect(order.id).toEqual(orderIdForTest);
  });
});
