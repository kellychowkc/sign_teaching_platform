import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        { username: "peter", password: "", first_name: "", last_name: "", email: "", phone_num: "21212121", identity: "student" },
        { username: "", password: "", first_name: "", last_name: "", email: "", phone_num: "23232323", identity: "teacher" },
        { username: "", password: "", first_name: "", last_name: "", email: "", phone_num: "24242424", identity: "teacher" },
        { username: "", password: "", first_name: "", last_name: "", email: "", phone_num: "25252525", identity: "teacher" },
        { username: "", password: "", first_name: "", last_name: "", email: "", phone_num: "26262626", identity: "teacher" },
        { username: "", password: "", first_name: "", last_name: "", email: "", phone_num: "27272727", identity: "teacher" },
        { username: "", password: "", first_name: "", last_name: "", email: "", phone_num: "28282828", identity: "admin" },
    ]);
};
