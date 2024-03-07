import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import { container } from "tsyringe";
import ForgotPasswordController from "@modules/users/controllers/ForgotPasswordController";
import ResetPasswordController from "@modules/users/controllers/ResetPasswordController";

const passwordRouter = Router();

const forgotPasswordController = container.resolve(ForgotPasswordController);
const resetPasswordController = container.resolve(ResetPasswordController);

passwordRouter.post(
  "/forgot",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
    }),
  }),
  (request, response) => {
    return forgotPasswordController.create(request, response);
  },
);

passwordRouter.post(
  "/reset",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref("password")),
      token: Joi.string().uuid().required(),
    }),
  }),
  (request, response) => {
    return resetPasswordController.create(request, response);
  },
);

export { passwordRouter };
