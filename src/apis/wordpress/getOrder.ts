import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import getSettings from "../../config/get-settings";

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

export async function getOrderById(orderId) {
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
