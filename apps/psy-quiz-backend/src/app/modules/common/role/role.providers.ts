import { Connection, Repository } from 'typeorm';
import {RoleEntity} from "./schemas/role.entity";
import { Constants } from '../../../shared';


export const roleProviders = [
  {
    provide: Constants.ROLE_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(RoleEntity),
    inject: [Constants.DATABASE_CONNECTION],
  },
];

