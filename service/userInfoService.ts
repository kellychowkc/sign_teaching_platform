
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
            const checkPass: User[] = await txn.select("*").from("users").where("id", id);
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
            return;
        }
    }


    async getTeacherTimeList(id: number) {
        const txn = await this.knex.transaction();
        try {
            const teacherData = await txn.select("*").from("teachers").where("user_id", id);
            const teacherId = teacherData[0].id as number;
            const timeIdData = await txn.select("time_table_id").from("can_booking_table").where("teacher_id", teacherId);
            let timeList = [];
            for (let i = 0; i < timeIdData.length; i++) {
                const timeId = parseInt(timeIdData[i]["time_table_id"] as string, 10);
                const data = await txn.select("weekday", "booking_time").from("time_table").where("id", timeId);

                timeList.push({ "weekday": data[0]["weekday"], "time": data[0]["booking_time"] });
            }

            await txn.commit();
            return timeList;
        }
        catch (err) {
            await txn.rollback();
            return;
        }
    }



    async editTeacherTimeList(id: number, weekdayData: string, timeData: string) {
        const txn = await this.knex.transaction();
        try {
            console.log("1", weekdayData, timeData)
            const teacherData = await txn.select("*").from("teachers").where("user_id", id);
            const teacherId = teacherData[0].id as number;

            // check have already data in "time_table"
            const matchTime = await txn.select("*").from("time_table").where("weekday", weekdayData).andWhere("booking_time", timeData);

            if (matchTime.length === 0) {
                // if not data, create new one in "time_table", and create new one in "can_booking_table"
                const newTimeData = await txn("time_table").insert({ weekday: weekdayData, booking_time: timeData }).returning("id");
                const timeId = parseInt(newTimeData[0].id as string, 10);
                await txn("can_booking_table").insert({ teacher_id: teacherId, time_table_id: timeId });
            } else {
                // if already have data in "time_table", check this teacher have booked this time or not in "can_booking_table"
                const timeId = parseInt(matchTime[0].id as string, 10);
                const hasData = await txn.select("*").from("can_booking_table").where("teacher_id", teacherId).andWhere("time_table_id", timeId);
                if (hasData.length === 0) {
                    // if not data, create new one
                    await txn("can_booking_table").insert({ teacher_id: teacherId, time_table_id: timeId });
                } else {
                    // if already have, delete that one
                    const hasDataId = parseInt(hasData[0].id as string, 10);
                    await txn("can_booking_table").where("id", hasDataId).del();
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



    async getTeacherData() {
        const txn = await this.knex.transaction();
        try {
            const bookingData = await txn.select("*").from("can_booking_table");
            const canBookingList = [];
            for (let data of bookingData) {
                const teacherData = await txn.select("*").from("teachers").where("id", data["teacher_id"]);
                const userData = await txn.select("*").from("users").where("id", teacherData[0]["user_id"]);

                const timeTableData = await txn.select("*").from("time_table").where("id", data["time_table_id"]);
                const bookingDayTime: string = timeTableData[0]["weekday"] + (timeTableData[0]["booking_time"]).substring(0, 2);
                canBookingList.push({ "id": data["teacher_id"], "name": userData[0]["first_name"] as string, "image": teacherData[0]["teacher_image"] as string, "bookingId": bookingDayTime });
            }
            await txn.commit();
            return canBookingList;
        }
        catch (err) {
            await txn.rollback();
            return;
        }
    }

    async selectBookedDate(id: number) {
        return await this.knex("lessons").select("date_time").where("teacher_id", id);
    }


    async insertBookingData(id: number, dateTime: string) {
        const lessonId = await this.knex("lessons").insert({
            date_time: dateTime,
            status: "booking",
            teacher_id: id
        }).returning("id");
        if (lessonId) {
            return true;
        } else {
            return false;
        }
    }


    async getTeacherImage(id: number) {
        const teacherData = await this.knex.select("*").from("teachers").where("user_id", id);
        const image = teacherData[0]["teacher_image"] as string;
        const description = teacherData[0]["teacher_description"] as string;
        const result = { "image": image, "description": description }
        return result;
    }


    // async editTeacherImage(id: number,title: string) {
    //     const txn = await this.knex.transaction();
    //     try {
    //         const teacherData = await this.knex.select("*").from("teachers").where("user_id", id);
    //         const image = teacherData[0]["teacher_image"] as string;
    //         await txn("teachers").update({ teacher_image: title }).where("user_id", id);
    //         await txn.commit();
    //         return image;
    //     }
    //     catch(err) {
    //         await txn.rollback();
    //         return;
    //     }
    // }
}