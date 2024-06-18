import { Injectable } from '@nestjs/common';
import { ConnectedUserRepository } from './connected-user-repository';
import { ConnectedUserEntity } from './schemas/connected-user.entity';
import { UserEntity } from '../user/schemas/user.entity';


@Injectable()
export class ConnectedUserService {
  constructor(
    private readonly repository: ConnectedUserRepository,
  ) { }

  async create(socketId: string, user: UserEntity): Promise<ConnectedUserEntity> {
    return this.repository.save({ socketId, user });
  }

  async getUsers(userIds: number[]): Promise<ConnectedUserEntity[]> {
    return await this.repository.createQueryBuilder('connectedUser')
      .andWhere('connectedUser.userId IN (:userIds)', { userIds })
      .getMany();
  }

  async findByUser(user: UserEntity): Promise<ConnectedUserEntity[]> {
    return this.repository.find({where: {user}});
  }

  async deleteBySocketId(socketId: string) {
    return this.repository.delete({ socketId });
  }

  async deleteAll() {
    await this.repository
      .createQueryBuilder()
      .delete()
      .execute();
  }
}
