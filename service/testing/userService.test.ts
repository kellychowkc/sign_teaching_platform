import { UserService } from "../userService";
import knexConfigs from "../../knexfile";
import type { Knex as KnexType } from "knex";
// import { User } from "../../utility/models";
import Knex from "knex";

describe("UserService", () => {
  let service: UserService;
  let knex: KnexType;

  beforeAll(() => {
    knex = Knex(knexConfigs["test"]);
  });

  beforeEach(async () => {
    service = new UserService(knex);

    await knex("users").del();

    const username = "kckckc";
    const password = "1234";
    const first_name = "kc";
    const last_name = "kc";
    const email = "kc@kc";
    const phone_num = 1234;
    const identity = "student";

    await knex("users").insert({
      username: username,
      password: password,
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone_num: phone_num,
      identity: identity,
    });
  });

  it("login - success", async () => {
    const username = "kckckc";
    const user = await service.logIn(username);

    expect(user.username).toBe(username);
  });

  afterAll(async () => {
    await knex.destroy;
  });
});
