import {
  findByCutomerId,
  findExtendedByInvoiceId,
  ItemPurchased,
  invoiceListFields,
  Invoice,
} from "../invoices";

const invoiceListFieldsArray = invoiceListFields.split(",");

describe("Invoices", function () {
  const id = "100001";
  test("findByCustomerId", async () => {
    const invoices = await findByCutomerId(id);

    invoices.forEach((currInvoice) => {
      invoiceListFieldsArray.forEach((currField) => {
        expect(currInvoice).toHaveProperty(currField);
      });
    });
  });

  test("findExtendedByInvoiceId", async () => {
    const invoices: [Invoice] = await findByCutomerId(id);
    const items: [ItemPurchased] = await findExtendedByInvoiceId(invoices[0]);
    items.map(currItem => {
      expect(currItem).toHaveProperty('barcode')
      expect(currItem).toHaveProperty('amount')
      expect(currItem).toHaveProperty('productId')
    })
  });
});
