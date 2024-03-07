import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import SessionsController from "@modules/users/controllers/SessionsController";
import { container } from "tsyringe";

const sessionsRoutes = Router();

const sessionsController = container.resolve(SessionsController);

sessionsRoutes.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  (request, response) => {
    return sessionsController.handle(request, response);
  },
);

export { sessionsRoutes };
