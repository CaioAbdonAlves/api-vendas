import { inject, injectable } from "tsyringe";
import { CreateProductDTO } from "../typeorm/repositories/IProductsRepository";
import Product from "../typeorm/entities/Product";
import AppError from "@shared/errors/AppError";
import { ProductsRepository } from "../typeorm/repositories/ProductsRepository";
import redisCache from "@shared/cache/RedisCache";

@injectable()
class CreateProductService {
  constructor(
    @inject("ProductsRepository")
    private productRepository: ProductsRepository,
  ) {}

  async execute({ nome, price, quantity }: CreateProductDTO): Promise<Product> {
    const productAlreadyExists = await this.productRepository.findByName(nome);

    if (productAlreadyExists) {
      throw new AppError("Product already exist");
    }

    // const redisCache = new RedisCache();

    await redisCache.invalidate("api-vendas-PRODUCT_LIST");

    const product = await this.productRepository.create({
      nome,
      price,
      quantity,
    });

    return product;
  }
}

export default CreateProductService;
