import { Router } from "express";
import { productsRouter } from "@modules/products/http/routes/products.routes";
import { usersRoutes } from "@modules/users/http/routes/users.routes";
import { sessionsRoutes } from "@modules/users/http/routes/sessions.routes";
import { passwordRouter } from "@modules/users/http/routes/password.routes";
import { profileRoutes } from "@modules/users/http/routes/profile.routes";
import { customerRouter } from "@modules/customers/http/routes/customers.routes";
import { ordersRouter } from "@modules/orders/http/routes/orders.routes";

const routes = Router();

routes.get("/", (request, response) => {
  return response.json({ message: "IAE CABRA VEI SAFADO" });
});

routes.use("/products", productsRouter);
routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use("/password", passwordRouter);
routes.use("/profile", profileRoutes);
routes.use("/customers", customerRouter);
routes.use("/orders", ordersRouter);

export default routes;
