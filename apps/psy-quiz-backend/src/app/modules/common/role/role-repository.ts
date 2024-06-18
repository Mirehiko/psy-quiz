import { EntityRepository, Repository } from 'typeorm';
import { RoleEntity } from './schemas/role.entity';

@EntityRepository(RoleEntity)
export class RoleRepository extends Repository<RoleEntity> {}
