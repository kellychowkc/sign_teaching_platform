import { UserService } from "../service/userService";
import type { Request, Response } from "express";
// import { checkPassword } from "../utility/hash";
import { logger } from "../server";
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
          res.status(200).json({ message: "success" });
        }
      } else {
        res.status(401).json({ message: "no such user or wrong password" });
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
        res.status(201).json({ success: true, message: "Created user" });
      } else {
        res
          .status(405)
          .json({
            success: false,
            message: "Method not allowed: user/email/phoneNumber already exists",
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
      res.status(200).json({ message: "success" });
    } catch (err) {
      logger.error(err.toString());
      res.status(500).json({ success: false, message: "internal server error" });
    }
  };

  getUserInfo = async (req: Request, res: Response) => {
    try {
      const user = req.session["user"];

      const userInfo = await this.userService.getUserInfo(user);
      res.status(200).json({ message: "success", user: userInfo });
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
      res.status(200).json({ message: "success", user: allUsers });
    } catch (err) {
      logger.error(err.toString());
      res.status(500).json({ success: false, message: "internal server error" });
    }
  };
}
