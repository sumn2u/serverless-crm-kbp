import * as orders from "../apis/priority/orders";
import {
  internalErrorResponse,
  validResponse,
  Item,
} from "../common/responses";
import { getOrderById, IWpItem, IWpOrder } from "../apis/wordpress/getOrder";
import * as auth0 from "../apis/auth0/management";
import { initSettings } from "../config/getSettings";

async function fetchOrderData(orderId) {
  // console.log("*** body.order_id", body.order_id);
  const orderFromWp: IWpOrder = await getOrderById(orderId);
  // console.log("*** orderFromWp", orderFromWp);

  // find the priority customer id from auth0
  const {
    customer: { username: wpUserName },
  } = orderFromWp;

  const auth0User = await auth0.searchByPhoneNumber(wpUserName);
  if (!auth0User) {
    console.warn('No valid auth0 user for create order');
    console.log("*** wpUserName", wpUserName);
  }
  const {
    user_metadata: { crmId },
  } = auth0User[0];

  // console.log("*** auth0User", auth0User);
  console.log("*** crmId", crmId);

  return {
    crmId,
    items: orderFromWp.line_items,
  };
}

async function pushToCrm({ items, crmId }) {
  const line_items: Item[] = items.map(
    (item: IWpItem): Item => ({
      quantity: item.quantity,
      product_id: item.sku,
    })
  );

  const order = await orders.create({
    customer_id: crmId,
    line_items,
  });

  return order;
}

export async function create(event) {
  await initSettings();

  let body;
  try {
    body = JSON.parse(event.body);
  } catch (e) {
    const clean = event.body.split("\\").join("");
    console.log("*** clean", clean);
    body = JSON.parse(clean);
  }

  if (!body.order_id) return internalErrorResponse("Missing order_id on body");

  try {
    console.log("Order Id:", body.order_id);
    const orderData = await fetchOrderData(body.order_id);
    if (!orderData) return validResponse({ message: "invalid user for order" });

    console.log('*** orderData', orderData);

    const crmOrder = await pushToCrm({
      crmId: orderData.crmId,
      items: orderData.items,
    });

    return validResponse(crmOrder);
  } catch (e) {
    console.error("Error on creating order", e);
    return internalErrorResponse(e);
  }
}
