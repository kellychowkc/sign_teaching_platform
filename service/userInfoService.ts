
import { Knex } from "knex";
import { checkPassword, hashPassword } from "../utility/hash";
import { User } from "../utility/models";

export class UserInfoService {
    constructor(private knex: Knex) { }

    async getUserData(id: number) {
        return await this.knex.select("*").from("users").where("id", id);
    }

    async editUserInfo(id: number, name: string, data: User) {
        const txn = await this.knex.transaction();
        try {
            const newUsername = data.username;
            if (name !== newUsername) {
                const matchName = await txn.select("*").from("users").where("username", newUsername);
                if (matchName.length > 0) {
                    return false;
                }
                await txn("users").update({
                    username: newUsername,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                    phone_num: data.phone_num
                }).where("id", id);
            } else {
                await txn("users").update({
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                    phone_num: data.phone_num
                }).where("id", id);
            }
            await txn.commit();
            return true;
        }
        catch (err) {
            await txn.rollback();
            return false;
        }
    }


    async editUserPassword(id: number, oldPass: string, newPass: string) {
        const txn = await this.knex.transaction();
        try {
            const checkPass: Array<{ password: string }> = await txn.select("password").from("users").where("id", id);
            if (!checkPassword(oldPass, checkPass["password"])) {
                return false;
            }
            await txn("users").update({
                password: hashPassword(newPass)
            }).where("id", id);

            await txn.commit();
            return true;
        }
        catch (err) {
            await txn.rollback();
            return false;
        }
    }


    async getCalendarData(id: number, identity: string) {
        const txn = await this.knex.transaction();
        try {
            const eventData = [];
            if (identity === "teacher") {
                const teacherId: Array<{ id: number }> = await txn("teachers").select("id").where("user_id", id);
                const lessonData: Array<{ order_id: number, date_time: Date }> = await txn("lessons").select("order_id", "status").where("teacher_id", teacherId[0]["id"]);
                for (let lesson of lessonData) {
                    const lessonDate = lesson["date_time"].toLocaleDateString("en-US") + lesson["date_time"].toLocaleTimeString("en-US");
                    const userId: Array<{ user_id: number }> = await txn("orders").select("user_id").where("id", lesson["order_id"]);
                    const userData: Array<{ username: string }> = await txn("users").select("username").where("id", userId[0]["user_id"]);
                    eventData.push({ title: userData[0]["username"], start: lessonDate });
                }
            } else if (identity === "student") {
                const orderId: Array<{ id: number }> = await txn("orders").select("id").where("user_id", id);
                for (let order of orderId) {
                    const lessonData: Array<{ date_time: Date, teacher_id: number }> = await txn("lessons").select("date_time", "teacher_id").where("order_id", order["id"]);
                    for (let lesson of lessonData) {
                        const lessonDate = lesson["date_time"].toLocaleDateString("en-US") + lesson["date_time"].toLocaleTimeString("en-US");
                        console.log(lessonDate)
                        const teacherData: Array<{ user_id: number }> = await txn("teachers").select("user_id").where("id", lesson["teacher_id"]);
                        const teacherName: Array<{ first_name: string }> = await txn("users").select("first_name").where("id", teacherData[0]["user_id"]);
                        eventData.push({ title: teacherName[0]["first_name"], start: lessonDate });
                    }
                }
            }
            await txn.commit();
            return eventData;
        }
        catch (err) {
            await txn.rollback();
            return;
        }
    }
}