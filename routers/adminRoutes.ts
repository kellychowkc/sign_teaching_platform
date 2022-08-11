import express from "express";
import {adminController} from "../server";
import {formidableMiddleware} from "../middleware/formidable"

export const adminRoutes = express.Router();

adminRoutes.get("/",adminController.loadTeachingData);
adminRoutes.post("/uploadVideo", formidableMiddleware, adminController.uploadVideo)
