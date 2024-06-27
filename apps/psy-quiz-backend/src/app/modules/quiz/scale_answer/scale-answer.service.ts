import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserGetParamsData } from '../../../shared';
import { BaseService } from '../../common/base-service';
import { ScaleAnswerEntity } from './schemas/scale-answer.entity';

@Injectable()
export class ScaleAnswerService extends BaseService<ScaleAnswerEntity, IUserGetParamsData> {
  protected entityNotFoundMessage: string = 'Нет такого варианта ответа';
  protected entityOrRelationNotFoundMessage: string = 'Ответ не найден';

  constructor(
    @InjectRepository(ScaleAnswerEntity)
    protected repository: Repository<ScaleAnswerEntity>
  ) {
    super();
  }
}
