import { type ErrorRequestHandler } from "express";
import { type ErrorResponse } from "../helper/response.helper";

/**
 * Express error-handling middleware that formats and sends error responses.
 *
 * @param err - The error object that contains details about the error.
 * @param req - The Express request object.
 * @param res - The Express response object used to send the error response.
 * @param next - The next middleware function in the stack.
*/
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const response: ErrorResponse = {
    success: false,
    error_code: (err?.status ?? 500) as number,
    message: (err?.message ?? "Something went wrong!") as string,
    data: err?.data ?? {},
  };

  res.status(response.error_code).send(response);
  next();
};

export default errorHandler;