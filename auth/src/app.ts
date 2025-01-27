import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "@tickets-sm/common";
import { NotFoundError } from "@tickets-sm/common";
import { DatabaseConnectionError } from "@tickets-sm/common";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

const routers = [currentUserRouter, signinRouter, signoutRouter, signupRouter];

routers.forEach((router) => {
  app.use(router);
});
app.all("*", async (req, res, next) => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
