import express from "express";
import { signController } from "../server";

export const signRoutes = express.Router();

signRoutes.get("/", signController.getAllSign);
