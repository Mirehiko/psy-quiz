import {DataSource} from 'typeorm';
import {UserEntity} from "./schemas/user.entity";
import { Constants } from '../../../shared';

export const userProviders = [
  {
    provide: Constants.USER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(UserEntity),
    inject: [Constants.DATABASE_CONNECTION],
  },
];
