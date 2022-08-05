import type { UserService } from "../service/userService";
import type { Request, Response } from "express";
import { checkPassword } from "../utility/hash";
import { User } from "../utility/models";
import {logger} from "../server";

export class UserController {
  constructor(private userService: UserService) {}

  logIn = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ success: false, message: "invalid username/password" });
      return;
    }

    const foundUser: User[] = await this.userService.login(req.body);

    if (foundUser.length === 0) {
      res.status(401).json({ success: false, message: "no such user or wrong password" });
      return;
    }

    if (await checkPassword(password, foundUser.password)) {
      req.session["user"] = { id: foundUser.id, username, identity};
      res.status(200).json({ message: "success" });
    } else {
      res.status(401).json({ message: "no such user or wrong password" });
    }
  };

  create = async (req:Request, res: Response) => {
    try{
      const newUser = await this.userService.create(req.body);
      if(newUser){
        res.status(201).json({ success: false, message: "internal server error" });
      }
    }catch(err){
      logger.error(err.toString());
      // console.error(err.message);
      res.status(500).json({ success: false, message: "internal server error" });
    }
  }

  logOut = async (req:Request, res:Response) => {
    try{
      delete req.session["user"];
      res.status(200).json({message: "success"})
    }catch(err){
      logger.error(err.toString());
      // console.error(err.message)
      res.status(500).json({ success: false, message: "internal server error" });
    }
    
  }

  getUserInfo = async (req: Request, res: Response) => {
    try {
      const user = req.session["user"];

      // is this matching to userService's getAllUsers()?
      // const { id, ...others } = user;

      // try matching...
      const userInfo = await this.userService.getUserInfo(user);
      res.status(200).json({ message: "success", user: userInfo });

    } catch (err) {
      logger.error(err.toString());
      // console.error(err.message);
      res.status(500).json({ success: false, message: "internal server error" });
    }
  };

  // maybe used in admin page's system control?
  getAllUsers = async (req: Request, res: Response) => {
    try{
      const admin = req.session["user"];
      const allUsers = await this.userService.getAllUsers(admin);
      res.status(200).json({ message: "success", user: allUsers });
    }catch(err){
      logger.error(err.toString());
      // console.error(err.message);
      res.status(500).json({ success: false, message: "internal server error" });
    }

  }
}
