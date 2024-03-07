import { container } from "tsyringe";
import { IOrdersRepository } from "../typeorm/repositories/IOrdersRepository";
import { OrdersRepository } from "../typeorm/repositories/OrdersRepository";
import OrdersController from "../controllers/OrdersController";

container.registerSingleton<IOrdersRepository>(
  "OrdersRepository",
  OrdersRepository,
);

container.registerSingleton("OrdersController", OrdersController);
