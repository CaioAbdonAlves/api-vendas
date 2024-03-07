import { container } from "tsyringe";
import { ICustomersRepository } from "../typeorm/repositories/ICustomersRepository";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";
import CustomersController from "@modules/customers/controllers/CustomersController";

container.registerSingleton<ICustomersRepository>(
  "CustomersRepository",
  CustomersRepository,
);

container.registerSingleton("CustomersController", CustomersController);
