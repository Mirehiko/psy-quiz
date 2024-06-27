import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/schemas/user.entity';
import { ConnectedUserEntity } from './schemas/connected-user.entity';

@Injectable()
export class ConnectedUserService {
  constructor(
    @InjectRepository(ConnectedUserEntity)
    protected repository: Repository<ConnectedUserEntity>
  ) {}

  async create(socketId: string, user: UserEntity): Promise<ConnectedUserEntity> {
    return this.repository.save({ socketId, user });
  }

  async getUsers(userIds: number[]): Promise<ConnectedUserEntity[]> {
    return await this.repository
      .createQueryBuilder('connectedUser')
      .andWhere('connectedUser.userId IN (:userIds)', { userIds })
      .getMany();
  }

  async findByUser(user: UserEntity): Promise<ConnectedUserEntity[]> {
    return this.repository.find({ where: { user } });
  }

  async deleteBySocketId(socketId: string) {
    return this.repository.delete({ socketId });
  }

  async deleteAll() {
    await this.repository.createQueryBuilder().delete().execute();
  }
}
