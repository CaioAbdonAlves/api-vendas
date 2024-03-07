import ProfileController from "@modules/users/controllers/ProfileController";
import { isAuthenticated } from "@shared/http/middlewares/isAuthenticated";
import { Joi, Segments, celebrate } from "celebrate";
import { Router } from "express";
import { container } from "tsyringe";

const profileRoutes = Router();

const profileController = container.resolve(ProfileController);

profileRoutes.use(isAuthenticated);
profileRoutes.get("/", (request, response) => {
  return profileController.show(request, response);
});

profileRoutes.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().optional(),
      confirm_password: Joi.string()
        .valid(Joi.ref("password"))
        .when("password", {
          is: Joi.exist(),
          then: Joi.required(),
        }),
      old_password: Joi.string(),
    }),
  }),
  (request, response) => {
    return profileController.update(request, response);
  },
);

export { profileRoutes };
