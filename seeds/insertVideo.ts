import { Knex } from "knex";
import path from "path";
import fs from "fs";
import { Sign } from "../utility/models";

const pathway = path.join(__dirname, "../private", "assets", "teachingAI", "videos", "Hksl");

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("sample_sign_language").del();

  //get all the video name
  let signList: {}[] = [];

  const files = await fs.readdirSync(pathway);

  files.forEach(
    await function (file) {
      const label = file.split(".", 1)[0];
      const sample_video = file;
      const sign: Sign = { label: label, sample_video: sample_video };
      signList.push(sign);
    }
  );

  console.log(signList);

  // Inserts seed entries
  // insert all videos
  await knex("sample_sign_language").insert(signList).returning("id");
}
