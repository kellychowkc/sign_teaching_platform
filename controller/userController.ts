import type { UserService } from "../service/userService";
import type { Request, Response } from "express";
import { checkPassword } from "../utility/hash";
import { User } from "../utility/models";

export class UserController {
  constructor(private userService: UserService) {}

  login = async (req: Request, res: Response) => {
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
      req.session["user"] = { id: foundUser.id, username };
      res.json({ message: "success" });
    } else {
      res.status(401).json({ message: "no such user or wrong password" });
    }
  };

  getUserInfo = async (req: Request, res: Response) => {
    try {
      const user = req.session["user"];
      const { id, ...others } = user;
      res.json({ success: true, user: others });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ success: false, message: "internal server error" });
    }
  };
}
