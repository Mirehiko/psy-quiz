import { Injectable } from '@nestjs/common';
import { IUserGetParamsData } from '../../../shared';
import { BaseService } from '../../common/base-service';
import { QuestionTypeRepository } from './question-type-repository';
import { QuestionTypeEntity } from './schemas/question-type.entity';

@Injectable()
export class QuestionTypeService extends BaseService<QuestionTypeEntity, IUserGetParamsData> {
  protected entityNotFoundMessage: string = 'Нет такого типа вопроса';
  protected entityOrRelationNotFoundMessage: string = 'Тип вопроса не найден';

  constructor(protected repository: QuestionTypeRepository) {
    super();
  }
}
