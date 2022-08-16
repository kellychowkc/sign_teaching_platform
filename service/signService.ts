import { Knex } from "knex";
// import { Sign } from "../utility/models";

export class SignService {
  constructor(private knex: Knex) {}

  getAllSign = () => {
    return this.knex.select("*").from("sample_sign_language").orderByRaw("id DESC LIMIT 10");
  };
}
