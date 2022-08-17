import { UserService } from "../service/userService";
import type { Request, Response } from "express";
import { logger } from "../utility/logger";
import { checkPassword } from "../utility/hash";

export class UserController {
  constructor(private userService: UserService) {}

  logIn = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        res.status(400).json({ success: false, message: "invalid username/password" });
        return;
      }

      const foundUserInfo = await this.userService.logIn(username);
      if (!foundUserInfo) {
        res.status(401).json({ success: false, message: "no such user or wrong password" });
        return;
      }
      const match = await checkPassword(password, foundUserInfo["password"]);
      if (match) {
        if (req.session) {
          req.session["user"] = {
            id: foundUserInfo["id"],
            username: foundUserInfo["username"],
            identity: foundUserInfo["identity"],
          };
          res.status(200).json({ success: true, message: "success", identity: foundUserInfo["identity"]});
        }
      } else {
        res.status(401).json({ success: false, message: "沒有這個用戶或密碼錯誤" });
      }
    } catch (err) {
      logger.error(err.toString());
      res.status(500).json({ success: false, message: "internal server error" });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const newUser = await this.userService.create(req.body);
      if (newUser) {
        res.status(201).json({ success: true, message: "已創建用戶" });
      } else {
        res.status(405).json({
          success: false,
          message: "用戶/電子郵件/電話號碼已經存在",
        });
      }
    } catch (err) {
      logger.error(err.toString());
      res.status(500).json({ success: false, message: "internal server error" });
    }
  };

  logOut = async (req: Request, res: Response) => {
    try {
      delete req.session["user"];
      console.log("this is req.session:",req.session["user"])
      res.status(200).json({ success: true, message: "success" });
    } catch (err) {
      logger.error(err.toString());
      res.status(500).json({ success: false, message: "internal server error" });
    }
  };

  getUserInfo = async (req: Request, res: Response) => {
    try {
      const user = req.session["user"];

      const userInfo = await this.userService.getUserInfo(user);
      res.status(200).json({ success: true, message: "success", user: userInfo });
    } catch (err) {
      logger.error(err.toString());
      res.status(500).json({ success: false, message: "internal server error" });
    }
  };

  // used in admin page's system control
  getAllUsers = async (req: Request, res: Response) => {
    try {
      const admin = req.session["user"];
      const allUsers = await this.userService.getAllUsers(admin);
      res.status(200).json({ success: true, message: "success", user: allUsers });
    } catch (err) {
      logger.error(err.toString());
      res.status(500).json({ success: false, message: "internal server error" });
    }
  };
}
