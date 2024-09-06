import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserGetParamsData } from '../../../shared';
import { BaseService } from '../../common/base-service';
import { TestEntity } from './schemas/test.entity';
import { TestRequestDto } from '../dto/test.dto';
import { UserEntity } from '../../common/user/schemas/user.entity';

@Injectable()
export class TestService extends BaseService<TestEntity, IUserGetParamsData> {
  protected entityNotFoundMessage: string = 'Нет такого теста';
  protected entityOrRelationNotFoundMessage: string = 'Тест не найден';

  constructor(
    @InjectRepository(TestEntity)
    protected repository: Repository<TestEntity>
  ) {
    super();
  }

  async create(requestDto: TestRequestDto, user: UserEntity): Promise<TestEntity> {
    try {
      const newEntity = await this.repository.create({ ...requestDto, createdById: user.id });
      await this.repository.save(newEntity);
      return newEntity; // 201
    } catch (e) {
      throw new Error(e);
    }
  }

  async update(id: string, requestDto: TestRequestDto): Promise<TestEntity> {
    let entity = await this.repository.findOne({ where: { id } });
    if (!entity) {
      throw new HttpException(this.entityNotFoundMessage, HttpStatus.NOT_FOUND);
    }
    entity.name = requestDto.name ? requestDto.name : entity.name;
    entity.description = requestDto.description ? requestDto.description : entity.description;

    try {
      await this.repository.save(entity);
      return entity;
    } catch (e) {
      throw new Error(e);
    }
  }
}
