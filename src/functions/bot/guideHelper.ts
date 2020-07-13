import * as moment from "moment";

import { internalErrorResponse, validResponse } from "../../common/responses";
import getSettings, { initSettings } from "../../config/getSettings";
import { happenedBefore } from "../utils/dates";
import * as auth0 from "../../apis/auth0/management";
import { parseEvent } from "../utils/parseEvent";
import {sendMessage} from "../../apis/botsify/sendMessage";

const minutesSpan = 10;

export async function onCustomerMessage(event) {
  const body = await parseEvent(event, ["last_user_msg_time", "fbId"]);

  const lastUserMessageTime = moment(
    body.last_user_msg_time.toString(),
    "YYYY-MM-DD hh:mm:ss"
  );
  if (!lastUserMessageTime)
    return internalErrorResponse("Missing last_user_msg_time");
  if (!happenedBefore(lastUserMessageTime, minutesSpan)) {
    const message = `No guide update - last update was less then ${minutesSpan} minutes`;
    console.log(message);
    return validResponse({ message });
  }

  const relevantUsers = await auth0.searchBySID(body.fbId.toString());
  // console.log('*** relevantUsers', relevantUsers);
  if (!relevantUsers || relevantUsers.length === 0) {
    const message = `there is no user with fbId (SID): ${body.fbId}`;
    console.error(message);
    return validResponse({ message });
  }

  if (relevantUsers.length > 1) {
    console.error(`there are two users with the same fbId (SID):`, body.fbId);
  }

  const user = relevantUsers[0];
  // console.log('*** user', user);

  await sendMessage(null, {text: "test"})

  return validResponse({ });
}
