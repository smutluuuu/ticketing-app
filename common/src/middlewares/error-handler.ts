import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).send({ errors: err.serializeErrors() });
    return;
  }
  // if (err instanceof DatabaseConnectionError) {
  //   res.status(err.statusCode).send({ errors: err.serializeErrors() });
  //   return;
  // }
  console.error(err);
  res.status(400).send({
    message: err.message,
  });
};
