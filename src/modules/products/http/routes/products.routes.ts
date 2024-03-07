import { Router } from "express";
import { container } from "tsyringe";
import ProductsController from "@modules/products/controllers/ProductsController";
import { Segments, celebrate, Joi } from "celebrate";

const productsRouter = Router();
const productsController = container.resolve(ProductsController);

productsRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      price: Joi.number().required(),
      quantity: Joi.number().required(),
    }),
  }),
  (request, response) => {
    return productsController.create(request, response);
  },
);

productsRouter.get(
  "/",
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
      limit: Joi.number(),
    }),
  }),
  (request, response) => {
    return productsController.index(request, response);
  },
);

productsRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  (request, response) => {
    return productsController.show(request, response);
  },
);

productsRouter.put(
  "/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required(),
    }),
  }),
  (request, response) => {
    return productsController.update(request, response);
  },
);

productsRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  (request, response) => {
    return productsController.delete(request, response);
  },
);

export { productsRouter };
