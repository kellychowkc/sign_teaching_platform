import { Knex } from "knex";
import { User } from "../utility/models";

export class UserService {
  constructor(private knex: Knex) {}

  async login(body: User): Promise<User[]> {
    const { username, password } = body;
    const foundUser = await this.knex
      .select("*")
      .from("users")
      .where("username", username)
      .andWhere("password", password);
    return foundUser;
  }

  async create(body: User) {
    const { username, password, firstName, lastName, email, phoneNum } = body;
    const identity = "student";
    const createdUserId = await this.knex
      .insert({ username, password, firstName, lastName, email, phoneNum, identity })
      .into("users")
      .returning("id");
    return createdUserId;
  }

  async getAllUsers() {
    return await this.knex.select("*").from("users");
  }
}
