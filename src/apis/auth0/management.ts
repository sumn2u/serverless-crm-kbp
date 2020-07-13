import { ManagementClient } from "auth0";
import getSettings from "../../config/getSettings";

export async function searchByPhoneNumber(phone) {
  const { auth0: settings } = getSettings();
  const auth0 = new ManagementClient({ ...settings });

  var params = {
    search_engine: "v3",
    q: `phone_number:*${phone}*`,
    per_page: 10,
    page: 0,
  };

  console.log("*** auth0 user params", params);
  return auth0.getUsers(params);
}

export async function searchBySID(sid) {
  const { auth0: settings } = getSettings();
  const auth0 = new ManagementClient({ ...settings });

  var params = {
    search_engine: "v3",
    q: `user_metadata.sid:"${sid}"`,
  };

  console.log("*** auth0 user params", params);
  return auth0.getUsers(params);
}

export async function updateMetadata(userId: string, usermetadata: {}) {
  const { auth0: settings } = getSettings();
  const auth0 = new ManagementClient({ ...settings });

  const params = { id: userId };
  return auth0.updateUserMetadata(params, usermetadata);
}

export async function searchForPushableTokens(page = 0) {
  const { auth0: settings } = getSettings();
  const auth0 = new ManagementClient({ ...settings });

  const params = {
    search_engine: "v3",
    q: `user_metadata.pushToken.sendNotifications:true`,
    per_page: 100,
    page,
    fields: "name,user_id,user_metadata.pushToken",
  };

  return auth0.getUsers(params);
}
