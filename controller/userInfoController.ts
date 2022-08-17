import { Request, Response } from "express";
import { UserInfoService } from "../service/userInfoService";
import { logger } from "../utility/logger";

export class UserInfoController {
  constructor(private userInfoService: UserInfoService) {}

  checkIdentity = (req: Request, res: Response) => {
    try {
      if (req.session["user"]) {
        const identity = req.session["user"].identity as string;
        res.status(200).json({ success: true, message: identity });
      }
    } catch (err) {
      logger.error(err.toString());
      res.status(400).json({ success: false, message: "Identity Error" });
      return;
    }
  };

  displayCalendarData = async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.session["user"].id as string, 10);
      const userIdentity = req.session["user"].identity as string;
      const calendarData = await this.userInfoService.getCalendarData(userId, userIdentity);
      if (calendarData) {
        let result = [];
        for (let calender of calendarData) {
          const lessonYear = calender["start"].substring(6, 10);
          const lessonMonth = calender["start"].substring(3, 5);
          const lessonDay = calender["start"].substring(0, 2);
          const lessonTime = calender["start"].substring(12);
          const lessonDate = lessonYear + "-" + lessonMonth + "-" + lessonDay + "T" + lessonTime;
          result.push({ title: calender["title"], start: lessonDate });
        }
        res.status(200).json({ success: true, message: result });
      }
    } catch (err) {
      logger.error(err.toString());
      res.status(400).json({ success: false, message: "Display Error" });
      return;
    }
  };
}
