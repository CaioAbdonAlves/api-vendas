import dataSource from "@shared/typeorm";
import { Repository } from "typeorm";
import Order from "../entities/Order";
import {
  IOrdersRepository,
  CreateOrderDTO,
  PaginateParams,
  OrderPaginateProperties,
} from "./IOrdersRepository";

export class OrdersRepository implements IOrdersRepository {
  private repository: Repository<Order>;

  constructor() {
    this.repository = dataSource.getRepository(Order);
  }

  async create({ customer, products }: CreateOrderDTO): Promise<Order> {
    const order = this.repository.create({
      customer,
      order_products: products,
    });

    return this.repository.save(order);
  }

  async save(order: Order): Promise<Order> {
    return this.repository.save(order);
  }

  async findAll({
    page,
    skip,
    take,
  }: PaginateParams): Promise<OrderPaginateProperties> {
    const [orders, count] = await this.repository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: orders,
    };

    return result;
  }

  async findById(id: string): Promise<Order | null> {
    return this.repository.findOne({
      where: { id },
      relations: ["order_products", "customer"],
    });
  }

  async delete(order: Order): Promise<void> {
    await this.repository.remove(order);
  }
}
