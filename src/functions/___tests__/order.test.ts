import { create } from "../orders";

jest.mock("../../apis/wordpress/getOrder");
const wp = require("../../apis/wordpress/getOrder");

const wpOrder = {
  line_items: [{
    id: 1,
    name: "גולד קרם",
    product_id: 40,
    variation_id: 0,
    quantity: 1,
    tax_class: "",
    subtotal: "136",
    subtotal_tax: "0",
    total: "136",
    total_tax: "0",
    taxes: [],
    meta_data: [],
    sku: "2000",
    price: 136,
  }],
  customer: {
    username: "972534321460",
  },
};
wp.getOrderById.mockImplementation(() => ({
  ...wpOrder,
}));

describe("orders logic", function () {
  test("createOrder", async () => {
    const event = { body: JSON.stringify({ order_id: "156" }) };
    await create(event);
  });
});
