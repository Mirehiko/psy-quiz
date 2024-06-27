import {DataSource} from 'typeorm';
import {PermissionEntity} from "./schemas/permission.entity";
import { Constants } from '../../../shared';

export const permissionProviders = [
  {
    provide: Constants.PERMISSION_REPOSITORY,
    useFactory: (connection: DataSource) => connection.getRepository(PermissionEntity),
    inject: [Constants.DATABASE_CONNECTION],
  },
];

