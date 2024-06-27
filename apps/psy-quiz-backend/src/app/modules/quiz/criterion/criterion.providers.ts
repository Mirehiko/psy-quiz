import { Connection, DataSource } from 'typeorm';
import { Constants } from '../../../shared';
import { CriterionEntity } from './schemas/criterion.entity';

export const criterionProviders = [
  {
    provide: Constants.CRITERION_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(CriterionEntity),
    inject: [Constants.DATABASE_CONNECTION]
  }
];
