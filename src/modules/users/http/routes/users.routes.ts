import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import multer from "multer";
import uploadConfig from "@config/upload";
import { container } from "tsyringe";
import UsersController from "@modules/users/controllers/UsersController";
import { isAuthenticated } from "@shared/http/middlewares/isAuthenticated";
import UserAvatarController from "@modules/users/controllers/UserAvatarController";

const usersRoutes = Router();
const usersController = container.resolve(UsersController);
const userAvatarController = container.resolve(UserAvatarController);

const upload = multer(uploadConfig.multer);

usersRoutes.get(
  "/",
  isAuthenticated,
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
      limit: Joi.number(),
    }),
  }),
  (request, response) => {
    return usersController.index(request, response);
  },
);

usersRoutes.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  (request, response) => {
    return usersController.create(request, response);
  },
);

usersRoutes.patch(
  "/avatar",
  isAuthenticated,
  upload.single("avatar"),
  (request, response) => {
    return userAvatarController.handle(request, response);
  },
);

export { usersRoutes };
