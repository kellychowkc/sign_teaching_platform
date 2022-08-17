import { SignService } from "../service/signService";
import type { Request, Response } from "express";
import { logger } from "../utility/logger";

export class SignController {
  constructor(private signService: SignService) {}

  getAllSign = async (req: Request, res: Response) => {
    try {
      const signList = await this.signService.getAllSign();
      res.status(200).json({ success: true, message: "success", sign: signList });
    } catch (err) {
      logger.error(err.toString());
      res.status(500).json({ success: false, message: "internal server error" });
    }
  };
}
