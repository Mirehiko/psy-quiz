import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserGetParamsData } from '../../../shared';
import { BaseService } from '../../common/base-service';
import { CriterionEntity } from './schemas/criterion.entity';

@Injectable()
export class CriterionService extends BaseService<CriterionEntity, IUserGetParamsData> {
  protected entityNotFoundMessage: string = 'Нет такого критерия';
  protected entityOrRelationNotFoundMessage: string = 'Критерий не найден';

  constructor(
    @InjectRepository(CriterionEntity)
    protected repository: Repository<CriterionEntity>
  ) {
    super();
  }
}
