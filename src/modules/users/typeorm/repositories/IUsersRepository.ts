import User from "../entities/User";

export type CreateUserDTO = {
  name: string;
  email: string;
  password: string;
};

export type PaginateParams = {
  page: number;
  skip: number;
  take: number;
};

export type UsersPaginatePropierties = {
  per_page: number;
  total: number;
  current_page: number;
  data: User[];
};

export interface IUsersRepository {
  create({ name, email, password }: CreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
  findAll({
    page,
    skip,
    take,
  }: PaginateParams): Promise<UsersPaginatePropierties>;
  findById(id: string): Promise<User | null>;
  findByName(name: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  delete(user: User): Promise<void>;
}
