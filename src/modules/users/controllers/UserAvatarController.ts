import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserAvatarService } from "../services/UpdateUserAvatarService";
import { instanceToInstance } from "class-transformer";

export default class UserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatarService.execute({
      id: request.user.id,
      avatarFileName: request.file.filename,
    });

    return response.json(instanceToInstance(user));
  }
}
