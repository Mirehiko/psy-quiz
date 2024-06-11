import { Connection, Repository } from 'typeorm';
import {Role} from "./schemas/role.entity";
import { Constants } from '../../../shared';


export const roleProviders = [
  {
    provide: Constants.ROLE_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(Role),
    inject: [Constants.DATABASE_CONNECTION],
  },
];

