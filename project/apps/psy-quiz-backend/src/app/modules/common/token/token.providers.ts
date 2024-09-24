import { Connection, DataSource } from 'typeorm';
import { Constants } from '../../../shared';
import { UserToken } from './schemas/user-token.entity';

export const tokenProviders = [
  {
    provide: Constants.USER_TOKEN_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(UserToken),
    inject: [Constants.DATABASE_CONNECTION]
  }
];
