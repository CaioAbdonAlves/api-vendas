import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";
import Customer from "../typeorm/entities/Customer";

type UpdateProductDTO = {
  id: string;
  name: string;
  email: string;
};

@injectable()
class UpdateCustomerService {
  constructor(
    @inject("CustomersRepository")
    private customersRepository: CustomersRepository,
  ) {}

  async execute({ id, name, email }: UpdateProductDTO): Promise<Customer> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError("Customer not found", 404);
    }

    const customerWithSameEmail =
      await this.customersRepository.findByEmail(email);

    if (
      customerWithSameEmail &&
      customer.email !== customerWithSameEmail.email
    ) {
      throw new AppError("Customer email already in use");
    }

    customer.name = name;
    customer.email = email;

    return this.customersRepository.save(customer);
  }
}

export default UpdateCustomerService;
