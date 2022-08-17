import express from "express";
import { statusController } from "../server";
import { logMiddleware } from "../routers/adminRoutes";

export const statusRoutes = express.Router();

statusRoutes.get("/", logMiddleware, statusController.checkIfLogin);
