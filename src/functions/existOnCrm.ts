import * as _ from "lodash";
import * as customers from "../apis/priority/customer";
import * as accounts from "../apis/priority/accounts";
import * as invoices from "../apis/priority/invoices";
import "source-map-support/register";
import {
  internalErrorResponse,
  noSuchCustomerResponse,
} from "../common/responses";
import { adaptPhoneNum } from "../utils/phoneNumber";

const validResponse = (params) => ({
  statusCode: 200,
  body: JSON.stringify(
    {
      ...params,
    },
    null,
    2
  ),
});

async function getAccountBalance(id) {
  return accounts.findById(id).then((accountsList) => {
    const currAccount = _.first(accountsList);
    return currAccount ? currAccount.BALANCE1 : null;
  });
}

async function getLastPurchaseData(id) {
  return invoices.findById(id).then((invoicesList) => {
    const latestInvoice = _.first(invoicesList);
    if (!latestInvoice)
      return { lastPurchaseAmount: null, lastPurchaseDate: null };
    return {
      lastPurchaseAmount: latestInvoice.TOTPRICE,
      lastPurchaseDate: latestInvoice.IVDATE,
    };
  });
}

async function getMoreData(id: String) {
  const [accountBalance, latestInvoiceData] = await Promise.all([
    getAccountBalance(id),
    getLastPurchaseData(id),
  ]);

  const data = {
    accountBalance,
    ...latestInvoiceData,
  };

  console.log("*** data", data);

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
  console.log("*** extraData", extraData);

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
