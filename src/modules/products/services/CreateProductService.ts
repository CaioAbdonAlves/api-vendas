import { inject, injectable } from "tsyringe";
import {
  IProductsRepository,
  CreateProductDTO,
} from "../typeorm/repositories/IProductsRepository";
import Product from "../typeorm/entities/Product";
import AppError from "@shared/errors/AppError";

@injectable()
class CreateProductService {
  constructor(
    @inject("ProductsRepository")
    private productRepository: IProductsRepository,
  ) {}

  async execute({ nome, price, quantity }: CreateProductDTO): Promise<Product> {
    const productAlreadyExists = await this.productRepository.findByName(nome);

    if (productAlreadyExists) {
      throw new AppError("Product already exist");
    }

    const product = await this.productRepository.create({
      nome,
      price,
      quantity,
    });

    return product;
  }
}

export default CreateProductService;
