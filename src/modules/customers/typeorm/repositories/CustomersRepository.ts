import dataSource from "@shared/typeorm";
import { Repository } from "typeorm";
import Customer from "../entities/Customer";
import {
  CreateCustomerDTO,
  CustomerPaginatePropierties,
  ICustomersRepository,
  PaginateParams,
} from "./ICustomersRepository";

export default class CustomersRepository implements ICustomersRepository {
  private repository: Repository<Customer>;

  constructor() {
    this.repository = dataSource.getRepository(Customer);
  }

  public async create({ name, email }: CreateCustomerDTO): Promise<Customer> {
    const user = this.repository.create({ name, email });

    return this.repository.save(user);
  }

  public async save(customer: Customer): Promise<Customer> {
    return this.repository.save(customer);
  }

  public async findAll({
    page,
    skip,
    take,
  }: PaginateParams): Promise<CustomerPaginatePropierties> {
    const [customers, count] = await this.repository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: customers,
    };

    return result;
  }

  public async findByName(name: string): Promise<Customer | null> {
    const customer = await this.repository.findOneBy({ name });

    return customer;
  }

  public async findById(id: string): Promise<Customer | null> {
    const customer = await this.repository.findOneBy({ id });

    return customer;
  }

  public async findByEmail(email: string): Promise<Customer | null> {
    const customer = await this.repository.findOneBy({ email });

    return customer;
  }

  public async delete(customer: Customer): Promise<void> {
    await this.repository.remove(customer);
  }
}
