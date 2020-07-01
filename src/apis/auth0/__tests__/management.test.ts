import {
  searchByPhoneNumber,
  searchForPushableTokens,
  updateMetadata,
} from "../management";
import { initSettings } from "../../../config/getSettings";

describe("auth0 - management", function () {
  beforeAll(async () => {
    await initSettings();
  });

  test("searchByPhoneNumber", async () => {
    const customer = await searchByPhoneNumber("972534321460");
    // console.log('*** customer', customer);
    expect(customer[0]).toHaveProperty("name");
  });

  test("updateMetadata", async () => {
    const usermetadata = {
      pushToken: {
        token: "bbb",
        sendNotifications: true,
      },
    };

    const userId = "sms|5e8485a676c8536728a29151";

    const response = await updateMetadata(userId, usermetadata);

    console.log("*** response", response);
    expect(response).toHaveProperty("name");
  });

  test("searchForPushableTokens", async () => {
    const tokens = await searchForPushableTokens();
    console.log("*** tokens", JSON.stringify(tokens, null, 2));
    expect(tokens[0]).toHaveProperty("user_metadata");
  });
});
