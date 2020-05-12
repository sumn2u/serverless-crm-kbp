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
      console.error('Error fetching wp customer for order', error.response.data);
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
  console.log('*** orderId', orderId);
  return WooCommerce.get(`orders/${orderId}`)
    .then(async (response) => {
      console.log('woocommerce order',JSON.stringify(response.data));
      const { id, line_items, customer_id } = response.data;
      const customer = await getCustomerById(customer_id);

      return {
        id,
        line_items,
        customer,
      };
    })
    .catch((error) => {
      console.error('error getting order', error.response.data);
      throw Error(`Order ${orderId} not found`)
    });
}
