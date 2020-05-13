import { ManagementClient } from "auth0";
import getSettings from "../../config/getSettings";

export async function searchByPhoneNumber(phone) {
  const { auth0: settings } = getSettings();
  const auth0 = new ManagementClient({ ...settings });

  var params = {
    search_engine: 'v3',
    q: `phone_number:*${phone}*`,
    per_page: 10,
    page: 0
  };

  console.log('*** auth0 user params', params);
  return auth0.getUsers(params)
}