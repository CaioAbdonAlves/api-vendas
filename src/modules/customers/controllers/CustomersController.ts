import { Request, Response } from "express";
import { container } from "tsyringe";
import ListCustomerService from "../services/ListCustomerService";
import ShowCustomerService from "../services/ShowCustomerService";
import CreateCustomerService from "../services/CreateCustomerService";
import UpdateCustomerService from "../services/UpdateCustomerService";
import DeleteCustomerService from "../services/DeleteCustomerService";

export default class CustomersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCustomerService = container.resolve(ListCustomerService);
    const page =
      request.query.page && Number(request.query.page) > 0
        ? Number(request.query.page)
        : 1;

    const limit =
      request.query.limit && Number(request.query.limit) > 0
        ? Number(request.query.limit)
        : 15;

    const customers = await listCustomerService.execute({ page, limit });

    return response.status(200).json(customers);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showCustomerService = container.resolve(ShowCustomerService);
    const { id } = request.params;

    const product = await showCustomerService.execute(id);

    return response.status(200).json(product);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createCustomerService = container.resolve(CreateCustomerService);
    const { name, email } = request.body;

    const customer = await createCustomerService.execute({
      name,
      email,
    });

    return response.status(201).json(customer);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateCustomerService = container.resolve(UpdateCustomerService);
    const { id } = request.params;
    const { name, email } = request.body;

    const customer = await updateCustomerService.execute({
      id,
      name,
      email,
    });

    return response.status(200).json(customer);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteCustomerService = container.resolve(DeleteCustomerService);
    const { id } = request.params;

    await deleteCustomerService.execute(id);

    return response.status(204).send();
  }
}
