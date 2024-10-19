import { IUserGetParamsData } from '@common/interfaces';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../common/base-service';
import { RunAnswerEntity } from './schemas/run-answer.entity';

@Injectable()
export class RunAnswerService extends BaseService<RunAnswerEntity, IUserGetParamsData> {
  protected entityNotFoundMessage: string = 'Нет такого ответа';
  protected entityOrRelationNotFoundMessage: string = 'Ответ не найден';

  constructor(
    @InjectRepository(RunAnswerEntity)
    protected repository: Repository<RunAnswerEntity>
  ) {
    super();
  }
}
