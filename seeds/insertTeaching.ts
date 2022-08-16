import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("sample_sign_language").del();
    // Inserts seed entries
    // insert three packages
    await knex("sample_sign_language").insert([
        { label: "HKsl_able to", sample_video: "Total Lesson : 5"},
        { label: "HKsl_bread", sample_video: "Total Lesson : 10"},
        { label: "HKsl_rice", sample_video: "Total Lesson : 20"}
    ])
};
