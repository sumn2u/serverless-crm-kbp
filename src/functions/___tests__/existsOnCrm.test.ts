import { validatePhoneNumberExists } from "../existOnCrm";
import {initSettings} from "../../config/getSettings";

describe("crm customer fetch", function () {
  beforeAll(async () => {
    await initSettings();
  });
  test("# existByPhone", async () => {
    const result = await validatePhoneNumberExists({
      phoneNumber: "+972534321460",
      nationalId: "201306016"
    });

    expect(result.statusCode).toBe(200);
  });
});
