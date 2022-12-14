
import { Knex } from "knex";

export class StudentService {
    constructor(private knex: Knex) { }

    async getTeacherData() {
        const canBookingData: Array<{ id: number, username: string, teacher_image: string, weekday: string, booking_time: string }> =
            await this.knex("can_booking_table")
                .select(
                    "teachers.id",
                    "users.username",
                    "teachers.teacher_image",
                    "time_table.weekday",
                    "time_table.booking_time"
                )
                .innerJoin("teachers", "can_booking_table.teacher_id", "teachers.id")
                .innerJoin("users", "teachers.user_id", "users.id")
                .innerJoin("time_table", "can_booking_table.time_table_id", "time_table.id");
        const canBookingList = [];
        for (let data of canBookingData) {
            const weekdayTime: string = data["weekday"] + (data["booking_time"]).substring(0, 2);
            canBookingList.push({
                id: data["id"],
                name: data["username"],
                image: data["teacher_image"],
                bookingId: weekdayTime
            });
        }
        return canBookingList;
    }


    async selectBookedDate(id: number) {
        const bookedDate: Array<{ date_time: Date }> =
            await this.knex("lessons")
                .select("date_time")
                .where("teacher_id", id);
        return bookedDate;
    }


    async insertBookingData(userId: number, teacherId: number, dateTime: string) {
        const txn = await this.knex.transaction();
        try {
            const orderDataOfNowUse: Array<{ id: number, remaining_lesson_num: number }> =
                await txn("orders")
                    .select("id", "remaining_lesson_num")
                    .where("user_id", userId)
                    .andWhere("remaining_lesson_num", ">", 0).orderBy("created_at");
            if (orderDataOfNowUse.length === 0) {
                return false;
            }
            const newRemainingLessonNum = orderDataOfNowUse[0]["remaining_lesson_num"] - 1;
            await txn("orders")
                .update({
                    remaining_lesson_num: newRemainingLessonNum
                })
                .where("id", orderDataOfNowUse[0]["id"]);
            await txn("lessons")
                .insert({
                    order_id: orderDataOfNowUse[0]["id"],
                    date_time: dateTime,
                    status: "booking",
                    teacher_id: teacherId
                });
            await txn.commit();
            return true;
        }
        catch (err) {
            await txn.rollback();
            return false;
        }
    }

    async getShoppingRecord(id: number) {
        const priceRecord: Array<{ package_id: number }> =
            await this.knex("packages_prices")
                .select("package_id");
        let packagesRecord = [];
        for (let data of priceRecord) {
            const packagesData: Array<{ id: number, package_name: string, package_description: string, total_lesson_num: number, price: number }> =
                await this.knex("packages_prices")
                    .select(
                        "packages.id",
                        "packages.package_name",
                        "packages.package_description",
                        "packages.total_lesson_num",
                        "packages_prices.price",
                    )
                    .innerJoin("packages", "packages_prices.package_id", "=", "packages.id")
                    .where("packages_prices.activate_time", "<", this.knex.fn.now())
                    .andWhere("packages.id", "=", data["package_id"])
                    .orderBy("packages_prices.activate_time", "desc");
            packagesRecord.push({
                "packageId": packagesData[0]["id"],
                "packageName": packagesData[0]["package_name"],
                "packageDescription": packagesData[0]["package_description"],
                "packagePrice": packagesData[0]["price"],
                "totalLessonNum": packagesData[0]["total_lesson_num"]
            });
        }
        return packagesRecord;
    }

    async getOrderRecord(id: number) {
        const ordersRecord: Array<{ id: number, package_name: string, total_lesson_num: number, remaining_lesson_num: number, created_at: Date }> =
            await this.knex("orders")
                .select(
                    "orders.id",
                    "packages.package_name",
                    "orders.total_lesson_num",
                    "orders.remaining_lesson_num",
                    "orders.created_at"
                )
                .innerJoin("packages", "orders.package_id", "packages.id")
                .where("orders.user_id", id)
                .orderBy("orders.created_at", "desc");
        let ordersList = [];
        if (ordersRecord.length > 0) {
            for (let order of ordersRecord) {
                let orderDateTime = order["created_at"].toLocaleString("en-US");
                ordersList.push({
                    "orderId": order["id"],
                    "packageName": order["package_name"],
                    "totalLessonNum": order["total_lesson_num"],
                    "remainingLessonNum": order["remaining_lesson_num"],
                    "createdDate": orderDateTime
                });
            }
        }
        return ordersList;
    }


