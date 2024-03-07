import { DataSource } from "typeorm";
import { CreateProducts1708805224235 } from "./migrations/1708805224235-CreateProducts";
import Product from "@modules/products/typeorm/entities/Product";
import { CreateUsers1709073695871 } from "./migrations/1709073695871-CreateUsers";
import User from "@modules/users/typeorm/entities/User";
import { CreateUserTokens1709410957981 } from "./migrations/1709410957981-CreateUserTokens";
import UserToken from "@modules/users/typeorm/entities/UserToken";
import { CreateCustomers1709519647948 } from "./migrations/1709519647948-CreateCustomers";
import Customer from "@modules/customers/typeorm/entities/Customer";
import { CreateOrders1709589049298 } from "./migrations/1709589049298-CreateOrders";
import { AddCustomerIdToOrders1709589752976 } from "./migrations/1709589752976-AddCustomerIdToOrders";
import { CreateOrdersProducts1709596890264 } from "./migrations/1709596890264-CreateOrdersProducts";
import { AddOrderIdToOrdersProducts1709597365582 } from "./migrations/1709597365582-AddOrderIdToOrdersProducts";
import { AddProductIdToOrdersProducts1709597678282 } from "./migrations/1709597678282-AddProductIdToOrdersProducts";
import Order from "@modules/orders/typeorm/entities/Order";
import OrdersProducts from "@modules/orders/typeorm/entities/OrdersProducts";

const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "docker",
  database: "apivendas",
  entities: [Product, User, UserToken, Customer, Order, OrdersProducts],
  migrations: [
    CreateProducts1708805224235,
    CreateUsers1709073695871,
    CreateUserTokens1709410957981,
    CreateCustomers1709519647948,
    CreateOrders1709589049298,
    AddCustomerIdToOrders1709589752976,
    CreateOrdersProducts1709596890264,
    AddOrderIdToOrdersProducts1709597365582,
    AddProductIdToOrdersProducts1709597678282,
  ],
});

export default dataSource;
