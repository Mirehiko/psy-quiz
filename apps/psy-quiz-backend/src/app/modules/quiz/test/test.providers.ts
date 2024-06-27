import {DataSource} from 'typeorm';
import { Constants } from '../../../shared';
import {TestEntity} from "./schemas/test.entity";


export const testProviders = [
  {
    provide: Constants.TEST_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(TestEntity),
    inject: [Constants.DATABASE_CONNECTION],
  },
];
