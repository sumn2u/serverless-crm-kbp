import * as orders from '../apis/priority/orders';
import {validResponse} from "../common/responses";

export async  function create(event) {
  let body = JSON.parse(event.body);
  console.log("*** body", body);

  const order = await orders.create(body);
  return validResponse(order);
}

