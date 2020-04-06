import * as search from "../customer";

test("search succeed", async () => {
  await search.findByPhone('+972534321460').resolves;
});

