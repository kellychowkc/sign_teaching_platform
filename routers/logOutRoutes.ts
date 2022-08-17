import express from "express";
import { userController } from "../server";

export const logOutRoutes = express.Router();

logOutRoutes.use(userController.logOut);
