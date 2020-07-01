import { initSettings } from "../../config/getSettings";
import { internalErrorResponse, validResponse } from "../../common/responses";
import {
  updateMetadata,
  searchForPushableTokens,
} from "../../apis/auth0/management";
import {
  MessageTemplate,
  sendToPushTokens,
} from "../../apis/expo/notifications";
import { isEmpty, get, compact, groupBy } from "lodash";

export async function checkNotificationPushStatus(event) {
  await initSettings();
  let { message_template } = JSON.parse(event.body);
  if (!message_template || !message_template.title || !message_template.body)
    return internalErrorResponse("Missing message_template on body");
  // return validResponse({ message_template, msgTickets: response });
}
