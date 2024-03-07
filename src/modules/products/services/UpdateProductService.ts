import { inject, injectable } from "tsyringe";
import { ProductsRepository } from "../typeorm/repositories/ProductsRepository";
import Product from "../typeorm/entities/Product";
import AppError from "@shared/errors/AppError";
import redisCache from "@shared/cache/RedisCache";

type UpdateProductDTO = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

@injectable()
class UpdateProductService {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: ProductsRepository,
  ) {}

  async execute({
    id,
    name,
    price,
    quantity,
  }: UpdateProductDTO): Promise<Product> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    const productWithSameName = await this.productsRepository.findByName(name);

    if (productWithSameName && product.nome !== productWithSameName.nome) {
      throw new AppError("Product name already in use");
    }

    // const redisCache = new RedisCache();

    await redisCache.invalidate("api-vendas-PRODUCT_LIST");

    product.nome = name;
    product.price = price;
    product.quantity = quantity;

    return this.productsRepository.save(product);
  }
}

export default UpdateProductService;
