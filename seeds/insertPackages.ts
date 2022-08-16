import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("packages_prices").del();
    await knex("packages").del();

    // Inserts seed entries
    // insert three packages
    const packagesId: Array<{id: number}> = await knex("packages").insert([
        { package_name: "初級學習方案", package_description: "為期五堂, 自由選擇時間, 一小時專業導師教授, 由淺入深學習手語", total_lesson_num: 5 },
        { package_name: "中級學習方案", package_description: "為期十堂, 自由選擇時間, 一小時專業導師教授, 由淺入深學習手語", total_lesson_num: 10 },
        { package_name: "高級學習方案", package_description: "為期二十堂, 自由選擇時間, 一小時專業導師教授, 由淺入深學習手語", total_lesson_num: 20 }
    ]).returning('id');

    // insert packages prices
    return await knex("packages_prices").insert([
        { price: 50, activate_time: "2022-08-05 10:00:00", package_id: packagesId[0].id },
        { price: 100, activate_time: "2022-08-05 10:00:00", package_id: packagesId[1].id },
        { price: 150, activate_time: "2022-08-05 10:00:00", package_id: packagesId[2].id }
    ]);
};
