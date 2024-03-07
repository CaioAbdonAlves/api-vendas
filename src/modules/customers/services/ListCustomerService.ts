import { inject, injectable } from "tsyringe";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";
import { CustomerPaginatePropierties } from "../typeorm/repositories/ICustomersRepository";

type ListCustomersParams = {
  page: number;
  limit: number;
};

@injectable()
export default class ListCustomerService {
  constructor(
    @inject("CustomersRepository")
    private customersRepository: CustomersRepository,
  ) {}

  public async execute({
    page,
    limit,
  }: ListCustomersParams): Promise<CustomerPaginatePropierties> {
    const take = limit;
    const skip = (Number(page) - 1) * take;

    return await this.customersRepository.findAll({ page, skip, take });
  }
}
