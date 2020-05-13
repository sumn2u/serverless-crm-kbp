import { template } from "lodash";
import baseApi from "./basePriorityApi";

const path =
  "/ACCOUNTS_RECEIVABLE?$filter=ACCNAME eq '<%= id %>'&$select=BALANCE1";

export interface IAccount {
  BALANCE1: string;
}

export function findById(id: string): Promise<[IAccount]> {
  const url = template(path)({ id });
  // console.log(url, "***");
  return baseApi().get(url).then((response) => response.data.value);
}
