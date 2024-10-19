import { IUserGetParamsData } from '@common/interfaces';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TestRunRequestDto } from '@shared/dto';
import { Repository } from 'typeorm';
import { BaseService } from '../../common/base-service';
import { UserEntity } from '../../common/user/schemas/user.entity';
import { TestRunEntity } from './schemas/test-run.entity';

@Injectable()
export class TestRunService extends BaseService<TestRunEntity, IUserGetParamsData> {
  protected entityNotFoundMessage: string = 'Нет такого прохождения теста';
  protected entityOrRelationNotFoundMessage: string = 'Прохождение теста не найдено';

  constructor(
    @InjectRepository(TestRunEntity)
    protected repository: Repository<TestRunEntity>
  ) {
    super();
  }

  async create(requestDto: TestRunRequestDto, user: UserEntity): Promise<TestRunEntity> {
    try {
      const newEntity = await this.repository.create({ ...requestDto, createdById: user.id });
      await this.repository.save(newEntity);
      return newEntity; // 201
    } catch (e) {
      throw new Error(e);
    }
  }

  async update(id: string, requestDto: TestRunRequestDto): Promise<TestRunEntity> {
    let entity = await this.repository.findOne({ where: { id } });
    if (!entity) {
      throw new HttpException(this.entityNotFoundMessage, HttpStatus.NOT_FOUND);
    }

    entity.userId = requestDto.userId;

    try {
      await this.repository.save(entity);
      return entity;
    } catch (e) {
      throw new Error(e);
    }
  }

  async startRun(id: string, user: UserEntity): Promise<TestRunEntity> {
    let entity = await this.repository.findOne({ where: { id } });
    if (!entity) {
      throw new HttpException(this.entityNotFoundMessage, HttpStatus.NOT_FOUND);
    }

    if (entity.startDate !== undefined) {
      return entity; // todo: return error?
    }

    if (entity.userId !== user.id) {
      return entity;
    }

    entity.startDate = new Date();

    try {
      await this.repository.save(entity);
      return entity;
    } catch (e) {
      throw new Error(e);
    }
  }

  async finishRun(id: string, user: UserEntity): Promise<TestRunEntity> {
    let entity = await this.repository.findOne({ where: { id } });
    if (!entity) {
      throw new HttpException(this.entityNotFoundMessage, HttpStatus.NOT_FOUND);
    }

    if (entity.endDate !== undefined) {
      return entity; // todo: return error?
    }

    if (entity.userId !== user.id) {
      return entity;
    }

    entity.endDate = new Date();

    try {
      await this.repository.save(entity);
      return entity;
    } catch (e) {
      throw new Error(e);
    }
  }
}
