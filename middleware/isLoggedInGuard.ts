import { Request, Response, NextFunction } from "express";
import path from "path";

export function isLoggedInAll(req: Request, res: Response, next: NextFunction) {
  if (req.session["user"]) {
    next();
  } else {
    console.log("isLoggedInAll");
    // location.href = "/html/login.html"
    res.sendFile(path.join(__dirname, "../public/html/login.html"));
    return;
  }
}

export function isLoggedInStudent(req: Request, res: Response, next: NextFunction) {
  if (req.session["user"].identity === "student") {
    next();
  } else {
    res.sendFile(path.join(__dirname, "../public/html/login.html"));
    return;
  }
}

export function isLoggedInTeacher(req: Request, res: Response, next: NextFunction) {
  if (req.session["user"].identity === "teacher") {
    next();
  } else {
    res.sendFile(path.join(__dirname, "../public/html/login.html"));
    return;
  }
}

export function isLoggedInAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.session["user"].identity === "admin") {
    next();
  } else {
    res.sendFile(path.join(__dirname, "../public/html/login.html"));
    return;
  }
}
