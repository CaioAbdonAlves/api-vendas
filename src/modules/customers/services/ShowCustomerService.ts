import { inject, injectable } from "tsyringe";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";
import Customer from "../typeorm/entities/Customer";
import AppError from "@shared/errors/AppError";

@injectable()
export default class ShowCustomerService {
  constructor(
    @inject("CustomersRepository")
    private customersRepository: CustomersRepository,
  ) {}

  public async execute(id: string): Promise<Customer | null> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError("Customer not found.", 404);
    }

    return customer;
  }
}
