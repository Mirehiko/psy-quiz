import { Connection } from 'typeorm';
import {UserEntity} from "./schemas/user.entity";
import { Constants } from '../../../shared';


export const userProviders = [
  {
    provide: Constants.USER_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(UserEntity),
    inject: [Constants.DATABASE_CONNECTION],
  },
];
