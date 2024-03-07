import Customer from "../entities/Customer";

export type CreateCustomerDTO = {
  name: string;
  email: string;
};

export type PaginateParams = {
  page: number;
  skip: number;
  take: number;
};

export type CustomerPaginatePropierties = {
  per_page: number;
  total: number;
  current_page: number;
  data: Customer[];
};

export interface ICustomersRepository {
  create({ name, email }: CreateCustomerDTO): Promise<Customer>;
  save(customer: Customer): Promise<Customer>;
  findAll({
    page,
    skip,
    take,
  }: PaginateParams): Promise<CustomerPaginatePropierties>;
  findByName(name: string): Promise<Customer | null>;
  findById(id: string): Promise<Customer | null>;
  findByEmail(email: string): Promise<Customer | null>;
  delete(customer: Customer): Promise<void>;
}
