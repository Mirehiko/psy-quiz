import { EntityRepository, Repository } from 'typeorm';
import { PermissionEntity } from './schemas/permission.entity';


@EntityRepository(PermissionEntity)
export class PermissionRepository extends Repository<PermissionEntity> {}
