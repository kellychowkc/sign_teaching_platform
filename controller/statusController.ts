import type { Request, Response } from "express";
import { logger } from "../utility/logger";

export class StatusController {
  constructor() { }

  checkIfLogin = async (req: Request, res: Response) => {
    try {
      console.log("this is req.session:", req.session["user"])
      if (req.session["user"]) {

        if (req.session["user"].identity === "student" || req.session["user"].identity === "teacher") {
          res.status(200).json({ success: true, message: "Status: log-in", identity: "user" })
        } else {
          res.status(200).json({ success: true, message: "Status: log-in", identity: "admin" })
        }
        return true
      } else {
        console.log("this is req.session:", req.session["user"])
        res.status(200).json({ success: true, message: "Status: log-out" })
        return false
      }
    } catch (err) {
      logger.error(err.toString());
      res.status(500).json({ success: false, message: "internal server error" });
      return
    }
  };
}
