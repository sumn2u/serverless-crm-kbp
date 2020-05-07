import WooCommerceRestApi from  '@woocommerce/woocommerce-rest-api';
import getSettings from "../../config/get-settings";

const { wooCommerce } = getSettings();


const WooCommerce = new WooCommerceRestApi(wooCommerce);