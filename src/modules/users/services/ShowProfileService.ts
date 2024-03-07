import { inject, injectable } from "tsyringe";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import User from "../typeorm/entities/User";
import AppError from "@shared/errors/AppError";

interface IRequest {
  user_id: string;
}

@injectable()
class ShowProfileService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User not found.", 404);
    }

    return user;
  }
}

export default ShowProfileService;
