import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { TeacherService } from "../service/teacherService";
import { logger } from "../utility/logger";
import { teacherImage } from "../utility/uploadTeacherImage";

export class TeacherController {
    constructor(private teacherService: TeacherService) { }

    displayTeacherInfo = async (req: Request, res: Response) => {
        try {
            const userId = parseInt(req.session["user"].id as string, 10);
            const data = await this.teacherService.getTeacherInfo(userId);
            if (data) {
                res.status(200).json({ success: true, message: data });
            }
        } catch (err) {
            logger.error(err.toString());
            res.status(400).json({ success: false, message: "Display Error" });
            return;
        }
    }

    editTeacherInfo = async (req: Request, res: Response) => {
        teacherImage.parse(req, async (err, fields, files) => {
            try {
                const userId = parseInt(req.session["user"].id as string, 10);
                const fname = fields["fname"] as string;
                const lname = fields["lname"] as string;
                const email = fields["email"] as string;
                const phoneNum = parseInt(fields["phoneNum"] as string, 10);
                const description = fields["description"] as string;
                const oldPass = fields?.["oldPass"] as string;
                const newPass = fields?.["newPass"] as string;
                const image = files["image"]?.["newFilename"] as string;
                const editInfoResult = await this.teacherService.editTeacherInfo(userId, fname, lname, email, phoneNum, description);
                let editImageResult;
                let editPassResult;
                if (oldPass && newPass) {
                    editPassResult = await this.teacherService.editTeacherPass(userId, oldPass, newPass);
                }
                if (files["image"]) {
                    const oldImage = await this.teacherService.editTeacherImage(userId, image);
                    if (oldImage) {
                        if (oldImage !== "teacher_icon.png") {
                            fs.unlink(path.join(__dirname, `../private/assets/usersImages/${oldImage}`), (err) => {
                                if (err) {
                                    logger.error(err.toString());
                                    throw err;
                                }
                            });
                        }
                        editImageResult = true;
                    }
                }
                
                if (editInfoResult === true) {
                    if (files["image"] && oldPass) {
                        if (editImageResult === true && editPassResult === true) {
                            res.status(200).json({ success: true, message: "Edit Success" });
                            return;
                        } else {
                            res.status(400).json({ success: false, message: "Edit Unsuccess" })
                            return;
                        }
                    } else if (files["image"] || oldPass) {
                        if (editImageResult === true || editPassResult === true) {
                            res.status(200).json({ success: true, message: "Edit Success" });
                            return;
                        } else {
                            res.status(400).json({ success: false, message: "Edit Unsuccess" })
                            return;
                        }
                    } else {
                        res.status(200).json({ success: true, message: "Edit Success" });
                        return;
                    }
                } else {
                    res.status(400).json({ success: false, message: "Edit Unsuccess" })
                    return;
                }
            } catch (err) {
                logger.error(err.toString());
                res.status(400).json({ success: false, message: "Edit Error" });
                return;
            }
        })
    }


    displayCanTeachingTime = async (req: Request, res: Response) => {
        try {
            const userId = parseInt(req.session["user"].id as string, 10);
            const timeList = await this.teacherService.getCanTeachingTime(userId);
            let result = [];
            if (timeList.length > 0) {
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

    editCanTeachingTime = async (req: Request, res: Response) => {
        try {
            const userId = parseInt(req.session["user"].id as string, 10);
            const weekdayData = req.body.weekdayData as string;
            const timeData = (req.body.timeData as string) + ":00:00";
            const result = await this.teacherService.editCanTeachingTime(userId, weekdayData, timeData);
            if (result === true) {
                res.status(200).json({ success: true, message: "Edit Success" });
            } else {
                res.status(400).json({ success: false, message: "Edit Unsuccess" });
            }
        } catch (err) {
            logger.error(err.toString());
            res.status(400).json({ success: false, message: "Edit Error" });
            return;
        }
    };


    displayTeachingRecord = async (req: Request, res: Response) => {
        try {
            const userId = parseInt(req.session["user"].id as string, 10);
            const teachingRecord = await this.teacherService.getTeachingRecord(userId);
            res.status(200).json({ success: true, message: teachingRecord });
        } catch (err) {
            logger.error(err.toString());
            res.status(400).json({ success: false, message: "Display Error" });
            return;
        }
    };


    displayLessonForTeacher = async (req: Request, res: Response) => {
        try {
            const userId = parseInt(req.session["user"].id as string, 10);
            const today = new Date(Date.now());
            const upLimitDay = new Date(today.setDate(today.getDate() + 90));
            const downLimitDay = new Date(today.setDate(today.getDate() - 90));
            const lessonData = await this.teacherService.getLessonForTeacher(userId, upLimitDay, downLimitDay);
            res.status(200).json({ success: true, message: lessonData });
        } catch (err) {
            logger.error(err.toString());
            res.status(400).json({ success: false, message: "Display Error" });
            return;
        }
    }


    displayThatLessonData = async (req: Request, res: Response) => {
        try {
            const lessonId = parseInt(req.body["id"] as string, 10);
            const result = await this.teacherService.getThatLessonData(lessonId);
            res.status(200).json({ success: true, message: result });
        } catch (err) {
            logger.error(err.toString());
            res.status(400).json({ success: false, message: "Display Error" });
            return;
        }
    }

    createLessonLink = async (req: Request, res: Response) => {
        try {
            const lessonId = parseInt(req.body["id"] as string, 10);
            const lessonLink = await req.body["link"] as string;
            const result = await this.teacherService.insertLessonLink(lessonId, lessonLink);
            if (result === true) {
                res.status(200).json({ success: true, message: "Edit Success" });
            } else {
                res.status(400).json({ success: false, message: "Edit Unsuccess" });
            }
        } catch (err) {
            logger.error(err.toString());
            res.status(400).json({ success: false, message: "Create Error" });
            return;
        }
    }


    editLessonData = async (req: Request, res: Response) => {
        try {
            const lessonId = parseInt(req.body["id"] as string, 10);
            const lessonLink = req.body["link"] as string;
            const lessonStatus = req.body["status"] as string;
            if (lessonLink) {
                const result = await this.teacherService.editLessonData(lessonId, lessonLink, lessonStatus);
                if (result) {
                    res.status(200).json({ success: true, message: "Edit Success" });
                } else {
                    res.status(400).json({ success: false, message: "Edit Unsuccess" });
                }
            }
        } catch (err) {
            logger.error(err.toString());
            res.status(400).json({ success: false, message: "Edit Error" })
            return;
        }
    }
}
