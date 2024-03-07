import { Router } from "express";
import { container } from "tsyringe";
import OrdersController from "@modules/orders/controllers/OrdersController";
import { Segments, celebrate, Joi } from "celebrate";
import { isAuthenticated } from "@shared/http/middlewares/isAuthenticated";

const ordersRouter = Router();
const productsController = container.resolve(OrdersController);

ordersRouter.use(isAuthenticated);

ordersRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      customer_id: Joi.string().uuid().required(),
      products: Joi.array().required(),
    }),
  }),
  (request, response) => {
    return productsController.create(request, response);
  },
);

ordersRouter.get(
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

export { ordersRouter };
