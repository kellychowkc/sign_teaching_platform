
import { Knex } from "knex";

export class TeacherService {
    constructor(private knex: Knex) { }

    async getTeacherTimeList(id: number) {
        const teacherBookingData: Array<{ weekday: string, booking_time: string }> =
            await this.knex("can_booking_table")
                .select("time_table.weekday", "time_table.booking_time")
                .innerJoin("time_table", "can_booking_table.time_table_id", "time_table.id")
                .innerJoin("teachers", "can_booking_table.teacher_id", "teachers.id")
                .where("teachers.user_id", id);
        let timeList = [];
        for (let data of teacherBookingData) {
            timeList.push({
                "weekday": data["weekday"],
                "time": data["booking_time"]
            });
        }
        return timeList;
    }


    async editTeacherTimeList(id: number, weekdayData: string, timeData: string) {
        const txn = await this.knex.transaction();
        try {
            const teacherData: Array<{ id: number }> =
                await txn("teachers")
                    .select("id")
                    .where("user_id", id);

            // check have already data in "time_table"
            const matchTime: Array<{ id: number }> =
                await txn("time_table")
                    .select("id")
                    .where("weekday", weekdayData)
                    .andWhere("booking_time", timeData);

            if (matchTime.length === 0) {
                // if not data, create new one in "time_table", and create new one in "can_booking_table"
                const newTimeData: Array<{ id: number }> =
                    await txn("time_table")
                        .insert({
                            weekday: weekdayData,
                            booking_time: timeData
                        })
                        .returning("id");
                await txn("can_booking_table")
                    .insert({
                        teacher_id: teacherData[0]["id"],
                        time_table_id: newTimeData[0]["id"]
                    });
            } else {
                // if already have data in "time_table", check this teacher have booked this time or not in "can_booking_table"
                const hasData: Array<{ id: number }> =
                    await txn("can_booking_table")
                        .select("id")
                        .where("teacher_id", teacherData[0]["id"])
                        .andWhere("time_table_id", matchTime[0]["id"]);
                if (hasData.length === 0) {
                    // if not data, create new one
                    await txn("can_booking_table")
                        .insert({
                            teacher_id: teacherData[0]["id"],
                            time_table_id: matchTime[0]["id"]
                        });
                } else {
                    // if already have, delete that one
                    await txn("can_booking_table")
                        .where("id", hasData[0]["id"])
                        .del();
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


    async getTeacherData(id: number) {
        const teacherData: Array<{ teacher_image: string, teacher_description: string }> =
            await this.knex("teachers")
                .select("teacher_image", "teacher_description")
                .where("user_id", id);
        const result = {
            "image": teacherData[0]["teacher_image"],
            "description": teacherData[0]["teacher_description"]
        };
        return result;
    }


    async editTeacherDescription(id: number, description: string) {
        return await this.knex("teachers")
            .update({
                teacher_description: description
            })
            .where("user_id", id);
    }


    async editTeacherImage(id: number, title: string) {
        const teacherOldData: Array<{ teacher_image: string }> =
            await this.knex("teachers")
                .select("teacher_image")
                .where("user_id", id);
        await this.knex("teachers")
            .update({
                teacher_image: title
            })
            .where("user_id", id);
        return teacherOldData[0]["teacher_image"];
    }


    async getTeachingRecord(id: number) {
        const lessonOfTeaching: Array<{ username: string, date_time: Date, status: string }> =
            await this.knex("lessons")
                .select("users.username", "lessons.date_time", "lessons.status")
                .innerJoin("teachers", "lessons.teacher_id", "teachers.id")
                .innerJoin("orders", "lessons.order_id", "orders.id")
                .innerJoin("users", "orders.user_id", "users.id")
                .where("teachers.user_id", id)
                .orderBy("lessons.date_time");
        let eachLesson = [];
        for (let lesson of lessonOfTeaching) {
            const lessonDateTime = lesson["date_time"].toLocaleString("en-US");
            eachLesson.push({
                "studentName": lesson["username"],
                "teachingDate": lessonDateTime,
                "status": lesson["status"]
            });
        }
        return eachLesson;
    }


    async getLessonForTeacher(id: number, upLimitDay: Date, downLimitDay: Date) {
        const allLessonData: Array<{ id: number, username: string, lesson_link: string, date_time: Date }> =
            await this.knex("lessons")
                .select("lessons.id", "users.username", "lessons.lesson_link", "lessons.date_time")
                .innerJoin("teachers", "lessons.teacher_id", "teachers.id")
                .innerJoin("orders", "lessons.order_id", "orders.id")
                .innerJoin("users", "orders.user_id", "users.id")
                .where("teachers.user_id", id)
                .andWhere("lessons.date_time", ">", downLimitDay)
                .andWhere("lessons.date_time", "<", upLimitDay)
                .orderBy("lessons.date_time");
        const lessonData = [];
        for (let lesson of allLessonData) {
            lessonData.push({
                id: lesson["id"],
                student: lesson["username"],
                learningDate: lesson["date_time"].toLocaleString("en-US"),
                lessonLink: lesson["lesson_link"]
            });
        }
        return lessonData;
    }

    async getLessonData(id: number) {
        const lessonData: Array<{ username: string, lesson_link: string, date_time: Date }> =
            await this.knex("orders")
                .select("users.username", "lessons.lesson_link", "lessons.date_time")
                .innerJoin("users", "orders.user_id", "users.id")
                .innerJoin("lessons", "orders.id", "lessons.order_id")
                .where("lessons.id", id);
        const data = {
            student: lessonData[0]["username"],
            link: lessonData[0]["lesson_link"],
            time: lessonData[0]["date_time"].toLocaleString("en-US")
        };
        return data;

    }

    async insertLessonLink(id: number, link: string) {
        const matchLink: Array<{ id: number}> = 
            await this.knex("lessons")
                .select("id")
                .where("lesson_link", link);
        if (matchLink.length > 0) {
            return false;
        } else {
            await this.knex("lessons")
            .update({
                lesson_link: link
            })
            .where("id", id);
            return true;
        }
        
    }


    async editLessonData(id: number, link: string, status: string) {
        return this.knex("lessons")
            .update({
                lesson_link: link, 
                status: status
            })
            .where("id", id);
    }

}