import {Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {IUserGetParamsData} from '../../../shared';
import {BaseService} from "../../common/base-service";
import {QuestionAnswerEntity} from "./schemas/question-answer.entity";


@Injectable()
export class QuestionAnswerService extends BaseService<QuestionAnswerEntity, IUserGetParamsData> {
  protected entityNotFoundMessage: string = 'Нет такого ответа';
  protected entityOrRelationNotFoundMessage: string = 'Ответ не найден';

  constructor(
    @InjectRepository(QuestionAnswerEntity)
    protected repository: Repository<QuestionAnswerEntity>
  ) {
    super();
  }
}


