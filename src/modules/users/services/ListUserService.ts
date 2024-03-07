import { inject, injectable } from "tsyringe";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import { UsersPaginatePropierties } from "../typeorm/repositories/IUsersRepository";

type ListParams = {
  page: number;
  limit: number;
};

@injectable()
export default class ListUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    page,
    limit,
  }: ListParams): Promise<UsersPaginatePropierties> {
    const take = limit;
    const skip = (Number(page) - 1) * take;

    return this.usersRepository.findAll({ page, skip, take });
  }
}
