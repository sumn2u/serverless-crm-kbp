import { template } from "lodash";
import fetch1 from "node-fetch";

import getSettings from "../../config/get-settings";

const { priorityApiBase, Authorization } = getSettings("dev");

const path = "ACCOUNTS_RECEIVABLE?$filter=ID eq '<%= id %>'";

export function search(screen, params) {
  const url = template(`${priorityApiBase}/${path}`)({ id });

  console.log(url, "***");

  return fetch1(url, {
    method: "get",
    headers: { Authorization }
  })
    .then(response => response.json())
    .then(response => response.value);
}
