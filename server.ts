import express from "express";
import path from "path";
import http from "http";
import expressSession from "express-session";
import Knex from "knex";

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

export const server = new http.Server(app);

//knex set up
const knexConfigs = require("./knexfile");
const configMode = process.env.NODE_ENV || "development";
const knexConfig = knexConfigs[configMode];
const knex = Knex(knexConfig);
console.log(knex);

//folder path
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "private")));

//404 Handler
app.use((req, res) => {
  res.redirect("/404.html");
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});
