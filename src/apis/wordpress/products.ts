import * as _ from "lodash";
import * as fs from "graceful-fs";

import { Item } from "../../common/responses";
import {getWooCommerce} from "./getOrder";

export async function getProducts(page) {
  const woo = getWooCommerce();
  const products = await woo.get("products?per_page=10&");

  console.log("*** products", products.data);
  // _.map(products, (p) => console.log("*** p.images", p.images));
  return products.data;
}

export async function updateImage(sku, id) {
  const woo = getWooCommerce();
  // console.log('*** id', id);
  console.log("*** sku", sku);

  const data = {
    images: [
      {
        src: `https://kb-pure.eagleray.co/wp-content/uploads/2020/06/${sku}.png`,
      },
    ],
  };
  return woo.put(`products/${id}`, data).catch((error) => {
    console.log("*** error on " + sku);
    console.log(error);

    return null;
  });
}

export async function allImages() {
  const page = 1;
  const products = await getProducts(page);
  products.map(async (product) => {
    await updateImage(product.sku, product.id);
  });
}

export async function mapImages(sku = "6006") {
  const dirs = fs.readdirSync("./images/");

  _.each(dirs, (dir) => {
    if (dir[0] == "." || dir == "all") return;
    fs.copyFileSync(`./images/${dir}/1.png`, `./images/all/${dir}.png`);
  });
}