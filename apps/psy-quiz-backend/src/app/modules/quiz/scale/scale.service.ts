import { Injectable } from '@nestjs/common';
import { IUserGetParamsData } from '../../../shared';
import { BaseService } from '../../common/base-service';
import { ScaleRepository } from './scale-repository';
import { ScaleEntity } from './schemas/scale.entity';

@Injectable()
export class ScaleService extends BaseService<ScaleEntity, IUserGetParamsData> {
  protected entityNotFoundMessage: string = 'Нет такой шкалы оценки';
  protected entityOrRelationNotFoundMessage: string = 'Шкала оценки не найдена';

  constructor(protected repository: ScaleRepository) {
    super();
  }
}
