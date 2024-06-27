import {DataSource} from 'typeorm';
import { Constants } from '../../../shared';
import {TestRunEntity} from "./schemas/test-run.entity";


export const testRunProviders = [
  {
    provide: Constants.TEST_RUN_REPOSITORY,
    useFactory: (connection: DataSource) => connection.getRepository(TestRunEntity),
    inject: [Constants.DATABASE_CONNECTION],
  },
];
