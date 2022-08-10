
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

    // Teacher
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

    async getTeachingRecord(id: number) {
        const txn = await this.knex.transaction();
        try {
            const teacherData: Array<{ id: number }> = await txn.select("id").from("teachers").where("user_id", id);
            const lessonOfTeaching: Array<{ order_id: number, date_time: Date, status: string }> = await txn.select("order_id", "date_time", "status").from("orders").where("teacher_id", teacherData[0].id);
            let eachLesson = [];
            for (let lesson of lessonOfTeaching) {
                const studentData: Array<{ user_id: number }> = await txn.select("user_id").from("orders").where("id", lesson["order_id"]);
                const student: Array<{ username: string }> = await txn.select("username").from("users").where("id", studentData[0]["user_id"]);
                const studentOfTeaching = { "studentName": student[0]["username"], "teachingDate": lesson["date_time"], "status": lesson["status"] };
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



    // Student
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
                canBookingList.push({ "id": data["teacher_id"] as number, "name": userData[0]["first_name"] as string, "image": teacherData[0]["teacher_image"] as string, "bookingId": bookingDayTime });
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

    async getShoppingRecord(id: number) {
        const txn = await this.knex.transaction();
        try {
            const priceRecord = await txn("packages_prices")
                .select("package_id")
                .groupBy("package_id")
                .max("activate_time");
            let packagesRecord = [];
            for (let data of priceRecord) {
                const packagesData = await txn("packages_prices")
                    .innerJoin("packages", "packages_prices.package_id", "=", "packages.id")
                    .select("packages.id",
                        "packages.package_name",
                        "packages.package_description",
                        "packages.total_lesson_num",
                        "packages_prices.price",
                        "packages_prices.activate_time")
                    .where("packages_prices.activate_time", "=", data["max"])
                    .andWhere("packages.id", "=", data["package_id"]);
                packagesRecord.push(packagesData);
            }
            let packagesList = [];

            if (packagesRecord.length > 0) {
                for (let packages of packagesRecord) {
                    packagesList.push({ "packageId": packages[0]["id"] as number, "packageName": packages[0]["package_name"] as string, "packageDescription": packages[0]["package_description"] as string, "packagePrice": packages[0]["price"] as number, "totalLessonNum": packages[0]["total_lesson_num"] as number });
                }
            }
            await txn.commit();
            return packagesList;
        }
        catch (err) {
            await txn.rollback();
            return;
        }
    }

    async getOrderRecord(id: number) {
        const ordersRecord = await this.knex("orders")
            .innerJoin("packages", "orders.package_id", "=", "packages.id")
            .select("orders.id",
                "packages.package_name",
                "orders.total_lesson_num",
                "orders.remaining_lesson_num",
                "orders.created_at")
            .where("orders.user_id", id);
        let ordersList = [];
        if (ordersRecord.length > 0) {
            for (let order of ordersRecord) {
                ordersList.push({ "orderId": order["id"] as number, "packageName": order["package_name"] as string, "totalLessonNum": order["total_lesson_num"] as number, "remainingLessonNum": order["remainingLessonNum"] as number, "createdDate": order["created_at"] as Date });
            }
        }
        return ordersList;
    }


    async getOrderData(id: number) {
        const txn = await this.knex.transaction();
        try {
            const orderList = await txn("orders")
                .select("packages.package_name", "orders.total_lesson_num", "orders.remaining_lesson_num", "orders.created_at")
                .innerJoin("packages", "orders.package_id", "=", "packages.id")
                .where("orders.id", id);
            let thisOrder = [{ "packageName": orderList[0]["package_name"] as string, "totalLessonNum": orderList[0]["total_lesson_num"] as number, "remainingLessonNum": orderList[0]["remaining_lesson_num"] as number, "createdDate": orderList[0]["created_at"] as Date }]

            const lessonInOrders = await txn("teachers")
                .select("users.first_name", "lessons.date_time", "lessons.status")
                .innerJoin("lessons", "teachers.id", "=", "lessons.teacher_id")
                .innerJoin("users", "teachers.user_id", "=", "users.id")
                .where("lessons.order_id", id);
            let lessonList = [];
            if (lessonInOrders.length > 0) {
                for (let lesson of lessonInOrders) {
                    lessonList.push({ "teacherName": lesson["first_name"] as string, "lessonDate": lesson["date_time"] as Date, "lessonStatus": lesson["status"] as string });
                }
            }
            const result = { thisOrder, lessonList };
            await txn.commit();
            return result;
        }
        catch (err) {
            await txn.rollback();
            return;
        }
    }


    async getPackagePrice(id: number) {
        const txn = await this.knex.transaction();
        try {
            let price = 0;
            const packageData: Array<{ package_id: number, max: Date }> = await txn("packages_prices").select("package_id").groupBy("package_id").max("activate_time");
            for (let data of packageData) {
                console.log(data, id)
                if (data["package_id"] === id) {
                    const nowPrice: Array<{ price: number }> = await txn("packages_prices").select("price").where("activate_time", "=", data["max"]).andWhere("package_id", "=", data["package_id"]);
                    price = nowPrice[0].price;
                }
            }
            await txn.commit();
            return price;
        }
        catch (err) {
            await txn.rollback();
            return;
        }
    }


    async insertNewOrder(userId: number, packageId: number) {
        const txn = await this.knex.transaction();
        try {
            const packageData: Array<{ total_lesson_num: number }> = await txn("packages").select("total_lesson_num").where("id", packageId);
            const NumOfLesson = packageData[0]["total_lesson_num"];
            await txn("orders").insert({ package_id: packageId, total_lesson_num: NumOfLesson, remaining_lesson_num: NumOfLesson, user_id: userId });
            await txn.commit();
            return true;
        }
        catch (err) {
            await txn.rollback();
            return false;
        }
    }
}