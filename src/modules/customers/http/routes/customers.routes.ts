import { Router } from "express";
import { container } from "tsyringe";
import { Segments, celebrate, Joi } from "celebrate";
import CustomersController from "@modules/customers/controllers/CustomersController";
import { isAuthenticated } from "@shared/http/middlewares/isAuthenticated";

const customerRouter = Router();
const customersController = container.resolve(CustomersController);

customerRouter.use(isAuthenticated);

customerRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    }),
  }),
  (request, response) => {
    return customersController.create(request, response);
  },
);

customerRouter.get(
  "/",
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
      limit: Joi.number(),
    }),
  }),
  (request, response) => {
    return customersController.index(request, response);
  },
);

customerRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  (request, response) => {
    return customersController.show(request, response);
  },
);

customerRouter.put(
  "/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    }),
  }),
  (request, response) => {
    return customersController.update(request, response);
  },
);

customerRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  (request, response) => {
    return customersController.delete(request, response);
  },
);

export { customerRouter };
