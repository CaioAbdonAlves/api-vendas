import dataSource from "@shared/typeorm";
import { In, Repository } from "typeorm";
import Product from "../entities/Product";
import {
  IProductsRepository,
  CreateProductDTO,
  PaginateParams,
  ProductPaginateProperties,
  IFindProducts,
} from "./IProductsRepository";

export class ProductsRepository implements IProductsRepository {
  private repository: Repository<Product>;

  constructor() {
    this.repository = dataSource.getRepository(Product);
  }

  async create({ nome, price, quantity }: CreateProductDTO): Promise<Product> {
    const product = this.repository.create({ nome, price, quantity });

    return this.repository.save(product);
  }

  async save(product: Product): Promise<Product> {
    return this.repository.save(product);
  }

  async findAll({
    page,
    skip,
    take,
  }: PaginateParams): Promise<ProductPaginateProperties> {
    const [products, count] = await this.repository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: products,
    };

    return result;
  }

  async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    const productsIds = products.map(product => product.id);

    const existsProducts = await this.repository.find({
      where: {
        id: In(productsIds),
      },
    });

    return existsProducts;
  }

  async findById(id: string): Promise<Product | null> {
    return this.repository.findOneBy({ id });
  }

  async findByName(nome: string): Promise<Product | null> {
    return this.repository.findOneBy({ nome });
  }

  async delete(product: Product): Promise<void> {
    await this.repository.remove(product);
  }
}
