import {Connection, DataSource} from 'typeorm';
import { ConnectedUserEntity } from './schemas/connected-user.entity';
import { Constants } from '../../../shared';


export const connectedUserProviders = [
  {
    provide: Constants.CONNECTED_USER_REPOSITORY,
    useFactory: (connection: DataSource) => connection.getRepository(ConnectedUserEntity),
    inject: [Constants.DATABASE_CONNECTION],
  },
];
