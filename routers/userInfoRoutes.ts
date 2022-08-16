
import express from "express";
import { userInfoController, studentController, teacherController } from "../server";
import { isLoggedInAll, isLoggedInStudent, isLoggedInTeacher } from "../middleware/isLoggedInGuard";

export const userInfoRoutes = express.Router();

userInfoRoutes.post("/checkIdentity", isLoggedInAll, userInfoController.checkIdentity);
userInfoRoutes.post("/displayCalendar", isLoggedInAll, userInfoController.displayCalendarData);


userInfoRoutes.post("/displayTeacherInfo", isLoggedInTeacher, teacherController.displayTeacherInfo);
userInfoRoutes.post("/editTeacherInfo", isLoggedInTeacher, teacherController.editTeacherInfo);
userInfoRoutes.post("/displayCanTeachingTime", isLoggedInTeacher, teacherController.displayCanTeachingTime);
userInfoRoutes.post("/editCanTeachingTime", isLoggedInTeacher, teacherController.editCanTeachingTime);
userInfoRoutes.post("/displayTeachingRecord", isLoggedInTeacher, teacherController.displayTeachingRecord);
userInfoRoutes.post("/displayLessonForTeacher", isLoggedInTeacher, teacherController.displayLessonForTeacher);
userInfoRoutes.post("/displayThatLessonData", isLoggedInTeacher, teacherController.displayThatLessonData);
userInfoRoutes.post("/createLessonLink", isLoggedInTeacher, teacherController.createLessonLink);
userInfoRoutes.post("/editLessonData", isLoggedInTeacher, teacherController.editLessonData);


userInfoRoutes.post("/displayStudentInfo", isLoggedInStudent, studentController.displayStudentInfo);
userInfoRoutes.post("/editStudentInfo", isLoggedInStudent, studentController.editStudentInfo);
userInfoRoutes.post("/displayTeacherTimeTable", isLoggedInStudent, studentController.displayTeacherTimeTable);
userInfoRoutes.post("/getCanBookDate", isLoggedInStudent, studentController.getCanBookDate);
userInfoRoutes.post("/bookingLesson", isLoggedInStudent, studentController.insertBookingLesson);
userInfoRoutes.post("/displayPackagesRecord", isLoggedInStudent, studentController.displayPackagesRecord);
userInfoRoutes.post("/toPayPal", isLoggedInStudent, studentController.toPayPal);
userInfoRoutes.post("/insertNewOrder", isLoggedInStudent, studentController.addNewOrder);
userInfoRoutes.post("/displayAllOrder", isLoggedInStudent, studentController.displayAllOrder);
userInfoRoutes.post("/displayThatOrder", isLoggedInStudent, studentController.displayThatOrder);
userInfoRoutes.post("/displayLessonForStudent", isLoggedInStudent, studentController.displayLessonForStudent);
userInfoRoutes.post("/displayThisLessonData", isLoggedInStudent, studentController.displayThatLessonData);
