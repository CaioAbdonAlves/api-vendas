import { Request, Response } from "express";
import { container } from "tsyringe";
import SendForgotPasswordEmailService from "../services/SendForgotPasswordEmailService";

export default class ForgotPasswordController {
  async create(request: Request, response: Response): Promise<Response> {
    const sendForgotPasswordEmailService = container.resolve(
      SendForgotPasswordEmailService,
    );

    const { email } = request.body;

    await sendForgotPasswordEmailService.execute({ email });

    return response.status(204).json();
  }
}
