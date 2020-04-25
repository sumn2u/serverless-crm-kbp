import { template } from "lodash";
import fetch from "node-fetch";

import getSettings from "../../config/get-settings";

const { priorityApiBase, Authorization } = getSettings("dev");

const path = "ORDERS";

export interface IOrder {
  customerId: string;
  items: Array<{ productId: string; amount: number }>;
}

export function buildOrder(order: IOrder) {
  return {
    CUSTNAME: order.customerId,
    ORDERITEMS_SUBFORM: order.items.map((item) => ({
      PARTNAME: item.productId,
      DUEDATE: "2020-01-01T00:00:00",
      QUANT: item.amount,
    })),
  };
}

export function create(order: IOrder): Promise<[IOrder]> {
  const url = `${priorityApiBase}/${path}`;
  console.log('*** url', url);
  const body = buildOrder(order);

  console.log('*** body', body);

  return fetch(url, {
    method: "post",
    body: JSON.stringify(body),
    headers: {
      Authorization,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log("*** json", json));
}
