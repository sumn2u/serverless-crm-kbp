import * as _ from "lodash";
import * as customers from "../apis/priority/customer";
import * as invoices from "../apis/priority/invoices";
import "source-map-support/register";
import {internalErrorResponse, noSuchCustomerResponse, validResponse,} from "../common/responses";
import {adaptPhoneNum} from "./utils/phoneNumber";
import {getAccountBalance} from "./utils/accountBalance";
import {getTop10} from "./utils/top10";

async function getPurchaseData(id) {
  const invoicesList = await invoices.findByCutomerId(id);
  // console.log("*** invoicesList", invoicesList);

  const top10 = await getTop10(invoicesList).catch(e => ([]));

  const latestInvoice = _.first(invoicesList);
  if (!latestInvoice)
    return {lastPurchaseAmount: null, lastPurchaseDate: null};
  return {
    lastPurchaseAmount: Math.abs(latestInvoice.TOTPRICE),
    lastPurchaseDate: latestInvoice.IVDATE,
    top10,
  };
}

async function getMoreData(id: String) {
  const [accountBalance, latestInvoiceData] = await Promise.all([
    getAccountBalance(id),
    getPurchaseData(id),
  ]);

  const data = {
    accountBalance,
    ...latestInvoiceData,
  };

  // console.log("*** data", data);

  return data;
}

export async function validatePhoneNumberExists(data) {
  const nationalId = data.nationalId;
  const phoneNumber = adaptPhoneNum(data.phoneNumber);

  const result = await customers.findByPhone(phoneNumber, nationalId);

  const count = result.length;

  if (count > 1) {
    console.warn("more then 1 option for " + phoneNumber);
  }
  if (count == 0) {
    return noSuchCustomerResponse;
  }

  const persona = result[0];
  const id = persona.CUSTNAME;
  const extraData = await getMoreData(id);
  // console.log("*** extraData", extraData);

  return validResponse({
    name: persona.CUSTDES,
    phoneNumber: persona.PHONE,
    address: persona.ADDRESS2
      ? `${persona.ADDRESS} ${persona.ADDRESS2}, ${persona.STATE}`
      : `${persona.ADDRESS}, ${persona.STATE}`,
    vat: persona.VATNUM,
    created: persona.CREATEDDATE,
    agent: persona.AGENTNAME,
    dob: persona.SPEC6,
    ...extraData,
  });
}

export async function existByPhone(event) {
  let body = JSON.parse(event.body);
  console.log("*** body", body);
  if (!body.phoneNumber) return internalErrorResponse("No phoneNumber");

  return validatePhoneNumberExists(body).catch((error) => {
    console.log("error: ****", error);
    return internalErrorResponse(error.message);
  });
}
