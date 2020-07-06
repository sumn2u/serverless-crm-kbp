import { sendToPushTokens } from "../notifications";
import { initSettings } from "../../../config/getSettings";

describe("expo", function () {
  beforeAll(async () => {
    await initSettings();
  });

  test.skip("send push msg", async () => {
    const data = {
      title: "test title",
      body: "test body",
      data: {},
    };
    const pushTokens = [
      "ExponentPushToken[XIgqbQB4IxsBsQczBXiP5G]",
      "ExponentPushToken[qpBnJTMmL9rwxYXw-tEUI9]",
      "1234",
    ];
    const tickets = await sendToPushTokens(pushTokens, data);
    // console.log('*** customer', customer);
    tickets.forEach((ticket) => {
      expect(ticket).toHaveProperty("status");
    });
  });
});
