import * as moment from "moment";

import { internalErrorResponse, validResponse } from "../../common/responses";
import { happenedBeforeMoreThen } from "../utils/dates";
import * as auth0 from "../../apis/auth0/management";
import { parseEvent } from "../utils/parseEvent";
import { sendMessage } from "../../apis/botsify/sendMessage";

const minutesSpan = 10;

function buildHelperMessage(user, fbName) {
  const {
    user_metadata: {
      name,
      address,
      agent,
      lastPurchaseDate,
      lastPurchaseAmount,
      accountBalance,
      created,
    },
  } = user;

  const list = [
    " שם פייסבוק: " + fbName,
    " שם במערכת: " + name,
    " כתובת: " + address,
    " מדריך: " + agent,
    " תאריך קנייה אחרונה: " + moment(lastPurchaseDate).format("DD/MM/YYYY"),
    " סכום קנייה אחרונה: " + lastPurchaseAmount,
    " מאזן חוב: " + accountBalance,
    " תאריך הצטרפות: " + moment(created).format("DD/MM/YYYY"),
  ];

  const text = `
   ${list[0]}
   ${list[1]}  
   ${list[2]}  
   ${list[3]}  
   ${list[4]}  
   ${list[5]}  
   ${list[6]}  
   ${list[7]}  
  `;

  return text;
}

export async function onCustomerMessage(event) {
  const body = await parseEvent(event, [
    "{last_user_msg_time}",
    "{fbId}",
    "{user_name}",
  ]);

  const fbId = body["{fbId}"];
  const last_user_msg_time = body["{last_user_msg_time}"];
  const user_name = body["{user_name}"];

  const lastUserMessageTime = moment(
    last_user_msg_time.toString(),
    "YYYY-MM-DD hh:mm:ss"
  );

  if (!lastUserMessageTime)
    return internalErrorResponse("Missing last_user_msg_time");
  if (!happenedBeforeMoreThen(lastUserMessageTime, minutesSpan)) {
    const message = `No guide update - last update was less then ${minutesSpan} minutes`;
    console.log(message);
    return validResponse({ message });
  }

  const relevantUsers = await auth0.searchBySID(fbId.toString());
  // console.log('*** relevantUsers', relevantUsers);
  if (!relevantUsers || relevantUsers.length === 0) {
    const message = `there is no user with fbId (SID): ${fbId}`;
    console.error(message);
    return validResponse({ message });
  }

  if (relevantUsers.length > 1) {
    console.error(`there are two users with the same fbId (SID):`, fbId);
  }

  const user = relevantUsers[0];
  console.log("*** user", user);
  const message = buildHelperMessage(user, user_name);
  await sendMessage(null, { text: message });
  console.log("messge sent:", message);
  return validResponse({ message });
}
