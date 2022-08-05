import { Knex } from "knex";
import { User } from "../utility/models";
import { SessionUser } from "../utility/models";
import { hashPassword } from "../utility/hash";


export class UserService {
  constructor(private knex: Knex) {}

  async login(username: string): Promise<User[]> {
    console.log("this is username form service:", username)
    const foundUser = await this.knex
      .select("*")
      .from("users")
      .where("username", username)
      .first();
    return foundUser;
  }

  async create(body: User) {
    let { username, password, first_name, last_name, email, phone_num} = body;
    const identity = "student";
    password = await hashPassword(password)
    console.log("this is req input:",username, password, first_name, last_name, email, phone_num)

    // check if repeated
    const nameResult = await this.knex.select("*").from("users").where("username",username)
    const emailResult = await this.knex.select("*").from("users").where("email",email)
    const phoneNumResult = await this.knex.select("*").from("users").where("phone_num",phone_num)

    console.log("this is checking:", nameResult,emailResult,phoneNumResult)
    if(nameResult.length == 0|| emailResult.length == 0 || phoneNumResult.length == 0){
      const createdUserId = await this.knex
      .insert({ username, password, first_name, last_name, email, phone_num, identity })
      .into("users")
      .returning("id");
    console.log("inserting...", createdUserId)
    return createdUserId;
    }
    console.log("empty array!")
    return 
  
  }


  getUserInfo = (SessionUser:SessionUser) => {
    this.knex.select("*").from("users").where("id",`${SessionUser.id}`).first();
  } 
  
  // try doing for admin's system control, excluding admin himself
  getAllUsers = (SessionUser:SessionUser) => {
    this.knex.select("*").from("users").whereNot("id",`${SessionUser.id}`);
  }
}
