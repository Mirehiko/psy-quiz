import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserGetParamsData } from '../../../shared';
import { BaseService } from '../../common/base-service';
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
}
