import {Injectable} from '@nestjs/common';
import { IUserGetParamsData } from '../../../shared';
import {BaseService} from "../../common/base-service";
import {QuestionAnswerEntity} from "./schemas/question-answer.entity";
import {QuestionAnswerRepository} from "./question-answer-repository";


@Injectable()
export class QuestionAnswerService extends BaseService<QuestionAnswerEntity, IUserGetParamsData> {
  protected entityNotFoundMessage: string = 'Нет такого ответа';
  protected entityOrRelationNotFoundMessage: string = 'Ответ не найден';

  constructor(
    protected repository: QuestionAnswerRepository,
  ) {
    super();
  }
}


