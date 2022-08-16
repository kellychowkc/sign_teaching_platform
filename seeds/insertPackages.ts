import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("packages_prices").del();
    await knex("packages").del();

    // Inserts seed entries
    // insert three packages
    const packagesId: Array<{id: number}> = await knex("packages").insert([
        { package_name: "Short Course", package_description: "Total Lesson : 5", total_lesson_num: 5 },
        { package_name: "Middle Course", package_description: "Total Lesson : 10", total_lesson_num: 10 },
        { package_name: "Long Course", package_description: "Total Lesson : 20", total_lesson_num: 20 }
    ]).returning('id');

    // insert packages prices
    return await knex("packages_prices").insert([
        { price: 50, activate_time: "2022-08-05 10:00:00", package_id: packagesId[0].id },
        { price: 100, activate_time: "2022-08-05 10:00:00", package_id: packagesId[1].id },
        { price: 150, activate_time: "2022-08-05 10:00:00", package_id: packagesId[2].id }
    ]);
};
