import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import AppError from "@shared/errors/AppError";
import routes from "./routes";

const app = express();
app.use(cors());
app.use(express.json());

app.use(routes);
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: "error",
        message: error.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  },
);

app.listen(3000, () => {
  console.log("O Servidor está rodando na porta 3000");
});
