import { container } from "tsyringe";
import { IUsersRepository } from "../typeorm/repositories/IUsersRepository";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UsersController from "../controllers/UsersController";
import { IUsersTokensRepository } from "../typeorm/repositories/IUsersTokensRepository";
import UsersTokensRepository from "../typeorm/repositories/UsersTokensRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository,
);

container.registerSingleton<IUsersTokensRepository>(
  "UsersTokensRepository",
  UsersTokensRepository,
);

container.registerSingleton("UsersController", UsersController);
