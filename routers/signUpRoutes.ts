import express from "express";
import { userController } from "../server";

export const signUpRoutes = express.Router();

signUpRoutes.post("/", userController.create);
