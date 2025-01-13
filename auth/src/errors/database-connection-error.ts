import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";
export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = "Database error";
  constructor() {
    super('Database error');
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
  serializeErrors() {
    return [
      {
        message: this.reason,
      },
    ];
  }
}
