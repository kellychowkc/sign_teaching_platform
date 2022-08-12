
import { Knex } from "knex";

export class StudentService {
    constructor(private knex: Knex) { }

    async getTeacherData() {
        const txn = await this.knex.transaction();
        try {
            const bookingData: Array<{ teacher_id: number, time_table_id: number }> = await txn("can_booking_table").select("teacher_id", "time_table_id");
            const canBookingList = [];
            for (let data of bookingData) {
                // get teacher Image and first name
                const teacherData: Array<{ teacher_image: string, user_id: number }> = await txn("teachers").select("teacher_image", "user_id").where("id", data["teacher_id"]);
                const userData: Array<{ first_name: string }> = await txn("users").select("first_name").where("id", teacherData[0]["user_id"]);
                // get weekday and time of teacher that can be booking 
                const timeTableData: Array<{ weekday: string, booking_time: string }> = await txn("time_table").select("weekday", "booking_time").where("id", data["time_table_id"]);
                const bookingDayTime: string = timeTableData[0]["weekday"] + (timeTableData[0]["booking_time"]).substring(0, 2);
                canBookingList.push({ "id": data["teacher_id"], "name": userData[0]["first_name"], "image": teacherData[0]["teacher_image"], "bookingId": bookingDayTime });
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
        const bookedDate: Array<{ date_time: Date }> = await this.knex("lessons").select("date_time").where("teacher_id", id);
        return bookedDate;
    }


    async insertBookingData(userId: number, teacherId: number, dateTime: string) {
        const txn = await this.knex.transaction();
        try {
            const orderDataOfNowUse: Array<{ id: number, remaining_lesson_num: number }> = await txn("orders").select("id", "remaining_lesson_num").where("user_id", userId).andWhere("remaining_lesson_num", ">", 0).orderBy("created_at");
            if (orderDataOfNowUse.length === 0) {
                return false;
            }
            const newRemainingLessonNum = orderDataOfNowUse[0]["remaining_lesson_num"] - 1;
            await txn("orders").update({ remaining_lesson_num: newRemainingLessonNum }).where("id", orderDataOfNowUse[0]["id"]);
            await txn("lessons").insert({ order_id: orderDataOfNowUse[0]["id"], date_time: dateTime, status: "booking", teacher_id: teacherId });
            await txn.commit();
            return true;
        }
        catch (err) {
            await txn.rollback();
            return false;
        }
    }

    async getShoppingRecord(id: number) {
        const txn = await this.knex.transaction();
        try {
            const priceRecord: Array<{ package_id: number, max: Date }> = await txn("packages_prices")
                .select("package_id")
                .groupBy("package_id")
                .max("activate_time");
            let packagesRecord = [];
            for (let data of priceRecord) {
                const packagesData: Array<{ id: number, package_name: string, package_description: string, total_lesson_num: number, price: number }> = await txn("packages_prices")
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
                    packagesList.push({ "packageId": packages[0]["id"], "packageName": packages[0]["package_name"], "packageDescription": packages[0]["package_description"], "packagePrice": packages[0]["price"], "totalLessonNum": packages[0]["total_lesson_num"] });
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
        const ordersRecord: Array<{ id: number, package_name: string, total_lesson_num: number, remaining_lesson_num: number, created_at: Date }> = await this.knex("orders")
            .innerJoin("packages", "orders.package_id", "=", "packages.id")
            .select("orders.id",
                "packages.package_name",
                "orders.total_lesson_num",
                "orders.remaining_lesson_num",
                "orders.created_at")
            .where("orders.user_id", id)
            .orderBy("orders.created_at", "desc");
        let ordersList = [];
        if (ordersRecord.length > 0) {
            for (let order of ordersRecord) {
                let orderDateTime = order["created_at"].toLocaleString("en-US");
                ordersList.push({ "orderId": order["id"], "packageName": order["package_name"], "totalLessonNum": order["total_lesson_num"], "remainingLessonNum": order["remaining_lesson_num"], "createdDate": orderDateTime });
            }
        }
        return ordersList;
    }


    async getOrderData(id: number) {
        const txn = await this.knex.transaction();
        try {
            const orderList: Array<{ package_name: string, total_lesson_num: number, remaining_lesson_num: number, created_at: Date }> = await txn("orders")
                .select("packages.package_name", "orders.total_lesson_num", "orders.remaining_lesson_num", "orders.created_at")
                .innerJoin("packages", "orders.package_id", "=", "packages.id")
                .where("orders.id", id);
            const thisCreatedDate = orderList[0]["created_at"].toLocaleString("en-US");
            let thisOrder = [{ "packageName": orderList[0]["package_name"], "totalLessonNum": orderList[0]["total_lesson_num"], "remainingLessonNum": orderList[0]["remaining_lesson_num"], "createdDate": thisCreatedDate }]

            const lessonInOrders: Array<{ first_name: string, date_time: Date, status: string }> = await txn("teachers")
                .select("users.first_name", "lessons.date_time", "lessons.status")
                .innerJoin("lessons", "teachers.id", "=", "lessons.teacher_id")
                .innerJoin("users", "teachers.user_id", "=", "users.id")
                .where("lessons.order_id", id)
                .orderBy("lessons.date_time");
            let lessonList = [];
            if (lessonInOrders.length > 0) {
                for (let lesson of lessonInOrders) {
                    const thisLessonDate = lesson["date_time"].toLocaleString("en-US");
                    lessonList.push({ "teacherName": lesson["first_name"], "lessonDate": thisLessonDate, "lessonStatus": lesson["status"] });
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
            const matchId = packageData.find(data => data["package_id"] === id);
            if (matchId) {
                const nowPrice: Array<{ price: number }> = await txn("packages_prices").select("price").where("activate_time", "=", matchId["max"]).andWhere("package_id", "=", matchId["package_id"]);
                price = nowPrice[0]["price"];
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
            await txn("orders").insert({ package_id: packageId, total_lesson_num: packageData[0]["total_lesson_num"], remaining_lesson_num: packageData[0]["total_lesson_num"], user_id: userId });
            await txn.commit();
            return true;
        }
        catch (err) {
            await txn.rollback();
            return false;
        }
    }

    
    async getLessonLinkForStudent(id: number) {
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