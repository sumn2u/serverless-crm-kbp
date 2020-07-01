import { sendInBatches } from "../../notifications/sendNotifications";
import { initSettings } from "../../../config/getSettings";

jest.setTimeout(10000); // 1 second

const data = {
  title: "test title",
  body: "test body",
  data: {},
};

describe("notifications", function () {
  beforeAll(async () => {
    await initSettings();
  });

  test("processMessagesBatch", async () => {
    await sendInBatches(data);
  });
});
