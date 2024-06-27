import {Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {IUserGetParamsData} from '../../../shared';
import {BaseService} from "../../common/base-service";
import {RunAnswerEntity} from "./schemas/run-answer.entity";


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


