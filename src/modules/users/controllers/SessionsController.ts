import { container } from "tsyringe";
import { Request, Response } from "express";
import CreateSessionsService from "../services/CreateSessionsService";
import { instanceToInstance } from "class-transformer";

export default class SessionsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createSessionsService = container.resolve(CreateSessionsService);
    const { email, password } = request.body;

    const { user, token } = await createSessionsService.execute({
      email,
      password,
    });

    return response.status(201).json(instanceToInstance({ user, token }));
  }
}
