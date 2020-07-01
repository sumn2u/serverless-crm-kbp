import { Expo, ExpoPushMessage, ExpoPushTicket } from "expo-server-sdk";

// Create a new Expo SDK client
const expo = new Expo();

export interface MessageTemplate {
  title: string;
  body: string;
  data: object;
}

type PushMessages = Array<ExpoPushMessage>;

export async function prepareMessages(
  pushTokens: Array<string>,
  messageTemplate: MessageTemplate
) {
  const messages: PushMessages = [];
  for (let pushToken of pushTokens) {
    // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

    // Check that all your push tokens appear to be valid Expo push tokens
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }

    const { title, body, data } = messageTemplate;

    // Construct a message (see https://docs.expo.io/versions/latest/guides/push-notifications)
    const msg: ExpoPushMessage = {
      to: pushToken,
      sound: "default",
      title,
      body,
      data,
    };

    messages.push(msg);
  }

  return messages;
}

export async function sendToPushTokens(
  pushTokens: Array<string>,
  messageTemplate: MessageTemplate
) {
  const messages = await prepareMessages(pushTokens, messageTemplate);

  console.log("*** messages", messages);

  // The Expo push notification service accepts batches of notifications so
  // that you don't need to send 1000 requests to send 1000 notifications. We
  // recommend you batch your notifications to reduce the number of requests
  // and to compress them (notifications with similar content will get
  // compressed).
  const chunks = expo.chunkPushNotifications(messages);
  const tickets: ExpoPushTicket[] = [];
  return (async () => {
    // Send the chunks to the Expo push notification service. There are
    // different strategies you could use. A simple one is to send one chunk at a
    // time, which nicely spreads the load out over time:
    for (const chunk of chunks) {
      try {
        const ticketChunk: ExpoPushTicket[] = await expo.sendPushNotificationsAsync(
          chunk
        );
        console.log(ticketChunk);
        tickets.push(...ticketChunk);
        // NOTE: If a ticket contains an error code in ticket.details.error, you
        // must handle it appropriately. The error codes are listed in the Expo
        // documentation:
        // https://docs.expo.io/versions/latest/guides/push-notifications#response-format
      } catch (error) {
        console.error(error);
      }
    }

    return tickets;
  })();
}
