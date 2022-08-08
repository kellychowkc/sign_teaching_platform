import express from "express";
import path from "path";
// import http from "http";
import expressSession from "express-session";
import Knex from "knex";

import winston from "winston";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  expressSession({
    secret: "Hi this is a secret",
    resave: true,
    saveUninitialized: true,
  })
);

// export const server = new http.Server(app);

// logger set up
const logFormat = winston.format.printf(function (info) {
  let date = new Date().toISOString();
  return `${date}[${info.level}]: ${info.message}\n`;
});
export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(winston.format.colorize(), logFormat),
  transports: [new winston.transports.Console()],
});

//knex set up
// const knexConfigs = require("./knexfile");
import knexConfigs from "./knexfile";
const configMode = process.env.NODE_ENV || "development";
const knexConfig = knexConfigs[configMode];
const knex = Knex(knexConfig);
// console.log(knex);

import { UserService } from "./service/userService";
import { UserController } from "./controller/userController";

//server & controller set up
const userService = new UserService(knex);
export const userController = new UserController(userService);

import { logInRoutes } from "./routers/logInRoutes";
import { signUpRoutes } from "./routers/signUpRoutes";
import { logOutRoutes } from "./routers/logOutRoutes";

//route handling
app.use("/signUp", signUpRoutes);
app.use("/logIn", logInRoutes);
app.use("/logOut", logOutRoutes);

//folder path
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "private")));

//404 Handler
app.use((req, res) => {
  res.redirect("/404.html");
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});
