import express from "express";
import {adminController} from "../server";
import {formidableMiddleware} from "../middleware/formidableMiddleware"

export const adminRoutes = express.Router();

adminRoutes.get("/teachingData",adminController.loadTeachingData);
adminRoutes.get("/lectureData",formidableMiddleware,adminController.loadLectureData);
adminRoutes.get("/allUser",formidableMiddleware,adminController.getAllUser);
adminRoutes.post("/video", formidableMiddleware, adminController.uploadVideo)