import { Connection } from 'typeorm';
import { Constants } from '../../../shared';
import {TestRunRepository} from "./test-run-repository";


export const testRunProviders = [
  {
    provide: Constants.TEST_RUN_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(TestRunRepository),
    inject: [Constants.DATABASE_CONNECTION],
  },
];
