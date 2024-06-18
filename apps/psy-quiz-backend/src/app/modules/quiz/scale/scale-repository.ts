import { EntityRepository, Repository } from 'typeorm';
import { ScaleEntity } from './schemas/scale.entity';

@EntityRepository(ScaleEntity)
export class ScaleRepository extends Repository<ScaleEntity> {}
