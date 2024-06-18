import { Injectable } from '@nestjs/common';
import { IUserGetParamsData } from '../../../shared';
import { BaseService } from '../../common/base-service';
import { TestRunEntity } from './schemas/test-run.entity';
import { TestRunRepository } from './test-run-repository';

@Injectable()
export class TestRunService extends BaseService<TestRunEntity, IUserGetParamsData> {
  protected entityNotFoundMessage: string = 'Нет такого прохождения теста';
  protected entityOrRelationNotFoundMessage: string = 'Прохождение теста не найдено';

  constructor(protected repository: TestRunRepository) {
    super();
  }
}
