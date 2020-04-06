import { validatePhoneNumberExists } from "../existOnCrm";

test("# existByPhone", async () => {
  const result = await validatePhoneNumberExists({
    phoneNumber: "+972534321460",
    nationalId: "201306016"
  });

  expect(result.statusCode).toBe(200);
});
