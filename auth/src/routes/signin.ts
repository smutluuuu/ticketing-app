import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "@tickets-sm/common";
import { validateRequest } from "@tickets-sm/common";
import { User } from "../models/user";
import { BadRequestError } from "@tickets-sm/common";
import { PasswordManager } from "../services/password";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid."),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("Invalid credentials");
    }

    const passwordsMatch = await PasswordManager.compare(
      password,
      existingUser.password
    );
    if (!passwordsMatch) {
      throw new BadRequestError("Invalid credentials");
    }
    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    //Store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(existingUser);
    return;
  }
);

export { router as signinRouter };
