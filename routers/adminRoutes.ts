import express from "express";
import {adminController} from "../server";
import {Response, Request, NextFunction} from "express";
import {formidableMiddleware} from "../middleware/formidableMiddleware";

export const adminRoutes = express.Router();


adminRoutes.delete("/teachingData",adminController.deleteTeachingData);
adminRoutes.get("/teachingData",adminController.loadTeachingData);
adminRoutes.get("/teachingVideo",adminController.teachingVideo);
adminRoutes.post("/video", formidableMiddleware, adminController.uploadVideo);

adminRoutes.get("/lectureData",formidableMiddleware,adminController.loadLectureData);

adminRoutes.put("/userData",logMiddleware,adminController.changeToTeacher);
adminRoutes.get("/userData",formidableMiddleware,adminController.getAllUser);
adminRoutes.delete("/userData",adminController.deleteUserData);

adminRoutes.post("/info", formidableMiddleware, adminController.updateAdminInfo);

function logMiddleware(res:Request,rep:Response, next:NextFunction){
    console.log("logMiddleware")
    next()
}