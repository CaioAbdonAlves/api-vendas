import { container, inject, injectable } from "tsyringe";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import { isAfter, addHours } from "date-fns";
import UsersTokensRepository from "../typeorm/repositories/UsersTokensRepository";
import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";

interface IResponse {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject("UsersRepository")
    private usersRepository = container.resolve(UsersRepository),

    @inject("UsersTokensRepository")
    private usersTokenRepository = container.resolve(UsersTokensRepository),
  ) {}

  async execute({ token, password }: IResponse): Promise<void> {
    const userToken = await this.usersTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError("User Token is not exists.");
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError("User not exists.");
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError("Token expired.");
    }

    const passwordHash = await hash(password, 8);

    user.password = passwordHash;

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
