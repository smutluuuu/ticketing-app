import express from "express";
import { json } from "body-parser";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";

const app = express();
app.use(json());

const routers = [currentUserRouter, signinRouter, signoutRouter, signupRouter];

routers.forEach((router) => {
  app.use(router);
});

app.get("/api/users/currentuser", (req, res) => {
  res.send("Hi there !");
});

app.listen(3000, () => {
  console.log("App listening on port 3000!!!");
});
