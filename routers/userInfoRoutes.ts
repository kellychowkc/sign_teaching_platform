
import express from "express";
import { userInfoController, studentController, teacherController } from "../server";
import { isLoggedInAll, isLoggedInStudent, isLoggedInTeacher } from "../middleware/isLoggedInGuard";

export const userInfoRoutes = express.Router();

userInfoRoutes.post("/checkIdentity", isLoggedInAll, userInfoController.checkIdentity);
userInfoRoutes.post("/displayUserInfo", isLoggedInAll, userInfoController.displayUserInfo);
userInfoRoutes.post("/editUserInfo", isLoggedInAll, userInfoController.editUserInfo);
userInfoRoutes.post("/editUserPassword", isLoggedInAll, userInfoController.editUserPassword);
userInfoRoutes.post("/displayCalendar", isLoggedInAll, userInfoController.displayCalendarData);


userInfoRoutes.post("/displayTeacherTime", isLoggedInTeacher, teacherController.displayTeacherTime);
userInfoRoutes.post("/editTeacherTime", isLoggedInTeacher, teacherController.editTeacherTime);
userInfoRoutes.post("/displayTeacherImage", isLoggedInTeacher, teacherController.displayTeacherImage);
userInfoRoutes.post("/editTeacherData", isLoggedInTeacher, teacherController.editTeacherData);
userInfoRoutes.post("/displayTeachingRecord", isLoggedInTeacher, teacherController.displayTeachingRecord);


userInfoRoutes.post("/displayTeacher", isLoggedInStudent, studentController.displayTeacher);
userInfoRoutes.post("/getCanBookDate", isLoggedInStudent, studentController.getCanBookDate);
userInfoRoutes.post("/bookingLesson", isLoggedInStudent, studentController.insertBookingLesson);
userInfoRoutes.post("/displayShoppingRecord", isLoggedInStudent, studentController.displayShoppingRecord);
userInfoRoutes.post("/displayOrderRecord", isLoggedInStudent, studentController.displayOrderRecord);
userInfoRoutes.post("/displayOrderData", isLoggedInStudent, studentController.displayOrderData);
userInfoRoutes.post("/toPayPal", isLoggedInStudent, studentController.toPayPal);
userInfoRoutes.post("/insertNewOrder", isLoggedInStudent, studentController.addNewOrder)
