import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserGetParamsData } from '../../../shared';
import { BaseService } from '../../common/base-service';
import { ScaleEntity } from './schemas/scale.entity';

@Injectable()
export class ScaleService extends BaseService<ScaleEntity, IUserGetParamsData> {
  protected entityNotFoundMessage: string = 'Нет такой шкалы оценки';
  protected entityOrRelationNotFoundMessage: string = 'Шкала оценки не найдена';

  constructor(
    @InjectRepository(ScaleEntity)
    protected repository: Repository<ScaleEntity>
  ) {
    super();
  }
}
