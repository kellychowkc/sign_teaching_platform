import { Request, Response } from "express";
// import fs from "fs";
// import path from "path";
import { TeacherService } from "../service/teacherService";
import { logger } from "../utility/logger";
import { teacherImage } from "../utility/uploadTeacherImage";

export class TeacherController {
    constructor(private teacherService: TeacherService) { }

    displayTeacherTime = async (req: Request, res: Response) => {
        try {
            const userId = parseInt(req.session["user"].id as string, 10);
            const timeList = await this.teacherService.getTeacherTimeList(userId);
            console.log(timeList);
            let result = [];
            if (timeList) {
                for (let data of timeList) {
                    const timeHour = data["time"].substring(0, 2);
                    const bookClass = data["weekday"] + timeHour;
                    result.push(bookClass);
                }
            }
            res.status(200).json({ success: true, message: result });
        } catch (err) {
            logger.error(err.toString());
            res.status(400).json({ success: false, message: "Display Error" });
            return;
        }
    };

    editTeacherTime = async (req: Request, res: Response) => {
        try {
            const userId = parseInt(req.session["user"].id as string, 10);
            const weekdayData = req.body.weekdayData as string;
            const timeData = (req.body.timeData as string) + ":00:00";
            const result = await this.teacherService.editTeacherTimeList(userId, weekdayData, timeData);
            if (result === true) {
                res.status(200).json({ success: true, message: "Edit Success" });
            }
        } catch (err) {
            logger.error(err.toString());
            res.status(400).json({ success: false, message: "Edit Error" });
            return;
        }
    };

    displayTeacherImage = async (req: Request, res: Response) => {
        try {
            const userId = parseInt(req.session["user"].id as string, 10);
            const teacherData = await this.teacherService.getTeacherImage(userId);
            res.status(200).json({ success: true, message: teacherData });
        } catch (err) {
            logger.error(err.toString());
            res.status(400).json({ success: false, message: "Select Error" });
            return;
        }
    };

    editTeacherData = (req: Request, res: Response) => {
        teacherImage.parse(req, async (err, fields, files) => {
            try {
                // const userId = parseInt(req.session["user"].id as string, 10);
                // const description = fields?.["description"] as string;
                const imageTitle = files["image"];
                console.log(imageTitle)
                // if (description) {
                //     await this.teacherService.editTeacherDescription(userId, description);
                // }
                // if (imageTitle) {
                //     const oldImage = await this.teacherService.editTeacherImage(userId, imageTitle);
                //     if (oldImage) {
                //         if (oldImage !== "teacher_icon.png") {
                //             fs.unlink(path.join(__dirname, `../assets/usersImages/${oldImage}`), (err) => {
                //                 if (err) {
                //                     logger.error(err.toString());
                //                     throw err;
                //                 }
                //             });
                //         }
                //     }
                // }
                // res.status(200).json({ success: true, message: "Edit success" });
            }
            catch (err) {
                logger.error(err.toString());
                res.status(400).json({ success: false, message: "Edit Error" })
                return;
            }
        })
    }

    displayTeachingRecord = async (req: Request, res: Response) => {
        try {
            const userId = parseInt(req.session["user"].id as string, 10);
            const teachingRecord = await this.teacherService.getTeachingRecord(userId);
            if (teachingRecord) {
                res.status(200).json({ success: true, message: teachingRecord });
            } else {
                res.status(400).json({ success: true, message: "No Teaching Record" });
            }
        } catch (err) {
            logger.error(err.toString());
            res.status(400).json({ success: false, message: "Display Error" });
            return;
        }
    };
}
