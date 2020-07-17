import * as moment from "moment";
import * as _ from "lodash";

import { internalErrorResponse, validResponse } from "../../common/responses";
import { happenedBeforeMoreThen } from "../utils/dates";
import * as auth0 from "../../apis/auth0/management";
import { parseEvent } from "../utils/parseEvent";
import { sendMessage } from "../../apis/botsify/sendMessage";
import { updateMetadata } from "../../apis/auth0/management";
import {buildHelperMessage} from "./buildHelperMessage";

const dateTimeFormat = "YYYY-MM-DD hh:mm:ss";
const minutesSpan = -10;

export async function onCustomerMessage(event) {
  const body = await parseEvent(event, [
    "{fbId}",
    "{user_name}",
  ]);

  const fbId = body["{fbId}"];
  const user_name = body["{user_name}"];

  const relevantUsers = await auth0.searchBySID(fbId.toString());
  if (!relevantUsers || relevantUsers.length === 0) {
    const message = `there is no user with fbId (SID): ${fbId}`;
    console.error(message);
    return validResponse({ message });
  } else if (relevantUsers.length > 1) {
    console.error(`there are two users with the same fbId (SID):`, fbId);
  }

  const user = relevantUsers[0];
  console.log("*** user", user);

  const lastGuideHelpMessage = _.get(
    user,
    "user_metadata.lastGuideHelpMessage"
  );
  console.log("*** lastGuideHelpMessage", lastGuideHelpMessage);
  const minutesSinceLastGuideMessage = moment(lastGuideHelpMessage).diff(
    moment(),
    "minutes"
  );
  console.log("*** minutesSinceLastGuideMessage", minutesSinceLastGuideMessage);
  if (minutesSinceLastGuideMessage > minutesSpan) {
    const message = `No guide update - last update was less then ${minutesSpan} minutes`;
    console.log(message);
    return validResponse({ message });
  }

  const message = buildHelperMessage(user, user_name);
  await sendMessage(null, { text: message });
  console.log("messge sent:", message);

  // update the user with "lastGuideHelpMessage"
  await updateMetadata(user.user_id, {
    lastGuideHelpMessage: moment().format(),
  });

  return validResponse({ message });
}
