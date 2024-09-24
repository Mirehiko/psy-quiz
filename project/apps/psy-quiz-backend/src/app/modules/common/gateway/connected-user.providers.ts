import { Connection, DataSource } from 'typeorm';
import { Constants } from '../../../shared';
import { ConnectedUserEntity } from './schemas/connected-user.entity';

export const connectedUserProviders = [
  {
    provide: Constants.CONNECTED_USER_REPOSITORY,
    useFactory: (connection: DataSource) => connection.getRepository(ConnectedUserEntity),
    inject: [Constants.DATABASE_CONNECTION]
  }
];
