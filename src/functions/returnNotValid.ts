import { noSuchCustomerResponse } from "../common/responses";

export async function returnNotValid(event) {
  return noSuchCustomerResponse;
}
