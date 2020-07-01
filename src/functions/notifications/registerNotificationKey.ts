import { initSettings } from "../../config/getSettings";
import { internalErrorResponse, validResponse } from "../../common/responses";
import { updateMetadata } from "../../apis/auth0/management";

export async function registerNotificationKey(event) {
  await initSettings();
  let body = JSON.parse(event.body);
  if (!body.metadata) return internalErrorResponse("Missing metadata on body");
  if (!body.user_id) return internalErrorResponse("Missing user_id on body");

  const metadata = {
    pushToken: {
      ...body.metadata.pushToken,
    },
  };
  const user = await updateMetadata(body.user_id, metadata);
  console.log("*** user", user);

  return validResponse({});
}
