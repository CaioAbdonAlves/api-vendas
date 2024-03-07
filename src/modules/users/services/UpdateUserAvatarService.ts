import { inject, injectable } from "tsyringe";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import User from "../typeorm/entities/User";
import AppError from "@shared/errors/AppError";
import DiskStorageProvider from "@shared/providers/StorageProvider/DiskStorageProvider";
import S3StorageProvider from "@shared/providers/StorageProvider/S3StorageProvider";
import uploadConfig from "@config/upload";

type UpdateAvatarDTO = {
  id: string;
  avatarFileName: string;
};

@injectable()
export class UpdateUserAvatarService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository,
  ) {}

  async execute({ id, avatarFileName }: UpdateAvatarDTO): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError("Only authenticated users can change avatar", 401);
    }

    if (uploadConfig.driver == "s3") {
      const s3Provider = new S3StorageProvider();

      if (user.avatar) {
        await s3Provider.deleteFile(user.avatar);
      }

      const fileName = await s3Provider.saveFile(avatarFileName);
      user.avatar = fileName;
    } else {
      const diskProvider = new DiskStorageProvider();

      if (user.avatar) {
        await diskProvider.deleteFile(user.avatar);
      }

      const fileName = await diskProvider.saveFile(avatarFileName);
      user.avatar = fileName;
    }

    return this.usersRepository.save(user);
  }
}
