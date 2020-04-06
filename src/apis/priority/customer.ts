import { template } from "lodash";
import fetch1 from "node-fetch";

import getSettings from "../../config/get-settings";

const { priorityApiBase, Authorization } = getSettings("dev");

const phonePath = "CUSTOMERS?$filter=PHONE eq '<%= phone %>'";
const phoneNationalIdPath = "CUSTOMERS?$filter=PHONE eq '<%= phone %>' and VATNUM eq '<%= nationalId %>'";

export function findByPhone(phone, nationalId = null) {
  const path = nationalId ? phoneNationalIdPath : phonePath;
  const url = template(`${priorityApiBase}/${path}`)({ phone, nationalId });

  console.log(url, "***");

  return fetch1(url, {
    method: "get",
    headers: { Authorization }
  })
    .then(response => response.json())
    .then(response => response.value);
}
