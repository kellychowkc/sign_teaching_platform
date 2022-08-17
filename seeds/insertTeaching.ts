import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("sample_sign_language").del();
  // Inserts seed entries
  // insert three packages
  await knex("sample_sign_language").insert([
    { label: "Hksl_able to", sample_video: "Total Lesson : 5" },
    { label: "Hksl_bread", sample_video: "Total Lesson : 10" },
    { label: "Hksl_ice", sample_video: "Total Lesson : 20" },
    { label: "Hksl_orange", sample_video: "Total Lesson : 20" },
    { label: "Hksl_apple", sample_video: "Total Lesson : 20" },
    { label: "Hksl_pineapple", sample_video: "Total Lesson : 20" },
    { label: "Hksl_pen", sample_video: "Total Lesson : 20" },
  ]);
}
