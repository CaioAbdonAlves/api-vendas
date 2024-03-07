import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import { OrdersRepository } from "../typeorm/repositories/OrdersRepository";
import Order from "../typeorm/entities/Order";

interface IRequest {
  id: string;
}

@injectable()
class ShowOrderService {
  constructor(
    @inject("OrdersRepository")
    private ordersRepository: OrdersRepository,
  ) {}

  async execute({ id }: IRequest): Promise<Order> {
    const order = await this.ordersRepository.findById(id);

    if (!order) {
      throw new AppError("Order not found.", 404);
    }

    return order;
  }
}

export default ShowOrderService;
