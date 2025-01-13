import { ValidationError } from "express-validator";

export class DatabaseConnectionError extends Error {
  reason = "Database error";
  constructor() {
    super();
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}
