import { inject, injectable } from "tsyringe";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";
import AppError from "@shared/errors/AppError";

@injectable()
export default class DeleteCustomerService {
  constructor(
    @inject("CustomersRepository")
    private customersRepository: CustomersRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError("Customer not found.", 404);
    }

    await this.customersRepository.delete(customer);
  }
}
