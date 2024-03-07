import { Request, Response } from "express";
import { container } from "tsyringe";
import ListProductService from "../services/ListProductService";
import ShowProductService from "../services/ShowProductService";
import CreateProductService from "../services/CreateProductService";
import UpdateProductService from "../services/UpdateProductService";
import DeleteProductService from "../services/DeleteProductService";

export default class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProductService = container.resolve(ListProductService);
    const page =
      request.query.page && Number(request.query.page) > 0
        ? Number(request.query.page)
        : 1;

    const limit =
      request.query.limit && Number(request.query.limit) > 0
        ? Number(request.query.limit)
        : 15;

    const products = await listProductService.execute({ page, limit });

    return response.status(200).json(products);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showProductService = container.resolve(ShowProductService);
    const { id } = request.params;

    const product = await showProductService.execute(id);

    return response.status(200).json(product);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createProductService = container.resolve(CreateProductService);
    const { name, price, quantity } = request.body;

    const product = await createProductService.execute({
      nome: name,
      price,
      quantity,
    });

    return response.status(201).json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateProductService = container.resolve(UpdateProductService);
    const { id } = request.params;
    const { name, price, quantity } = request.body;

    const product = await updateProductService.execute({
      id,
      name,
      price,
      quantity,
    });

    return response.status(200).json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteProductService = container.resolve(DeleteProductService);
    const { id } = request.params;

    await deleteProductService.execute(id);

    return response.status(204).send();
  }
}
