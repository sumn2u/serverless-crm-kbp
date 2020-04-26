// import fetch from "node-fetch";

import {buildOrder, create, IOrder} from "../orders";

const result = {
  "CUSTNAME": "100001",
  "ORDERITEMS_SUBFORM": [
    {
      "PARTNAME": "4002",
      "DUEDATE": "2020-01-01T00:00:00",
      "QUANT": 1
    },
    {
      "PARTNAME": "3001",
      "DUEDATE": "2020-01-01T00:00:00",
      "QUANT": 1
    }
  ]
};

const input : IOrder = {
  customerId: "100001",
  items: [
    {
      productId: "4002",
      amount: 1
    },
    {
      productId: "3001",
      amount: 1
    }
  ]
}

test("build order", async () => {
  expect(buildOrder(input)).toEqual(result);
});

test("create order", async () => {
  const order = await create(input);
  console.log('*** order', order);
  expect(order.CUSTNAME).toEqual(input.customerId);
});


