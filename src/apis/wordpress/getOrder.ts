import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import getSettings from "../../config/get-settings";
import { Item } from "../../common/responses";

const { wooCommerce } = getSettings();

const WooCommerce = new WooCommerceRestApi(wooCommerce);

async function getCustomerById(customerId) {
  return WooCommerce.get(`customers/${customerId}`)
    .then((response) => {
      // console.log(JSON.stringify(response.data));
      return response.data;
    })
    .catch((error) => {
      console.log(error.response.data);
    });
}



export interface IWpOrder {
  id: number;
  line_items: Item[];
  customer: { username: string };
}

export async function getOrderById(orderId: string): Promise<IWpOrder> {
  return WooCommerce.get(`orders/${orderId}`)
    .then(async (response) => {
      // console.log(JSON.stringify(response.data));
      const { id, line_items, customer_id } = response.data;
      const customer = await getCustomerById(customer_id);

      return {
        id,
        line_items,
        customer,
      };
    })
    .catch((error) => {
      console.log(error.response.data);
    });
}
