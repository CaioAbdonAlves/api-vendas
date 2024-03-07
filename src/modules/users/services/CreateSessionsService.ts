import jwtConfig from "@config/auth";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import { compare } from "bcryptjs";
import User from "../typeorm/entities/User";
import { injectable, inject } from "tsyringe";
import { sign } from "jsonwebtoken";
import AppError from "@shared/errors/AppError";

type CreateUserLoginDTO = {
  email: string;
  password: string;
};

type IResponse = {
  user: User;
  token: string;
};

@injectable()
export default class CreateSessionsService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository,
  ) {}

  async execute({ email, password }: CreateUserLoginDTO): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Incorrect email/password combination", 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Incorrect email/password combination", 401);
    }

    const token = sign({}, jwtConfig.jwt.secret, {
      subject: user.id,
      expiresIn: jwtConfig.jwt.expiresIn,
    });

    return { user, token };
  }
}
