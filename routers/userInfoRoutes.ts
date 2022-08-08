
import express from "express";
import { userInfoController } from "../server";
import { isLoggedInAll, isLoggedInStudent, isLoggedInTeacher } from "../middleware/isLoggedInGuard";

export const userInfoRoutes = express.Router();

userInfoRoutes.post("/checkIdentity", isLoggedInAll, userInfoController.checkIdentity);
userInfoRoutes.post("/displayUserInfo", isLoggedInAll, userInfoController.displayUserInfo);
userInfoRoutes.post("/editUserInfo", isLoggedInStudent, userInfoController.editUserInfo);
userInfoRoutes.post("editUserPassword", isLoggedInAll, userInfoController.editUserPassword);

userInfoRoutes.post("/displayTeacherTime", isLoggedInTeacher, userInfoController.displayTeacherTime);
userInfoRoutes.post("/editTeacherTime", isLoggedInTeacher, userInfoController.editTeacherTime);

userInfoRoutes.post("/displayTeacher", isLoggedInStudent, userInfoController.displayTeacher);
userInfoRoutes.post("/getCanBookDate", isLoggedInStudent, userInfoController.getCanBookDate);
userInfoRoutes.post("/bookingLesson", isLoggedInStudent, userInfoController.insertBookingLesson);

userInfoRoutes.post("/displayTeacherImage", isLoggedInTeacher, userInfoController.displayTeacherImage);
//userInfoRoutes.post("/editTeacherImage", isLoggedInTeacher, userInfoController.editTeacherImage);