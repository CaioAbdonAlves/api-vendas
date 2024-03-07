import { container } from "tsyringe";
import { ProductsRepository } from "../typeorm/repositories/ProductsRepository";
import { IProductsRepository } from "../typeorm/repositories/IProductsRepository";
import ProductsController from "../controllers/ProductsController";

container.registerSingleton<IProductsRepository>(
  "ProductsRepository",
  ProductsRepository,
);

container.registerSingleton("ProductsController", ProductsController);
