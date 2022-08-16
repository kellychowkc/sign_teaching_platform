
import { Knex } from "knex";
import { checkPassword, hashPassword } from "../utility/hash";

export class UserInfoService {
    constructor(private knex: Knex) { }

    async getUserData(id: number) {
        const userData: Array<{ username: string, first_name: string, last_name: string, email: string, phone_num: number }> =
            await this.knex("users")
                .select(
                    "username",
                    "first_name",
                    "last_name",
                    "email",
                    "phone_num"
                )
                .where("id", id);
        return userData[0];
    }


    async editUserInfo(id: number, data: { username: string, firstName: string, lastName: string, email: string, phoneNum: number }) {
        return await this.knex("users")
            .update({
                username: data.username,
                first_name: data.firstName,
                last_name: data.lastName,
                email: data.email,
                phone_num: data.phoneNum
            })
            .where("id", id);
    }


    async editUserPassword(id: number, password: { oldPassword: string, newPassword: string }) {
        const checkPass: Array<{ password: string }> =
            await this.knex("users")
                .select("password")
                .where("id", id);
        const match = await checkPassword(password["oldPassword"], checkPass[0]["password"]);
        if (match === true) {
            const newPass = await hashPassword(password["newPassword"]);
            if (newPass) {
                await this.knex("users")
                    .update({
                        password: newPass
                    })
                    .where("id", id);
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }


    async getCalendarData(id: number, identity: string) {
        const txn = await this.knex.transaction();
        try {
            const eventData = [];
            if (identity === "teacher") {
                const lessonData: Array<{ order_id: number, date_time: Date }> =
                    await txn("lessons")
                        .select("lessons.order_id", "lessons.date_time")
                        .innerJoin("teachers", "lessons.teacher_id", "teachers.id")
                        .where("teachers.user_id", id);
                for (let lesson of lessonData) {
                    const lessonDateTime = lesson["date_time"].toLocaleString("en-GB");
                    const userData: Array<{ username: string }> =
                        await txn("users")
                            .select("users.username")
                            .innerJoin("orders", "users.id", "orders.user_id")
                            .where("orders.id", lesson["order_id"]);
                    eventData.push({
                        title: userData[0]["username"],
                        start: lessonDateTime
                    });
                }
            } else if (identity === "student") {
                const lessonData: Array<{ date_time: Date, teacher_id: number }> =
                    await txn("lessons")
                        .select("lessons.date_time", "lessons.teacher_id")
                        .innerJoin("orders", "lessons.order_id", "orders.id")
                        .where("orders.user_id", id);
                for (let lesson of lessonData) {
                    const lessonDateTime = lesson["date_time"].toLocaleString("en-GB");
                    const teacherName: Array<{ first_name: string }> =
                        await txn("users")
                            .select("users.first_name")
                            .innerJoin("teachers", "users.id", "teachers.user_id")
                            .where("teachers.id", lesson["teacher_id"]);
                    eventData.push({
                        title: teacherName[0]["first_name"],
                        start: lessonDateTime
                    });
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
