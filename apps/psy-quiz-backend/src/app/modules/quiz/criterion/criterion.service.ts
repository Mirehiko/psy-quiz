import { Injectable } from '@nestjs/common';
import { IUserGetParamsData } from '../../../shared';
import { BaseService } from '../../common/base-service';
import { CriterionRepository } from './criterion-repository';
import { CriterionEntity } from './schemas/criterion.entity';

@Injectable()
export class CriterionService extends BaseService<CriterionEntity, IUserGetParamsData> {
  protected entityNotFoundMessage: string = 'Нет такого критерия';
  protected entityOrRelationNotFoundMessage: string = 'Критерий не найден';

  constructor(protected repository: CriterionRepository) {
    super();
  }
}
