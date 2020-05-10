import * as orders from "../apis/priority/orders";
import { internalErrorResponse, validResponse, Item } from "../common/responses";
import {getOrderById, IWpItem, IWpOrder} from "../apis/wordpress/getOrder";
import * as auth0 from "../apis/auth0/management";

export async function create(event) {
  // console.log("*** event", event);
  let body = JSON.parse(event.body);
  if (!body.order_id) return internalErrorResponse("Missing order_id on body");

  // console.log("*** body.order_id", body.order_id);
  const inputOrder: IWpOrder = await getOrderById(body.order_id);
  // console.log("*** inputOrder", inputOrder);

  // find the priority customer id from auth0
  const {
    customer: { username: wpUserName },
  } = inputOrder;

  // console.log("*** wpUserName", wpUserName);

  const auth0User = await auth0.searchByPhoneNumber(wpUserName);
  const {
    user_metadata: { crmId },
  } = auth0User[0];

  // console.log("*** auth0User", auth0User);
  console.log("*** crmId", crmId);

  const line_items: Item[] = inputOrder.line_items.map((item: IWpItem): Item => ({
    quantity: item.quantity,
    product_id: item.sku,
  }));

  const order = await orders.create({
    customer_id: crmId,
    line_items,
  });

  // console.log("*** order", order);

  return validResponse(order);
}
