import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { IUserGetParamsData } from '../../../shared';
import { BaseService } from '../../common/base-service';
import { QuestionEntity } from './schemas/question.entity';

@Injectable()
export class QuestionService extends BaseService<QuestionEntity, IUserGetParamsData> {
  protected entityNotFoundMessage: string = 'Нет такого вопроса';
  protected entityOrRelationNotFoundMessage: string = 'Вопрос не найден';

  constructor(
    @InjectRepository(QuestionEntity)
    protected repository: Repository<QuestionEntity>
  ) {
    super();
  }
}
