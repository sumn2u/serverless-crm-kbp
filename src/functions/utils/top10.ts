import * as _ from "lodash";

import * as invoicesApi from "../../apis/priority/invoices";

export async function reduceItemsFromInvoices(invoicesList) {
  const purchases = {};
  await Promise.all(
    invoicesList.map((invoice) =>
      invoicesApi.findExtendedByInvoiceId(invoice).then((items) => {
        console.log("*** items", items);
        _.map(items, (item) => {
          if (purchases[item.barcode]) {
            // add to count
            purchases[item.barcode] = purchases[item.barcode] + item.amount;
          } else {
            // new count
            purchases[item.barcode] = item.amount;
          }
        });
      })
    )
  );

  console.log("*** purchases", purchases);
  return purchases;
}

export function sliceTop(purchases: {}) {
  const purchasesArray = Object.entries(purchases).map(([barcode, amount]) => ({
    barcode,
    amount,
  }));

  console.log("*** purchasesArray", purchasesArray);
  const sorted = _.orderBy(purchasesArray, ["amount"], ["desc"]);
  console.log("*** sorted", sorted);

 return  _.slice(sorted, 0, _.min([10, sorted.length]));
}

export async function getTop10(invoicesList) {
  const purchases = await reduceItemsFromInvoices(invoicesList);
  return sliceTop(purchases);
}
