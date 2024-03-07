import "reflect-metadata";
import "dotenv/config";
import dataSource from "@shared/typeorm";
import { app } from "./app";

dataSource.initialize().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("O servidor está rodando na porta 3000!");
  });
});
