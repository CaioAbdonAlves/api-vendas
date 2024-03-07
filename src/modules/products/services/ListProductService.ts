import { inject, injectable } from "tsyringe";
import { ProductsRepository } from "../typeorm/repositories/ProductsRepository";
import { ProductPaginateProperties } from "../typeorm/repositories/IProductsRepository";
import redisCache from "@shared/cache/RedisCache";

type ListProductsListParams = {
  page: number;
  limit: number;
};

@injectable()
class ListProductService {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: ProductsRepository,
  ) {}

  async execute({
    page,
    limit,
  }: ListProductsListParams): Promise<ProductPaginateProperties> {
    const take = limit;
    const skip = (Number(page) - 1) * take;

    // const redisCache = new RedisCache();

    let products = await redisCache.recover<ProductPaginateProperties>(
      "api-vendas-PRODUCT_LIST",
    );

    if (!products) {
      products = await this.productsRepository.findAll({ page, skip, take });

      await redisCache.save("api-vendas-PRODUCT_LIST", products);
    }

    return products;
  }
}

export default ListProductService;
