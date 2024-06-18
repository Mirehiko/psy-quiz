import { Injectable } from '@nestjs/common';
import { IUserGetParamsData } from '../../../shared';
import { BaseService } from '../../common/base-service';
import { ScaleAnswerRepository } from './scale-answer-repository';
import { ScaleAnswerEntity } from './schemas/scale-answer.entity';

@Injectable()
export class ScaleAnswerService extends BaseService<ScaleAnswerEntity, IUserGetParamsData> {
  protected entityNotFoundMessage: string = 'Нет такого варианта ответа';
  protected entityOrRelationNotFoundMessage: string = 'Ответ не найден';

  constructor(protected repository: ScaleAnswerRepository) {
    super();
  }
}
