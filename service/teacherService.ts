
import { Knex } from "knex";

export class TeacherService {
    constructor(private knex: Knex) { }

    async getTeacherTimeList(id: number) {
        const txn = await this.knex.transaction();
        try {
            const teacherData: Array<{ id: number }> = await txn.select("id").from("teachers").where("user_id", id);
            const timeData: Array<{ time_table_id: number }> = await txn("can_booking_table").select("time_table_id").where("teacher_id", teacherData[0]["id"]);
            let timeList = [];
            for (let timeId of timeData) {
                const data: Array<{ weekday: string, booking_time: string }> = await txn("time_table").select("weekday", "booking_time").where("id", timeId["time_table_id"]);
                const weekday: string = (data[0]["weekday"]).substring(0, 1).toLowerCase() + (data[0]["weekday"]).substring(1,);
                timeList.push({ "weekday": weekday, "time": data[0]["booking_time"] });
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
            const teacherData: Array<{ id: number }> = await txn("teachers").select("id").where("user_id", id);
            const teacherId = teacherData[0]["id"];

            // check have already data in "time_table"
            const matchTime = await txn("time_table").select("*").where("weekday", weekdayData).andWhere("booking_time", timeData);

            if (matchTime.length === 0) {
                // if not data, create new one in "time_table", and create new one in "can_booking_table"
                const newTimeData: Array<{ id: number }> = await txn("time_table").insert({ weekday: weekdayData, booking_time: timeData }).returning("id");
                const timeId = newTimeData[0]["id"];
                await txn("can_booking_table").insert({ teacher_id: teacherId, time_table_id: timeId });
            } else {
                // if already have data in "time_table", check this teacher have booked this time or not in "can_booking_table"
                const timeId = parseInt(matchTime[0].id as string, 10);
                const hasData: Array<{ id: number }> = await txn("can_booking_table").select("id").where("teacher_id", teacherId).andWhere("time_table_id", timeId);
                if (hasData.length === 0) {
                    // if not data, create new one
                    await txn("can_booking_table").insert({ teacher_id: teacherId, time_table_id: timeId });
                } else {
                    // if already have, delete that one
                    const hasDataId = hasData[0]["id"];
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


    async getTeacherImage(id: number) {
        const teacherData: Array<{ teacher_image: string, teacher_description: string }> = await this.knex("teachers").select("teacher_image", "teacher_description").where("user_id", id);
        const result = { "image": teacherData[0]["teacher_image"], "description": teacherData[0]["teacher_description"] }
        return result;
    }


    async editTeacherDescription(id: number, description: string) {
        return await this.knex("teachers").update({ teacher_description: description }).where("user_id", id);

    }

    async editTeacherImage(id: number, title: string) {
        const txn = await this.knex.transaction();
        try {
            const teacherOldData: Array<{ teacher_image: string }> = await this.knex.select("teacher_image").from("teachers").where("user_id", id);
            const image = teacherOldData[0]["teacher_image"];
            await txn("teachers").update({ teacher_image: title }).where("user_id", id);
            await txn.commit();
            return image;
        }
        catch(err) {
            await txn.rollback();
            return;
        }
    }

    async getTeachingRecord(id: number) {
        const txn = await this.knex.transaction();
        try {
            const teacherData: Array<{ id: number }> = await txn("teachers").select("id").where("user_id", id);
            const lessonOfTeaching: Array<{ order_id: number, date_time: Date, status: string }> = await txn("lessons").select("order_id", "date_time", "status").where("teacher_id", teacherData[0]["id"]);
            let eachLesson = [];
            for (let lesson of lessonOfTeaching) {
                const lessonDateTime = lesson["date_time"].toLocaleString("en-US");
                const studentData: Array<{ user_id: number }> = await txn("orders").select("user_id").where("id", lesson["order_id"]);
                const student: Array<{ username: string }> = await txn("users").select("username").where("id", studentData[0]["user_id"]);
                const studentOfTeaching = { "studentName": student[0]["username"], "teachingDate": lessonDateTime, "status": lesson["status"] };
                eachLesson.push(studentOfTeaching);
            }
            await txn.commit();
            return eachLesson;
        }
        catch (err) {
            await txn.rollback();
            return;
        }
    }

}