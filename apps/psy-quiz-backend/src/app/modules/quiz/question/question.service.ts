import {Injectable} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IUserGetParamsData } from '../../../shared';
import {BaseService} from "../../common/base-service";
import {QuestionEntity} from "./schemas/question.entity";
import {QuestionRepository} from "./question-repository";


@Injectable()
export class QuestionService extends BaseService<QuestionEntity, IUserGetParamsData> {
  protected entityNotFoundMessage: string = 'Нет такого вопроса';
  protected entityOrRelationNotFoundMessage: string = 'Вопрос не найден';

  constructor(
    protected repository: QuestionRepository,
  ) {
    super();
  }
}


