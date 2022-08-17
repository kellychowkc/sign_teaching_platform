import type { Request, Response } from "express";
import { logger } from "../server";

export class StatusController {
  constructor() {}

  checkIfLogin = async (req: Request, res: Response) => {
    try {
      if (req.session["user"]) {
        console.log("this is req.session:", req.session["user"]);
        res.status(200).json({ success: true, message: "Status: log-in" });
      } else {
        console.log("this is req.session:", req.session["user"]);
        res.status(200).json({ success: true, message: "Status: log-out" });
      }
    } catch (err) {
      logger.error(err.toString());
      res.status(500).json({ success: false, message: "internal server error" });
    }
  };
}
