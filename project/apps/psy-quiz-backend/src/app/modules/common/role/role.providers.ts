import { DataSource } from 'typeorm';
import { Constants } from '../../../shared';
import { RoleEntity } from './schemas/role.entity';

export const roleProviders = [
  {
    provide: Constants.ROLE_REPOSITORY,
    useFactory: (connection: DataSource) => connection.getRepository(RoleEntity),
    inject: [Constants.DATABASE_CONNECTION]
  }
];