    async getOrderData(id: number) {
        const txn = await this.knex.transaction();
        try {
            const orderList: Array<{ package_name: string, total_lesson_num: number, remaining_lesson_num: number, created_at: Date }> =
                await txn("orders")
                    .select(
                        "packages.package_name",
                        "orders.total_lesson_num",
                        "orders.remaining_lesson_num",
                        "orders.created_at"
                    )
                    .innerJoin("packages", "orders.package_id", "packages.id")
                    .where("orders.id", id);
            const thisCreatedDate = orderList[0]["created_at"].toLocaleString("en-US");
            let thisOrder = [{
                "packageName": orderList[0]["package_name"],
                "totalLessonNum": orderList[0]["total_lesson_num"],
                "remainingLessonNum": orderList[0]["remaining_lesson_num"],
                "createdDate": thisCreatedDate
            }];

            const lessonInOrders: Array<{ first_name: string, date_time: Date, status: string }> =
                await txn("teachers")
                    .select("users.first_name", "lessons.date_time", "lessons.status")
                    .innerJoin("lessons", "teachers.id", "lessons.teacher_id")
                    .innerJoin("users", "teachers.user_id", "users.id")
                    .where("lessons.order_id", id)
                    .orderBy("lessons.date_time");
            let lessonList = [];
            if (lessonInOrders.length > 0) {
                for (let lesson of lessonInOrders) {
                    const thisLessonDate = lesson["date_time"].toLocaleString("en-US");
                    lessonList.push({
                        "teacherName": lesson["first_name"],
                        "lessonDate": thisLessonDate,
                        "lessonStatus": lesson["status"]
                    });
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
        const packageData: Array<{ price: number }> =
            await this.knex("packages_prices")
                .select("price")
                .where("package_id", id)
                .andWhere("activate_time", "<", this.knex.fn.now())
                .orderBy("activate_time", "desc");
        if (packageData.length > 0) {
            return packageData[0]["price"];
        } else {
            return null;
        }
    }


    async insertNewOrder(userId: number, packageId: number) {
        const packageData: Array<{ total_lesson_num: number }> =
            await this.knex("packages")
                .select("total_lesson_num")
                .where("id", packageId);
        return await this.knex("orders")
            .insert({
                package_id: packageId,
                total_lesson_num: packageData[0]["total_lesson_num"],
                remaining_lesson_num: packageData[0]["total_lesson_num"],
                user_id: userId
            });
    }


    async getLessonForStudent(id: number, upLimitDay: Date, downLimitDay: Date) {
        const allLessonData: Array<{ first_name: string, lesson_link: string, date_time: Date }> =
            await this.knex("lessons")
                .select("users.first_name", "lessons.lesson_link", "lessons.date_time")
                .innerJoin("orders", "lessons.order_id", "orders.id")
                .innerJoin("teachers", "lessons.teacher_id", "teachers.id")
                .innerJoin("users", "teachers.user_id", "users.id")
                .where("orders.user_id", id)
                .andWhere("lessons.date_time", ">", downLimitDay)
                .andWhere("lessons.date_time", "<", upLimitDay)
                .orderBy("lessons.date_time");
        const lessonData = [];
        for (let lesson of allLessonData) {
            lessonData.push({
                teacher: lesson["first_name"],
                learningDate: lesson["date_time"].toLocaleString("en-US"),
                lessonLink: lesson["lesson_link"]
            });
        }
        return lessonData;
    }


    async getLessonData(link: string) {
        const lessonData: Array<{ first_name: string, date_time: Date }> =
            await this.knex("teachers")
                .select("users.first_name", "lessons.date_time")
                .innerJoin("users", "teachers.user_id", "users.id")
                .innerJoin("lessons", "teachers.id", "lessons.teacher_id")
                .where("lessons.lesson_link", link);
        const data = {
            teacher: lessonData[0]["first_name"],
            time: lessonData[0]["date_time"].toLocaleString("en-US")
        };
        return data;
    }
}