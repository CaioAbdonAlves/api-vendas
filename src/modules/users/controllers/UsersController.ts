import { Request, Response } from "express";
import { container } from "tsyringe";
import ListUserService from "../services/ListUserService";
import CreateUserService from "../services/CreateUserService";
import { instanceToInstance } from "class-transformer";

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUserService = container.resolve(ListUserService);

    const page =
      request.query.page && Number(request.query.page) > 0
        ? Number(request.query.page)
        : 1;

    const limit =
      request.query.limit && Number(request.query.limit) > 0
        ? Number(request.query.limit)
        : 15;

    const users = await listUserService.execute({ page, limit });

    return response.status(200).json(instanceToInstance(users));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createUserService = container.resolve(CreateUserService);
    const { name, email, password } = request.body;

    const user = await createUserService.execute({ name, email, password });

    return response.status(201).json(instanceToInstance(user));
  }
}
