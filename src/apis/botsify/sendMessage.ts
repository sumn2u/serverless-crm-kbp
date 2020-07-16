import axios from "axios";

import getSettings from "../../config/getSettings";

export function sendMessage(recipientId, message) {
  const {
    botsify: { sendMessageUrl, apiKey, guideHelperFBID },
  } = getSettings();

  const body = {
    apikey: apiKey,
    tag: "CONFIRMED_EVENT_UPDATE",
    to: recipientId || guideHelperFBID,
    message,
  };

  const headers = {
    "Content-Type": "application/json",
  };

  return axios
    .post(sendMessageUrl, JSON.stringify(body), { headers })
    .then((response) => {
      // console.log('*** response', response);
      // console.log('*** response.data', response.data);
      return response.data;
    })
    .catch((error) => {
      console.error(error, "error on send message with botsify", message);
      throw error;
    });
}
