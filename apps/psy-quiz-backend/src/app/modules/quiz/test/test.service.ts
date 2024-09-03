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

  async create(test: TestRequestDto, user: UserEntity): Promise<TestEntity> {
    try {
      const newTest = await this.repository.create({ ...test, createdBy: user });
      await this.repository.save(newTest);
      return newTest; // 201
    } catch (e) {
      throw new Error(e);
    }
  }

  async update(id: string, requestDto: TestRequestDto): Promise<TestEntity> {
    let test = await this.repository.findOne({ where: { id } });
    if (!test) {
      throw new HttpException(this.entityNotFoundMessage, HttpStatus.NOT_FOUND);
    }
    test.name = requestDto.name ? requestDto.name : test.name;
    test.description = requestDto.description ? requestDto.description : test.description;

    try {
      await this.repository.save(test);
      return test;
    } catch (e) {
      throw new Error(e);
    }
  }
}
