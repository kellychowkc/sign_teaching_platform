
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


    displayCalendarData = async (req: Request, res: Response) => {
        try {
            const userId = parseInt(req.session["user"].id as string, 10);
            const userIdentity = req.session["user"].identity as string;
            const calendarData = await this.userInfoService.getCalendarData(userId, userIdentity);
            if (calendarData) {
                res.status(200).json({ success: true, message: calendarData });
            }
            
        }
        catch (err) {
            logger.error(err.toString());
            res.status(400).json({ success: false, message: "Display Error" })
            return;
        }
    }
}

