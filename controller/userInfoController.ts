
import { Request, Response } from "express";
import { UserInfoService } from "../service/userInfoService";
import { logger } from "../utility/logger";
import { User } from "../utility/models";




export class UserInfoController {
    constructor(private userInfoService: UserInfoService) { }

    checkIdentity = (req: Request, res: Response) => {
        try {
            if (req.session["user"]) {
                const identity = req.session["user"].identity as string;
                res.status(200).json({ success: true, message: identity });
            }
        }
        catch (err) {
            logger.error(err.toString());
            res.status(400).json({ success: false, message: "Identity Error" })
            return;
        }
    }



    displayUserInfo = async (req: Request, res: Response) => {
        try {
            console.log(req.session["user"])
            const userId = parseInt(req.session["user"].id as string, 10);
            const userData: User[] = await this.userInfoService.getUserData(userId);
            if (userData.length === 0) {
                res.status(401).json({ success: false, message: "Not This User" });
                return;
            }
            const userInfo = { "username": userData[0]["username"], "firstName": userData[0]["first_name"], "lastName": userData[0]["last_name"], "email": userData[0]["email"], "phoneNum": userData[0]["phone_num"] };
            res.status(200).json(userInfo);
        }
        catch (err) {
            logger.error(err.toString());
            res.status(400).json({ success: false, message: "Display Error" })
            return;
        }
    }



    editUserInfo = async (req: Request, res: Response) => {
        try {
            const userId = parseInt(req.session["user"].id as string, 10);
            const username = req.session["user"].username as string;
            const newData = req.body as User;
            const result = await this.userInfoService.editUserInfo(userId, username, newData);
            if (result === false) {
                res.status(400).json({ success: false, message: "Edit Error" });
                return;
            } else {
                res.status(200).json({ success: true, message: "Edit Success" });
            }
        }
        catch (err) {
            logger.error(err.toString());
            res.status(400).json({ success: false, message: "Edit Error" })
            return;
        }
    }



    editUserPassword = async (req: Request, res: Response) => {
        try {
            const userId = parseInt(req.session["user"].id as string, 10);
            const oldPassword = req.body.oldPassword as string;
            const newPassword = req.body.newPassword as string;
            const result = await this.userInfoService.editUserPassword(userId, oldPassword, newPassword);
            if (result === false) {
                res.status(400).json({ success: false, message: "Edit Error" });
                return;
            } else {
                res.status(200).json({ success: true, message: "Edit Success" });
            }
        }
        catch (err) {
            logger.error(err.toString());
            res.status(400).json({ success: false, message: "Edit Error" })
            return;
        }
    }



    displayTeacherTime = async (req: Request, res: Response) => {
        try {
            const userId = parseInt(req.session["user"].id as string, 10);
            const timeList = await this.userInfoService.getTeacherTimeList(userId) as Array<{ weekday: string, time: string }>;
            let result = [];
            for (let i = 0; i < timeList.length; i++) {
                const timeHour = (timeList[i].time).substring(0, 2);
                const bookClass = timeList[i].weekday + timeHour;
                result.push(bookClass);
            }
            res.status(200).json({ success: true, message: result });
        }
        catch (err) {
            logger.error(err.toString());
            res.status(400).json({ success: false, message: "Display Error" })
            return;
        }
    }



    editTeacherTime = async (req: Request, res: Response) => {
        try {
            const userId = parseInt(req.session["user"].id as string, 10);
            const weekdayData = req.body.weekdayData as string;
            const timeData = req.body.timeData as string + ":00:00";
            const result = await this.userInfoService.editTeacherTimeList(userId, weekdayData, timeData);
            if (result === true) {
                res.status(200).json({ success: true, message: "Edit Success" });
            }
        }
        catch (err) {
            logger.error(err.toString());
            res.status(400).json({ success: false, message: "Edit Error" })
            return;
        }
    }


    displayTeacher = async (req: Request, res: Response) => {
        try {
            const teacherData = await this.userInfoService.getTeacherData();
            if (teacherData) {
                res.status(200).json({ success: true, message: teacherData })
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
            const thisWeekday = weekday.substring(0, 1).toUpperCase() + weekday.substring(1,);
            const bookingTime = req.body["time"] as string;

            const bookedDate = await this.userInfoService.selectBookedDate(teacherId);

            const canBookingDateList = [];
            const date = new Date();
            let i = 0;
            while (i <= 90) {
                date.setDate(date.getDate() + 1);
                const thatWeekday = date.toLocaleDateString('en-US', { weekday: 'long' });
                if (thatWeekday === thisWeekday) {
                    canBookingDateList.push(date.toLocaleDateString('en-US'));
                }
                i++
            }
            for (let date of bookedDate) {
                const selectDate = new Date(date["date_time"]);
                const bookedWeekday = selectDate.toLocaleDateString('en-US', { weekday: 'long' });
                const bookedHour = selectDate.getHours().toString().padStart(2, "0");
                if ((bookedWeekday === thisWeekday) && (bookedHour === bookingTime)) {
                    canBookingDateList.filter(date => date !== selectDate.toLocaleDateString("en-US"));
                }
            }
            res.status(200).json({ success: true, message: canBookingDateList });
        }
        catch (err) {
            logger.error(err.toString());
            res.status(400).json({ success: false, message: "Select Error" })
            return;
        }
    }



    insertBookingLesson = async (req: Request, res: Response) => {
        try {
            const teacherId = parseInt(req.body.id as string, 10);
            const bookingDate = req.body.date as string;
            const bookingTime = req.body.time as string;
            const bookingDateTime = bookingDate + " " + bookingTime;
            const bookedResult = await this.userInfoService.insertBookingData(teacherId, bookingDateTime);
            if (bookedResult === true) {
                res.status(200).json({ success: true, message: "Already Booked" });
            } else {
                res.status(400).json({ success: false, message: "Booking Fail" });
                return;
            }
        }
        catch (err) {
            logger.error(err.toString());
            res.status(400).json({ success: false, message: "Insert Error" })
            return;
        }
    }


    displayTeacherImage = async (req: Request, res: Response) => {
        try {
            const userId = parseInt(req.session["user"].id as string, 10);
            const teacherData = await this.userInfoService.getTeacherImage(userId);
            res.status(200).json({ success: true, message: teacherData });
        }
        catch (err) {
            logger.error(err.toString());
            res.status(400).json({ success: false, message: "Select Error" })
            return;
        }
    }


    // editTeacherImage = (req: Request, res: Response) => {
    //     form.parse(req, async (err, fields, files) => {
    //         try {
    //             const userId = parseInt(req.session["user"].id as string, 10);
    //             const imageTitle = files.image["newFilename"] as string;
    //             const oldImage = await this.userInfoService.editTeacherImage(userId, imageTitle);
    //             if (oldImage) {
    //                 if (oldImage !== "teacher_icon.png") {
    //                     fs.unlink(path.join(__dirname, `../assets/usersImages/${oldImage}`), (err) => {
    //                         if (err) {
    //                             logger.error(err.toString());
    //                             throw err;
    //                         }
    //                     });
    //                 }
    //             }
    //             res.status(200).json({ success: true, message: "Edit success" });
    //         }
    //         catch (err) {
    //             logger.error(err.toString());
    //             res.status(400).json({ success: false, message: "Edit Error" })
    //             return;
    //         }
    //     })
    // }

}

