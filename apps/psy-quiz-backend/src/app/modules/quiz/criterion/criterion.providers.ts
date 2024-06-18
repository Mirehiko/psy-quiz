import { Connection } from 'typeorm';
import { Constants } from '../../../shared';
import { CriterionRepository } from './criterion-repository';

export const criterionProviders = [
  {
    provide: Constants.CRITERION_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(CriterionRepository),
    inject: [Constants.DATABASE_CONNECTION]
  }
];
