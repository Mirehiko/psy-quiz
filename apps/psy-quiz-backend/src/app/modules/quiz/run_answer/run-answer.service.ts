import {Injectable} from '@nestjs/common';
import { IUserGetParamsData } from '../../../shared';
import {BaseService} from "../../common/base-service";
import {RunAnswerEntity} from "./schemas/run-answer.entity";
import {RunAnswerRepository} from "./run-answer-repository";


@Injectable()
export class RunAnswerService extends BaseService<RunAnswerEntity, IUserGetParamsData> {
  protected entityNotFoundMessage: string = 'Нет такого ответа';
  protected entityOrRelationNotFoundMessage: string = 'Ответ не найден';

  constructor(
    protected repository: RunAnswerRepository,
  ) {
    super();
  }
}


