import { template } from "lodash";
import fetch1 from "node-fetch";

import getSettings from "../../config/get-settings";

const { priorityApiBase, Authorization } = getSettings("dev");

const path = "AINVOICES?$filter=CUSTNAME eq '<%= id %>'";

export function findById(id) {
  const url = template(`${priorityApiBase}/${path}`)({ id });

  console.log(url, "***");

  return fetch1(url, {
    method: "get",
    headers: { Authorization }
  })
    .then(response => response.json())
    .then(response => response.value);
}
