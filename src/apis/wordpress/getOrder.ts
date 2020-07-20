import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import getSettings from "../../config/getSettings";

let WooCommerce;

export function getWooCommerce() {
  if (!WooCommerce) {
    const { wooCommerce } = getSettings();
    WooCommerce = new WooCommerceRestApi(wooCommerce);
  }
  return WooCommerce;
}

async function getCustomerById(customerId) {
  return getWooCommerce()
    .get(`customers/${customerId}`)
    .then((response) => {
      // console.log(JSON.stringify(response.data));
      return response.data;
    })
    .catch((error) => {
      console.error(
        `Error fetching wp customer: ${customerId} (for order)`,
        error.response.data
      );
      throw Error(error);
    });
}

export interface IWpItem {
  sku: string;
  quantity: number;
}

export interface IWpOrder {
  id: number;
  line_items: IWpItem[];
  customer: { username: string };
}

export async function getOrderById(orderId: string): Promise<IWpOrder> {
  console.log(`fetching: /orders/${orderId}`);

  return getWooCommerce()
    .get(`orders/${orderId}`)
    .then(async (response) => {
      // console.log("*** response.data", response.data);
      const { id, line_items, customer_id } = response.data;
      const customer = await getCustomerById(customer_id);

      return {
        id,
        line_items,
        customer,
      };
    })
    .catch((error) => {
      // console.log("*** error", error);
      // console.error("error getting order", error.response.data);
      throw Error(`Order ${orderId} not found`);
    });
}
