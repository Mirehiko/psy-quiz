import { Injectable } from '@nestjs/common';
import { IUserGetParamsData } from '../../../shared';
import { BaseService } from '../../common/base-service';
import { RunAnswerRepository } from './run-answer-repository';
import { RunAnswerEntity } from './schemas/run-answer.entity';

@Injectable()
export class RunAnswerService extends BaseService<RunAnswerEntity, IUserGetParamsData> {
  protected entityNotFoundMessage: string = 'Нет такого ответа';
  protected entityOrRelationNotFoundMessage: string = 'Ответ не найден';

  constructor(protected repository: RunAnswerRepository) {
    super();
  }
}
