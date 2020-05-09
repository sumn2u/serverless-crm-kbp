import { searchByPhoneNumber } from "../management";

describe("auth0 - management", function () {
  test("init", async () => {
    await searchByPhoneNumber('972534321460');
  });
});
