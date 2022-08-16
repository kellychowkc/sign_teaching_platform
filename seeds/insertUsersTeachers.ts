import { Knex } from "knex";
import { hashPassword } from "../utility/hash";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("can_booking_table").del();
    await knex("time_table").del();
    await knex("teachers").del();
    await knex("users").del();

    // Inserts seed entries
    // insert into 'time_table'
    const timeTableId: Array<{ id: number }> = await knex("time_table").insert([
        { weekday: "Monday", booking_time: "16:00:00" },
        { weekday: "Sunday", booking_time: "09:00:00" },
        { weekday: "Friday", booking_time: "18:00:00" },
        { weekday: "Saturday", booking_time: "12:00:00" },
        { weekday: "Wednesday", booking_time: "20:00:00" },
        { weekday: "Thursday", booking_time: "14:00:00" },
        { weekday: "Tuesday", booking_time: "22:00:00" },
        { weekday: "Monday", booking_time: "11:00:00" },
        { weekday: "Sunday", booking_time: "13:00:00" },
        { weekday: "Wednesday", booking_time: "10:00:00" },
        { weekday: "Friday", booking_time: "07:00:00" },
        { weekday: "Monday", booking_time: "15:00:00" },
    ]).returning('id');


    // insert one user and one admin
    await knex("users").insert([
        { username: "admin", password: (await hashPassword("1234")).toString(), first_name: "admin1", last_name: "admin1", email: "admin@admin.com", phone_num: "28282828", identity: "admin" },
        { username: "anna", password: (await hashPassword("1234")).toString(), first_name: "anna", last_name: "Hussell", email: "ahusselloc@latimes.com", phone_num: "81448569", identity: "student" },
    ]);

    // inset teacher data into 'users' and 'teachers'
    const teacherId: Array<{ id: number }> = await knex("users").insert([
        { username: "tomas", password: (await hashPassword("1234")).toString(), first_name: "Tomas", last_name: "Aldrich", email: "taldrichdf@wikispaces.com", phone_num: "85315753", identity: "teacher" },
        { username: "jason", password: (await hashPassword("1234")).toString(), first_name: "Jason", last_name: "Alsopp", email: "jalsoppd5@prweb.com", phone_num: "98369507", identity: "teacher" },
        { username: "david", password: (await hashPassword("1234")).toString(), first_name: "David", last_name: "Petras", email: "dpetrashy@cyberchimps.com", phone_num: "73312086", identity: "teacher" }
    ]).returning('id');


    const teacherDataId: Array<{ id: number }> = await knex("teachers").insert([
        { teacher_image: "teacher_icon.png", teacher_description: "Teaching Sign Language at HKU", user_id: teacherId[0].id },
        { teacher_image: "teacher_icon.png", teacher_description: "Professor of Sign Language", user_id: teacherId[1].id },
        { teacher_image: "teacher_icon.png", teacher_description: "The First of Sign Language on 'TIme'", user_id: teacherId[2].id }
    ]).returning('id');



    // insert into 'can_booking_table'
    return await knex("can_booking_table").insert([
        { teacher_id: teacherDataId[0].id, time_table_id: timeTableId[0].id },
        { teacher_id: teacherDataId[0].id, time_table_id: timeTableId[6].id },
        { teacher_id: teacherDataId[0].id, time_table_id: timeTableId[5].id },
        { teacher_id: teacherDataId[0].id, time_table_id: timeTableId[11].id },
        { teacher_id: teacherDataId[1].id, time_table_id: timeTableId[8].id },
        { teacher_id: teacherDataId[1].id, time_table_id: timeTableId[4].id },
        { teacher_id: teacherDataId[1].id, time_table_id: timeTableId[1].id },
        { teacher_id: teacherDataId[1].id, time_table_id: timeTableId[3].id },
        { teacher_id: teacherDataId[1].id, time_table_id: timeTableId[6].id },
        { teacher_id: teacherDataId[1].id, time_table_id: timeTableId[7].id },
        { teacher_id: teacherDataId[2].id, time_table_id: timeTableId[2].id },
        { teacher_id: teacherDataId[2].id, time_table_id: timeTableId[9].id },
        { teacher_id: teacherDataId[2].id, time_table_id: timeTableId[10].id },
        { teacher_id: teacherDataId[2].id, time_table_id: timeTableId[5].id },
        { teacher_id: teacherDataId[2].id, time_table_id: timeTableId[0].id }
    ]);
};
