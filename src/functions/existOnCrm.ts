import * as _ from "lodash";
import * as customers from "../apis/priority/customer";
import * as accounts from "../apis/priority/accounts";
import "source-map-support/register";
import {internalErrorResponse, noSuchCustomerResponse} from "../common/responses";
import {adaptPhoneNum} from "../utils/phoneNumber";

const validResponse = params => ({
  statusCode: 200,
  body: JSON.stringify(
    {
      ...params
    },
    null,
    2
  )
});

async function getMoreData(id: String) {
  const account = await accounts.findById(id);
  console.log('*** account', account);

  return account;
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
  console.log('*** persona', persona);
  const id = persona.CUSTNAME;
  // const extraDate = await getMoreData(id);

  return validResponse({
    name: persona.CUSTDES,
    phoneNumber: persona.PHONE,
    address: persona.ADDRESS2 ? `${persona.ADDRESS} ${persona.ADDRESS2}, ${persona.STATE}` : `${persona.ADDRESS}, ${persona.STATE}`,
    vat: persona.VATNUM,
    created: persona.CREATEDDATE,
    agent: persona.AGENTNAME,
    dob: persona.SPEC6,
  })
}

export async function existByPhone(event) {
  let body = JSON.parse(event.body);
  console.log("*** body", body);
  if (!body.phoneNumber) return internalErrorResponse('No phoneNumber')

  return validatePhoneNumberExists(body).catch(error => {
    console.log("error: ****", error);
    return internalErrorResponse(error.message);
  });
}
