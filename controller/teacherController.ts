import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { TeacherService } from "../service/teacherService";
import { hashPassword } from "../utility/hash";
import { logger } from "../utility/logger";
import { teacherImage } from "../utility/uploadTeacherImage";

export class TeacherController {
    constructor(private teacherService: TeacherService) { }

    displayTeacherTime = async (req: Request, res: Response) => {
        try {
            const userId = parseInt(req.session["user"].id as string, 10);
            const timeList = await this.teacherService.getTeacherTimeList(userId);
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

    displayTeacherData = async (req: Request, res: Response) => {
        try {
            const userId = parseInt(req.session["user"].id as string, 10);
            const teacherData = await this.teacherService.getTeacherData(userId);
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
                const userId = parseInt(req.session["user"].id as string, 10);
                const description = fields?.["description"] as string;
                const imageTitle = files?.["image"]["newFilename"] as string;
                if (description) {
                    await this.teacherService.editTeacherDescription(userId, description);
                }
                if (imageTitle) {
                    const oldImage = await this.teacherService.editTeacherImage(userId, imageTitle);
                    if (oldImage) {
                        if (oldImage !== "teacher_icon.png") {
                            fs.unlink(path.join(__dirname, `../assets/usersImages/${oldImage}`), (err) => {
                                if (err) {
                                    logger.error(err.toString());
                                    throw err;
                                }
                            });
                        }
                    }
                }
                res.status(200).json({ success: true, message: "Edit success" });
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
            res.status(200).json({ success: true, message: teachingRecord });
        } catch (err) {
            logger.error(err.toString());
            res.status(400).json({ success: false, message: "Display Error" });
            return;
        }
    };



    displayLessonLinkForTeacher = async (req: Request, res: Response) => {
        try {
            const userId = parseInt(req.session["user"].id as string, 10);
            const lessonData = await this.teacherService.getLessonLinkForTeacher(userId);
            if (lessonData.length > 0) {
                res.status(200).json({ success: true, message: lessonData });
            }
        }
        catch (err) {
            logger.error(err.toString());
            res.status(400).json({ success: false, message: "Display Error" })
            return;
        }
    }


    displayLessonData = async (req: Request, res: Response) => {
        try {
            const lessonId = parseInt(req.body["id"] as string, 10);
            const result = await this.teacherService.getLessonData(lessonId);
            if (result) {
                res.status(200).json({ success: true, message: result });
            }
        }
        catch (err) {
            logger.error(err.toString());
            res.status(400).json({ success: false, message: "Display Error" })
            return;
        }
    }

    createLessonLink = async (req: Request, res: Response) => {
        try {
            const lessonId = parseInt(req.body["id"] as string, 10);
            const lessonLink = await hashPassword(req.body["link"] as string);
            const result = await this.teacherService.insertLessonLink(lessonId, lessonLink);
            if (result) {
                res.status(200).json({ success: true, message: "Edit Success" });
            }
        }
        catch (err) {
            logger.error(err.toString());
            res.status(400).json({ success: false, message: "Create Error" })
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
                }
            }
        }
        catch (err) {
            logger.error(err.toString());
            res.status(400).json({ success: false, message: "Edit Error" })
            return;
        }
    }
}
