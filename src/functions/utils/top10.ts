import * as _ from "lodash";

import * as invoicesApi from "../../apis/priority/invoices";

export async function reduceItemsFromInvoices(invoicesList) {
  const itemsCounter = {
    // "213123": { ... invoice, sum}
  };

  await Promise.all(
    invoicesList.map((invoice) =>
      invoicesApi.findExtendedByInvoiceId(invoice).then((items) => {
        _.map(items, (currItem) => {
          if (itemsCounter[currItem.barcode]) {
            // add to count
            itemsCounter[currItem.barcode].sum += currItem.amount;
          } else {
            // new count
            itemsCounter[currItem.barcode] = {
              ..._.omit(currItem, ['amount']),
              sum: currItem.amount,
            };
          }
        });
      })
    )
  );

  return itemsCounter;
}

export function sliceTop(purchases: {}) {
  const purchasesArray = Object.entries(
    purchases
  ).map(([barcode, invoice]: [string, object]): object => ({ ...invoice }));

  // console.log("*** purchasesArray", purchasesArray);
  const sorted = _.orderBy(purchasesArray, ["sum"], ["desc"]);
  // console.log("*** sorted", sorted);

  return _.slice(sorted, 0, _.min([10, sorted.length]));
}

export async function getTop10(invoicesList) {
  const purchases = await reduceItemsFromInvoices(invoicesList);
  return sliceTop(purchases);
}
