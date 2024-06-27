import {Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {IUserGetParamsData} from '../../../shared';
import {BaseService} from "../../common/base-service";
import {QuestionTypeEntity} from "./schemas/question-type.entity";


@Injectable()
export class QuestionTypeService extends BaseService<QuestionTypeEntity, IUserGetParamsData> {
  protected entityNotFoundMessage: string = 'Нет такого типа вопроса';
  protected entityOrRelationNotFoundMessage: string = 'Тип вопроса не найден';

  constructor(
    @InjectRepository(QuestionTypeEntity)
    protected repository: Repository<QuestionTypeEntity>
  ) {
    super();
  }
}


