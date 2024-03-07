import { inject, injectable } from "tsyringe";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import path from "path";
import AppError from "@shared/errors/AppError";
import UsersTokensRepository from "../typeorm/repositories/UsersTokensRepository";
import EtherealMail from "@config/mail/EtherealMail";
import SESMail from "@config/mail/SESMail";
import mailConfig from "@config/mail/mail";

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository,

    @inject("UsersTokensRepository")
    private usersTokensRepository: UsersTokensRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("User does not exists.");
    }

    const token = await this.usersTokensRepository.generate({
      user_id: user.id,
    });

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      "..",
      "views",
      "forgot_password.hbs",
    );

    if (mailConfig.driver === "ses") {
      await SESMail.sendMail({
        to: {
          name: user.name,
          email: user.email,
        },
        subject: "[API Vendas] Recuperação de senha",
        templateData: {
          file: forgotPasswordTemplate,
          variables: {
            name: user.name,
            link: `http://localhost:3000/reset_password?token=${token.token}`,
          },
        },
      });
      return;
    }

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: "[API Vendas] Recuperação de senha",
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset_password?token=${token.token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
