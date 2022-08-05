import express from "express";
import {userController} from "../server";

export const logInRoutes = express.Router();

logInRoutes.post("/",userController.logIn)
