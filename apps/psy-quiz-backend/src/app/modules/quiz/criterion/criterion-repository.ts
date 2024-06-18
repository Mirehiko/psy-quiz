import { EntityRepository, Repository } from 'typeorm';
import { CriterionEntity } from './schemas/criterion.entity';

@EntityRepository(CriterionEntity)
export class CriterionRepository extends Repository<CriterionEntity> {}
