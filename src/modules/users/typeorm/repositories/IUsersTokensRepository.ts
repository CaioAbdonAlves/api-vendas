import UserToken from "../entities/UserToken";

export type CreateUserTokenDTO = {
  user_id: string;
};

export interface IUsersTokensRepository {
  generate({ user_id }: CreateUserTokenDTO): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken | null>;
}
