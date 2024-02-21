import "reflect-metadata";
import dataSource from "@shared/typeorm";
import { app } from "./app";

dataSource.initialize().then(() => {
  app.listen(3000, () => {
    console.log("O servidor está rodando na porta 3000!");
  });
});
