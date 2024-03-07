import { inject, injectable } from "tsyringe";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";
import { CreateCustomerDTO } from "../typeorm/repositories/ICustomersRepository";
import Customer from "../typeorm/entities/Customer";
import AppError from "@shared/errors/AppError";

@injectable()
export default class CreateCustomerService {
  constructor(
    @inject("CustomersRepository")
    private customersRepository: CustomersRepository,
  ) {}

  public async execute({ name, email }: CreateCustomerDTO): Promise<Customer> {
    const customerExist = await this.customersRepository.findByEmail(email);

    if (customerExist) {
      throw new AppError("Email address already used.");
    }

    const customer = await this.customersRepository.create({ name, email });

    return customer;
  }
}
