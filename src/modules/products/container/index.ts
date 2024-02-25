import { container } from "tsyringe";
import { ProductsRepository } from "../typeorm/repositories/ProductsRepository";
import { IProductsRepository } from "../typeorm/repositories/IProductsRepository";

container.registerSingleton<IProductsRepository>(
  "ProductsRepository",
  ProductsRepository,
);
