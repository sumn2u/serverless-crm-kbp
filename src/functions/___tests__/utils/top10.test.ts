import * as _ from "lodash";
import { reduceItemsFromInvoices, sliceTop } from "../../utils/top10";

jest.mock("../../../apis/priority/invoices");
const invoicesApi = require("../../../apis/priority/invoices");

const invoices = [
  {
    items: [
      { barcode: "1", amount: 2 },
      { barcode: "2", amount: 1 },
      { barcode: "3", amount: 10 },
    ],
  },
  {
    items: [
      { barcode: "1", amount: 3 },
      { barcode: "4", amount: 3 },
    ],
  },
  {},
  {
    items: null,
  },
];

const itemsCount = {
  "1": { barcode: "1", sum: 5 },
  "2": { barcode: "2", sum: 1 },
  "3": { barcode: "3", sum: 10 },
  "4": { barcode: "4", sum: 3 },
};

const sortedItems = [
  { barcode: "3", sum: 10 },
  { barcode: "1", sum: 5 },
  { barcode: "4", sum: 3 },
  { barcode: "2", sum: 1 },
];

test("# reduceItemsFromInvoices", async () => {
  invoicesApi.findExtendedByInvoiceId.mockImplementation(
    async (invoice) => invoice.items
  );
  const items = await reduceItemsFromInvoices(invoices);
  expect(_.keys(items).length).toBe(4);
  expect(items).toEqual(itemsCount);
});

test("# sliceTop10", async () => {
  const sorted = sliceTop(itemsCount);
  expect(sorted).toEqual(sortedItems);
});

test("# sliceTop10 - more then limit", async () => {
  const sorted = sliceTop({
    "1": 5,
    "2": 1,
    "3": 10,
    "4": 3,
    "5": 3,
    "6": 3,
    "7": 3,
    "8": 3,
    "9": 3,
    "10": 3,
    "11": 3,
    "12": 3,
  });
  expect(sorted.length).toEqual(10);
});
