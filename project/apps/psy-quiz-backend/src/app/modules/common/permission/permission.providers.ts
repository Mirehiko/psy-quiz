import { DataSource } from 'typeorm';
import { Constants } from '../../../shared';
import { PermissionEntity } from './schemas/permission.entity';

export const permissionProviders = [
  {
    provide: Constants.PERMISSION_REPOSITORY,
    useFactory: (connection: DataSource) => connection.getRepository(PermissionEntity),
    inject: [Constants.DATABASE_CONNECTION]
  }
];
