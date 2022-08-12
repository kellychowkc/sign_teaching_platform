
import { Request, Response } from "express";
import { StudentService } from "../service/studentService";
import { logger } from "../utility/logger";

export class StudentController {
    constructor(private studentService: StudentService) { }

    displayTeacher = async (req: Request, res: Response) => {
        try {
            const teacherData = await this.studentService.getTeacherData();
            if (teacherData.length > 0) {
                res.status(200).json({ success: true, message: teacherData })
            } else {
                res.status(200).json({ success: false, message: "Not Teacher Data" })
            }
        }
        catch (err) {
            logger.error(err.toString());
            res.status(400).json({ success: false, message: "Edit Error" })
            return;
        }
    }


    getCanBookDate = async (req: Request, res: Response) => {
        try {
            const teacherId = parseInt(req.body["id"] as string, 10);
            const weekday = req.body["weekday"] as string;
            const bookingTime = req.body["time"] as string;
            const bookedDate = await this.studentService.selectBookedDate(teacherId);
            const dateListOfThisWeekday = [];
            const date = new Date();
            let i = 0;
            while (i <= 90) {
                date.setDate(date.getDate() + 1);
                const thatWeekday = date.toLocaleDateString('en-US', { weekday: 'long' });
                if (thatWeekday === weekday) {
                    dateListOfThisWeekday.push(date.toLocaleDateString('en-US'));
                }
                i++
            }
            let canBookingDate = dateListOfThisWeekday;
            for (let date of bookedDate) {
                const selectDate = date["date_time"];
                const bookedDate = selectDate.toLocaleDateString('en-US');
                const bookedWeekday = selectDate.toLocaleDateString('en-US', { weekday: 'long' });
                const bookedHour = selectDate.getHours().toString().padStart(2, "0");
                if ((bookedWeekday === weekday) && (bookedHour === bookingTime)) {
                    canBookingDate = canBookingDate.filter(date => date !== bookedDate);
                }
            }
            res.status(200).json({ success: true, message: canBookingDate });
        }
        catch (err) {
            logger.error(err.toString());
            res.status(400).json({ success: false, message: "Select Error" })
            return;
        }
    }


    insertBookingLesson = async (req: Request, res: Response) => {
        try {
            const userId = parseInt(req.session["user"].id as string, 10);
            const teacherId = parseInt(req.body["id"] as string, 10);
            const bookingDate = req.body["date"] as string;
            const bookingTime = req.body["time"] as string;
            const bookingDateTime = bookingDate + " " + bookingTime;
            const bookedResult = await this.studentService.insertBookingData(userId, teacherId, bookingDateTime);
            if (bookedResult === true) {
                res.status(200).json({ success: true, message: "Already Booked" });
                return;
            } else {
                res.status(200).json({ success: false, message: "Booking Fail" });
                return;
            }
        }
        catch (err) {
            logger.error(err.toString());
            res.status(400).json({ success: false, message: "Insert Error" })
            return;
        }
    }


    displayShoppingRecord = async (req: Request, res: Response) => {
        try {
            const userId = parseInt(req.session["user"].id as string, 10);
            const shoppingRecord = await this.studentService.getShoppingRecord(userId);
            res.status(200).json({ success: true, message: shoppingRecord });
        }
        catch (err) {
            logger.error(err.toString());
            res.status(400).json({ success: false, message: "Display Error" })
            return;
        }
    }


    displayOrderRecord = async (req: Request, res: Response) => {
        try {
            const userId = parseInt(req.session["user"].id as string, 10);
            const orderRecord = await this.studentService.getOrderRecord(userId);
            res.status(200).json({ success: true, message: orderRecord });
        }
        catch (err) {
            logger.error(err.toString());
            res.status(400).json({ success: false, message: "Display Error" })
            return;
        }
    }


    displayOrderData = async (req: Request, res: Response) => {
        try {
            const orderId = parseInt(req.body["id"] as string, 10);
            const orderData = await this.studentService.getOrderData(orderId);
            if (orderData) {
                const thisOrderData = orderData.thisOrder;
                const lessonDataInOrder = orderData.lessonList;
                if (lessonDataInOrder.length === 0) {
                    res.status(200).json({ success: true, message: { "order": thisOrderData } });
                } else {
                    res.status(200).json({ success: true, message: { "order": thisOrderData, "lessonList": lessonDataInOrder } });
                }
            }
        }
        catch (err) {
            logger.error(err.toString());
            res.status(400).json({ success: false, message: "Display Error" })
            return;
        }
    }


    toPayPal = async (req: Request, res: Response) => {
        try {
            const packageId = parseInt(req.query["id"] as string, 10);
            const packagePrice = await this.studentService.getPackagePrice(packageId);
            if (packagePrice !== null) {
                res.status(200).json({ success: true, message: { "price": packagePrice } });
            } else {
                res.status(400).json({ success: false, message: "Cannot Found Price" })
            }
        }
        catch (err) {
            logger.error(err.toString());
            res.status(400).json({ success: false, message: "PayPal Error" })
            return;
        }
    }


    addNewOrder = async (req: Request, res: Response) => {
        try {
            const userId = parseInt(req.session["user"].id as string, 10);
            const packageId = parseInt(req.query["id"] as string, 10);
            const addOrder = await this.studentService.insertNewOrder(userId, packageId);
            if (addOrder) {
                res.status(200).json({ success: true, message: "Add New Order" });
            }
        }
        catch (err) {
            logger.error(err.toString());
            res.status(400).json({ success: false, message: "Add Order Error" })
            return;
        }
    }


    displayLessonForStudent = async (req: Request, res: Response) => {
        try {
            const userId = parseInt(req.session["user"].id as string, 10);
            const lessonData = await this.studentService.getLessonLinkForStudent(userId);
            res.status(200).json({ success: true, message: lessonData });
        }
        catch (err) {
            logger.error(err.toString());
            res.status(400).json({ success: false, message: "Display Error" })
            return;
        }
    }


    displayLessonData = async (req: Request, res: Response) => {
        try {
            const lessonLink = req.body["link"] as string;
            const lessonData = await this.studentService.getLessonData(lessonLink);
            res.status(200).json({ success: true, message: lessonData});
        }
        catch (err) {
            logger.error(err.toString());
            res.status(400).json({ success: false, message: "Display Error" })
            return;
        }
    }
}

