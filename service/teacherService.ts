
import { Knex } from "knex";

export class TeacherService {
    constructor(private knex: Knex) { }

    async getTeacherTimeList(id: number) {
        const teacherData: Array<{ id: number }> = 
            await this.knex("teachers")
                .select("id")
                .where("user_id", id);
        const timeData: Array<{ time_table_id: number }> = 
            await this.knex("can_booking_table")
                .select("time_table_id")
                .where("teacher_id", teacherData[0]["id"]);
        let timeList = [];
        for (let timeId of timeData) {
            const data: Array<{ weekday: string, booking_time: string }> = 
                await this.knex("time_table")
                    .select("weekday", "booking_time")
                    .where("id", timeId["time_table_id"]);
            timeList.push({ 
                "weekday": data[0]["weekday"], 
                "time": data[0]["booking_time"] 
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
        const teacherData: Array<{ id: number }> = 
            await this.knex("teachers")
                .select("id")
                .where("user_id", id);
        const lessonOfTeaching: Array<{ order_id: number, date_time: Date, status: string }> = 
            await this.knex("lessons")
                .select("order_id", "date_time", "status")
                .where("teacher_id", teacherData[0]["id"]);
        let eachLesson = [];
        for (let lesson of lessonOfTeaching) {
            const lessonDateTime = lesson["date_time"].toLocaleString("en-US");
            const studentData: Array<{ user_id: number }> = 
                await this.knex("orders")
                    .select("user_id")
                    .where("id", lesson["order_id"]);
            const student: Array<{ username: string }> = 
                await this.knex("users")
                    .select("username")
                    .where("id", studentData[0]["user_id"]);
            eachLesson.push({ 
                "studentName": student[0]["username"], 
                "teachingDate": lessonDateTime, 
                "status": lesson["status"] 
            });
        }
        return eachLesson;
    }


    async getLessonLinkForTeacher(id: number) {
        const teacherData: Array<{ id: number }> = 
            await this.knex("teachers")
                .select("id")
                .where("user_id", id);
        const allLessonData: Array<{ id: number, order_id: number, lesson_link: string, date_time: Date }> = 
            await this.knex("lessons")
                .select("id", "order_id", "lesson_link", "date_time")
                .where("teacher_id", teacherData[0]["id"])
                .andWhere("date_time", ">", this.knex.fn.now())
                .orderBy("date_time");
        const lessonData = [];
        for (let lesson of allLessonData) {
            const orderData: Array<{ user_id: number }> = 
                await this.knex("orders")
                    .select("user_id")
                    .where("id", lesson["order_id"]);
            const userData: Array<{ username: string }> = 
                await this.knex("users")
                    .select("username")
                    .where("id", orderData[0]["user_id"]);
            lessonData.push({ 
                id: lesson["id"], 
                student: userData[0]["username"], 
                learningDate: lesson["date_time"].toLocaleString("en-US"), 
                lessonLink: lesson["lesson_link"] 
            });
        }
        return lessonData;
    }

    async getLessonData(id: number) {
        const lessonData: Array<{ order_id: number, lesson_link: string, date_time: Date }> = 
            await this.knex("lessons")
                .select("order_id", "lesson_link", "date_time")
                .where("id", id);
        const orderData: Array<{ user_id: number }> = 
            await this.knex("orders")
                .select("user_id")
                .where("id", lessonData[0]["order_id"]);
        const userData: Array<{ username: string }> = 
            await this.knex("users")
                .select("username")
                .where("id", orderData[0]["user_id"]);
        const data = { 
            student: userData[0]["username"], 
            link: lessonData[0]["lesson_link"], 
            time: lessonData[0]["date_time"].toLocaleString("en-US") };
        return data;

    }

    async insertLessonLink(id: number, link: string) {
        return this.knex("lessons")
            .update({ 
                lesson_link: link 
            })
            .where("id", id);
    }

    async editLessonData(id: number, link: string, status: string) {
        return this.knex("lessons")
            .update({ 
                lesson_link: link, status: status 
            })
            .where("id", id);
    }

}