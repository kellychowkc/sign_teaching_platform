import { Knex } from "knex";
import { User } from "../utility/models";
import { SessionUser } from "../utility/models";
import { hashPassword } from "../utility/hash";

export class UserService {
  constructor(private knex: Knex) {}

  async logIn(username: string): Promise<User> {
    const foundUser = await this.knex.select("*").from("users").where("username", username).first();
    console.log(foundUser);
    return foundUser;
  }

  async create(body: User) {
    let { username, password, first_name, last_name, email, phone_num, identity } = body;
    console.log({ username, password, first_name, last_name, email, phone_num, identity });
    password = await hashPassword(password);

    // check if repeated
    const nameResult = await this.knex.select("*").from("users").where("username", username);
    const emailResult = await this.knex.select("*").from("users").where("email", email);
    const phoneNumResult = await this.knex.select("*").from("users").where("phone_num", phone_num);

    if (nameResult.length == 0 || emailResult.length == 0 || phoneNumResult.length == 0) {
      const createdUserId = await this.knex
        .insert({ username, password, first_name, last_name, email, phone_num, identity })
        .into("users")
        .returning("id");
      return createdUserId;
    }
    return;
  }

  getUserInfo = (SessionUser: SessionUser) => {
    this.knex.select("*").from("users").where("id", `${SessionUser.id}`).first();
  };

  // try doing for admin's system control, excluding admin himself
  getAllUsers = (SessionUser: SessionUser) => {
    this.knex.select("*").from("users").whereNot("id", `${SessionUser.id}`);
  };
}
