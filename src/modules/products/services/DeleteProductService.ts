import { inject, injectable } from "tsyringe";
import { ProductsRepository } from "../typeorm/repositories/ProductsRepository";
import AppError from "@shared/errors/AppError";
import redisCache from "@shared/cache/RedisCache";

@injectable()
class DeleteProductService {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: ProductsRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError("Product not found.", 404);
    }

    // const redisCache = new RedisCache();

    await redisCache.invalidate("api-vendas-PRODUCT_LIST");

    await this.productsRepository.delete(product);
  }
}

export default DeleteProductService;
