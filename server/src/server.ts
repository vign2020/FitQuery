/** @format */

import express, { Request, Response, NextFunction } from "express";
import homeRoute from "./Routes/homeRoute";
import cors from "cors";
import { AppError } from "./Types/error";
import migrateRoute from "./Routes/migrateRoute";
import sparseEmbeddingsRoute from "./Routes/sparseEmbeddingsRoute";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/home", homeRoute);
app.use("/api/migrate", migrateRoute);
app.use("/api/sparse-embeddings", sparseEmbeddingsRoute);

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode: number = 500;
  let message = "Internal server error";

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }
  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default app;
