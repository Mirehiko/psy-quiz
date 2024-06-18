import { Connection } from 'typeorm';
import { Constants } from '../../../shared';
import { UserEntity } from './schemas/user.entity';

export const userProviders = [
  {
    provide: Constants.USER_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(UserEntity),
    inject: [Constants.DATABASE_CONNECTION]
  }
];
