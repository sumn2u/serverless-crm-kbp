import { template, map } from "lodash";
import fetch1 from "node-fetch";

import getSettings from "../../config/get-settings";

const { priorityApiBase, Authorization } = getSettings("dev");

export function findByCutomerId(id) {
  const path = "AINVOICES?$filter=CUSTNAME eq '<%= id %>'&$select=TOTPRICE,IVDATE,IVNUM,DEBIT,IVTYPE";
  const url = template(`${priorityApiBase}/${path}`)({ id });

  console.log(url, "***");

  return fetch1(url, {
    method: "get",
    headers: { Authorization },
  })
    .then((response) => response.json())
    .then((response) => response.value);
}

export interface InvoiceItem {
  barcode: string;
  amount: string;
  label: string;
  price: number;
  productId: string;
}

export interface InvoiceItems {
  [index:number]: InvoiceItem
}

export async function findExtendedByInvoiceId(invoice: object) : Promise<InvoiceItems> {
  const path =
    "AINVOICES(IVNUM='<%= IVNUM %>',DEBIT='<%= DEBIT %>',IVTYPE='<%= IVTYPE %>')/AINVOICEITEMS_SUBFORM?$select=BARCODE,QUANT,PDES,PARTNAME,PRICE";
  const url = template(`${priorityApiBase}/${path}`)({ ...invoice });

  console.log(url, "***");

  return fetch1(url, {
    method: "get",
    headers: { Authorization },
  })
    .then((response) => response.json())
    .then((response) => response.value)
    .then((invoices) =>
      map(invoices, ({ BARCODE,QUANT,PDES,PARTNAME,PRICE }) => {
        return ({
          barcode: BARCODE,
          amount: Math.abs(QUANT), // QUANT shows as negative number
          label: PDES,
          price: PRICE,
          productId: PARTNAME,
        });
      })
    );
}
