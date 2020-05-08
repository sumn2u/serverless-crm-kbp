import {omit } from 'lodash';
import {buildOrder, create, IOrder} from "../orders";

const result = {
  "CUSTNAME": "100001",
  "ORDERITEMS_SUBFORM": [
    {
      "PARTNAME": "4002",
      "QUANT": 1
    },
    {
      "PARTNAME": "3001",
      "QUANT": 1
    }
  ]
};

const input : IOrder = {
  customer_id: "100001",
  line_items: [
    {
      product_id: "4002",
      quantity: 1
    },
    {
      product_id: "3001",
      quantity: 1
    }
  ]
}

test("build order", async () => {
  const recieved = buildOrder(input);
  expect(recieved.CUSTNAME).toEqual(input.customer_id);
  expect(recieved.ORDERITEMS_SUBFORM.length).toEqual(input.line_items.length);
});

test("create order", async () => {
  const order = await create(input);
  // console.log('*** order', order);
  expect(order.CUSTNAME).toEqual(input.customer_id);
});


