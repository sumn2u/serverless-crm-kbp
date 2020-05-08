import * as orders from "../apis/priority/orders";
import { validResponse } from "../common/responses";
import { getOrderById } from "../apis/wordpress/getOrder";

export async function create(event) {
  let body = JSON.parse(event.body);
  console.log("*** body", body);
  console.log("*** body.order_id", body.order_id);
  const inputOrder = await getOrderById(body.order_id);

  // find the priority customer id from auth0


  const order = await orders.create(inputOrder);
  return validResponse(order);
}
