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

export async function sendInBatches(messageTemplate: MessageTemplate) {
  let shouldContinue = true;
  let currPage = 0;
  const allTickets: any = [];

  while (shouldContinue) {
    const users = await searchForPushableTokens(currPage);
    if (isEmpty(users)) {
      shouldContinue = false;
      break;
    }

    const tokens: string[] = users.map((user) => {
      const pushSettings = get(user, "user_metadata.pushToken");
      if (!pushSettings.sendNotifications) {
        console.error("*** push setting is off for ", user.name);
        return null;
      }

      if (!pushSettings.token) {
        console.error("*** null token for ", user.name);
        return null;
      }

      return pushSettings.token;
    });

    console.log("*** tokens", tokens);
    const cleanTokens: string[] = compact(tokens);
    console.log("*** cleanTokens", cleanTokens);

    const tickets = await sendToPushTokens(cleanTokens, messageTemplate);
    allTickets.push(...tickets);
    currPage++;
  }

  console.log("*** allTickets", groupBy(allTickets, "status"));
  return groupBy(allTickets, "status");
}

export async function sendNotifications(event) {
  await initSettings();
  let { message_template } = JSON.parse(event.body);
  if (!message_template || !message_template.title || !message_template.body)
    return internalErrorResponse("Missing message_template on body");

  const response = await sendInBatches(message_template);
  return validResponse({ message_template, msgTickets: response });
}
