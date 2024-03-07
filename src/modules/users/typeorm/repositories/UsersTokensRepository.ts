import dataSource from "@shared/typeorm";
import { Repository } from "typeorm";
import UserToken from "../entities/UserToken";
import {
  CreateUserTokenDTO,
  IUsersTokensRepository,
} from "./IUsersTokensRepository";

class UsersTokensRepository implements IUsersTokensRepository {
  private readonly usersTokens: Repository<UserToken>;

  constructor() {
    this.usersTokens = dataSource.getRepository(UserToken);
  }

  async generate({ user_id }: CreateUserTokenDTO): Promise<UserToken> {
    const userToken = this.usersTokens.create({ user_id });

    return this.usersTokens.save(userToken);
  }

  async findByToken(token: string): Promise<UserToken | null> {
    const userToken = this.usersTokens.findOneBy({ token });

    return userToken;
  }
}

export default UsersTokensRepository;
