import { Connection } from 'typeorm';
import { Constants } from '../../../shared';
import { TestRepository } from './test-repository';

export const testProviders = [
  {
    provide: Constants.TEST_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(TestRepository),
    inject: [Constants.DATABASE_CONNECTION]
  }
];
