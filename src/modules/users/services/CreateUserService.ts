import { inject, injectable } from "tsyringe";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import { CreateUserDTO } from "../typeorm/repositories/IUsersRepository";
import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import User from "../typeorm/entities/User";

@injectable()
export default class CreateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository,
  ) {}

  async execute({ name, email, password }: CreateUserDTO): Promise<User> {
    const userAlreadyExist = await this.usersRepository.findByEmail(email);

    if (userAlreadyExist) {
      throw new AppError("Email address already in use for another user.");
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}
