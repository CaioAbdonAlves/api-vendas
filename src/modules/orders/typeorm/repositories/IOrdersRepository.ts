import Customer from "@modules/customers/typeorm/entities/Customer";
import Order from "../entities/Order";

interface IProduct {
  product_id: string;
  price: number;
  quantity: number;
}

export type CreateOrderDTO = {
  customer: Customer;
  products: IProduct[];
};

export type PaginateParams = {
  page: number;
  skip: number;
  take: number;
};

export type OrderPaginateProperties = {
  per_page: number;
  total: number;
  current_page: number;
  data: Order[];
};

export interface IOrdersRepository {
  create({ customer, products }: CreateOrderDTO): Promise<Order>;
  save(order: Order): Promise<Order>;
  findAll({
    page,
    skip,
    take,
  }: PaginateParams): Promise<OrderPaginateProperties>;
  findById(id: string): Promise<Order | null>;
  delete(order: Order): Promise<void>;
}
