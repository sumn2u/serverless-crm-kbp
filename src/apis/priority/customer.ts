import { filter, template } from "lodash";

import baseApi from "./basePriorityApi";
import { adaptPhoneNum } from "../../functions/utils/phoneNumber";

const fields = "CUSTDES,PHONE,ADDRESS2,ADDRESS,STATE,VATNUM,CREATEDDATE,AGENTNAME,SPEC6,CUSTNAME,STATDES";
const phonePath =
  `/CUSTOMERS?$filter=PHONE eq '<%= phone %>'&$select=${fields}`;
const phoneNationalIdPath =
  `/CUSTOMERS?$filter=PHONE eq '<%= phone %>' and VATNUM eq '<%= nationalId %>' &$select=${fields}`;

export async function findByPhone(phone: string, nationalId?: string) {
  const formattedPhoneNumber = adaptPhoneNum(phone);

  const path = nationalId ? phoneNationalIdPath : phonePath;
  const url = template(path)({ phone: formattedPhoneNumber, nationalId });
  console.log("*** url", url);

  try {
    const response = await baseApi().get(url);
    // console.log('*** response', response);
    const possibleCustomers = response.data.value;
    console.log('*** possibleCustomers', possibleCustomers);

    const customers = filter(possibleCustomers, (cus) => cus.STATDES == "פעיל");

    return customers;
  } catch (e) {
    console.error('Error priority get customer', e);
    throw e;
  }
}
