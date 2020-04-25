import * as orders from '../apis/priority/orders';

export function create(event) {
  let body = JSON.parse(event.body);
  console.log("*** body", body);

  return orders.create(body);
}

