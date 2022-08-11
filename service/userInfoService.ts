
import { Knex } from "knex";
import { checkPassword, hashPassword } from "../utility/hash";

export class UserInfoService {
    constructor(private knex: Knex) { }

    async getUserData(id: number) {
        return await this.knex("users").select("*").where("id", id);
    }

    async editUserInfo(id: number, name: string, data: { username: string, firstName: string, lastName: string, email: string, phoneNum: number }) {
        const txn = await this.knex.transaction();
        try {
            const newUsername = data.username;
            if (name !== newUsername) {
                const matchName = await txn("users").select("*").where("username", newUsername);
                if (matchName.length > 0) {
                    return false;
                }
                await txn("users").update({
                    username: newUsername,
                    first_name: data.firstName,
                    last_name: data.lastName,
                    email: data.email,
                    phone_num: data.phoneNum
                }).where("id", id);
            } else {
                await txn("users").update({
                    first_name: data.firstName,
                    last_name: data.lastName,
                    email: data.email,
                    phone_num: data.phoneNum
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


    async editUserPassword(id: number, password: { oldPassword: string, newPassword: string }) {
        const txn = await this.knex.transaction();
        try {
            const checkPass: Array<{ password: string }> = await txn("users").select("password").where("id", id);
            if (!checkPassword(password["oldPassword"], checkPass[0]["password"])) {
                return false;
            } else {
                const newPass = await hashPassword(password["newPassword"]);
                if (newPass) {
                    await txn("users").update({
                        password: newPass
                    }).where("id", id);
                }

            }


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
                const lessonData: Array<{ order_id: number, date_time: Date }> = await txn("lessons").select("order_id", "date_time").where("teacher_id", teacherId[0]["id"]);
                for (let lesson of lessonData) {
                    const lessonDateTime = lesson["date_time"].toLocaleString("en-GB");
                    const userId: Array<{ user_id: number }> = await txn("orders").select("user_id").where("id", lesson["order_id"]);
                    const userData: Array<{ username: string }> = await txn("users").select("username").where("id", userId[0]["user_id"]);
                    eventData.push({ title: userData[0]["username"], start: lessonDateTime });
                }
            } else if (identity === "student") {
                const orderId: Array<{ id: number }> = await txn("orders").select("id").where("user_id", id);
                for (let order of orderId) {
                    const lessonData: Array<{ date_time: Date, teacher_id: number }> = await txn("lessons").select("date_time", "teacher_id").where("order_id", order["id"]);
                    for (let lesson of lessonData) {
                        const lessonDateTime = lesson["date_time"].toLocaleString("en-GB");
                        const teacherData: Array<{ user_id: number }> = await txn("teachers").select("user_id").where("id", lesson["teacher_id"]);
                        const teacherName: Array<{ first_name: string }> = await txn("users").select("first_name").where("id", teacherData[0]["user_id"]);
                        eventData.push({ title: teacherName[0]["first_name"], start: lessonDateTime });
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



    async getLessonLinkForTeacher (id: number) {
        const txn = await this.knex.transaction();
        try {
            const teacherData: Array<{ id: number }> = await txn("teachers").select("id").where("user_id", id);
            const allLessonData: Array<{ order_id: number, lesson_link: string, date_time: Date }> = await txn("lessons").select("order_id", "lesson_link", "date_time").where("teacher_id", teacherData[0]["id"]).andWhere("date_time", ">", txn.fn.now()).orderBy("date_time");
            const lessonData = [];
            for (let lesson of allLessonData) {
                const lessonDate = lesson["date_time"].toLocaleString("en-US");
                const orderData: Array<{ user_id: number }> = await txn("orders").select("user_id").where("id", lesson["order_id"]);
                const userData: Array<{ username: string }> = await txn("users").select("username").where("id", orderData[0]["user_id"]);
                lessonData.push({ student: userData[0]["username"], learningDate: lessonDate, lessonLink: lesson["lesson_link"] });
            }
            await txn.commit();
            return lessonData;
        }
        catch (err) {
            await txn.rollback();
            return;
        }
    }


    async getLessonLinkForStudent (id: number) {
        const txn = await this.knex.transaction();
        try {
            const orderData: Array<{ id: number }> = await txn("orders").select("id").where("user_id", id);
            const lessonData = [];
            for (let order of orderData) {
                const allLessonData: Array<{ lesson_link: string, date_time: Date, teacher_id: number }> = await txn("lessons").select("lesson_link", "date_time", "teacher_id").where("order_id", order["id"]).andWhere("date_time", ">", txn.fn.now()).orderBy("date_time");
                for (let lesson of allLessonData) {
                    const lessonDate = lesson["date_time"].toLocaleString("en-US");
                    const teacherData: Array<{ user_id: number }> = await txn("teachers").select("user_id").where("id", lesson["teacher_id"]);
                    const userData: Array<{ first_name: string }> = await txn("users").select("first_name").where("id", teacherData[0]["user_id"]);
                    lessonData.push({ teacher: userData[0]["first_name"], learningDate: lessonDate, lessonLink: lesson["lesson_link"] });
                }
            }                
            await txn.commit();
            return lessonData;
        }
        catch (err) {
            await txn.rollback();
            return;
        }
    }

}
