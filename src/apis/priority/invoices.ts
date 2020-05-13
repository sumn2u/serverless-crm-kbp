import { template, map } from "lodash";

import baseApi from "./basePriorityApi";

export const invoiceListFields = 'TOTPRICE,IVDATE,IVNUM,DEBIT,IVTYPE';

export interface Invoice {
  TOTPRICE: number;
  IVDATE: string;
  IVNUM: string;
  DEBIT: string;
  IVTYPE: string;
}

export function findByCutomerId(id: string) : Promise<[Invoice]> {
  const path =
    `/AINVOICES?$filter=CUSTNAME eq '<%= id %>'&$select=${invoiceListFields}`;
  const url = template(path)({ id });
  // console.log("*** url", url);
  return baseApi().get(url)
    .then((response) => response.data.value);
}

export interface ItemPurchased {
  barcode: string;
  amount: string;
  label: string;
  price: number;
  productId: string;
};

export async function findExtendedByInvoiceId(
  invoice: object
): Promise<[ItemPurchased]> {
  // console.log('*** invoice', invoice);
  const path =
    "/AINVOICES(IVNUM='<%= IVNUM %>',DEBIT='<%= DEBIT %>',IVTYPE='<%= IVTYPE %>')/AINVOICEITEMS_SUBFORM?$select=BARCODE,QUANT,PDES,PARTNAME,PRICE";
  const url = template(path)({ ...invoice });

  return baseApi()
    .get(url)
    .then((response) => response.data.value)
    .then((invoices) =>
      map(invoices, ({ BARCODE, QUANT, PDES, PARTNAME, PRICE }) => {
        return {
          barcode: BARCODE,
          amount: Math.abs(QUANT), // QUANT shows as negative number
          label: PDES,
          price: PRICE,
          productId: PARTNAME,
        };
      })
    );
}
