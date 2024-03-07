import { Request, Response } from "express";
import { container } from "tsyringe";
import ResetPasswordService from "../services/ResetPasswordService";

export default class ResetPasswordController {
  async create(request: Request, response: Response): Promise<Response> {
    const resetPasswordService = container.resolve(ResetPasswordService);

    const { password, token } = request.body;

    await resetPasswordService.execute({ password, token });

    return response.status(204).json();
  }
}
