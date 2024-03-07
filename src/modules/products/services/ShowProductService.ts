import { inject, injectable } from "tsyringe";
import { ProductsRepository } from "../typeorm/repositories/ProductsRepository";
import Product from "../typeorm/entities/Product";
import AppError from "@shared/errors/AppError";

@injectable()
class ShowProductService {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: ProductsRepository,
  ) {}

  async execute(id: string): Promise<Product | null> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    return product;
  }
}

export default ShowProductService;
