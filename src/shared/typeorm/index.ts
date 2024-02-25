import { DataSource } from "typeorm";
import { CreateProducts1708805224235 } from "./migrations/1708805224235-CreateProducts";
import Product from "@modules/products/typeorm/entities/Product";

const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "docker",
  database: "apivendas",
  entities: [Product],
  migrations: [CreateProducts1708805224235],
});

export default dataSource;
