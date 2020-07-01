import { first } from "lodash";
import * as accounts from "../../apis/priority/accounts";

export async function getAccountBalance(id) {
  return accounts.findById(id).then((accountsList) => {
    const currAccount = first(accountsList);
    return currAccount ? currAccount.BALANCE1 : null;
  }).catch(error => {
    console.error('Failed to fetch account balance', error);
    return null;
  })
}
