import { filter, template } from "lodash";

import baseApi from "./basePriorityApi";
import {adaptPhoneNum} from "../../functions/utils/phoneNumber";

const phonePath = "/CUSTOMERS?$filter=PHONE eq '<%= phone %>'";
const phoneNationalIdPath =
  "/CUSTOMERS?$filter=PHONE eq '<%= phone %>' and VATNUM eq '<%= nationalId %>' &$select=CUSTDES,PHONE,ADDRESS2,ADDRESS,STATE,VATNUM,CREATEDDATE,AGENTNAME,SPEC6,CUSTNAME";

export async function findByPhone(phone, nationalId = null) {
  const formattedPhoneNumber = adaptPhoneNum(phone);

  const path = nationalId ? phoneNationalIdPath : phonePath;
  const url = template(path)({ phone: formattedPhoneNumber, nationalId });

  try {
    const response = await baseApi.get(url);
    // console.log('*** response', response);
    const possibleCustomers = response.data.value;
    // console.log('*** possibleCustomers', possibleCustomers);

    const customers = filter(possibleCustomers, (cus) => cus.STATDES == "פעיל");

    return customers
  } catch (e) {
    console.error(e);
  }
}
