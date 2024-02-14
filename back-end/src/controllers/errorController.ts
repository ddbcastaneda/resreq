import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";

const handleAxiosError = (err: any, res: Response) => {
  const message = err.response.statusText;
  return new AppError(message, err.response.status);
};

const sendErrorDev = (err: AppError, res: Response): void => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err: AppError, res: Response): void => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log("global error handler");

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;

    if (err.name === "AxiosError") error = handleAxiosError(err, res);
    sendErrorProd(error, res);
  }

  console.log(err.stack);
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
