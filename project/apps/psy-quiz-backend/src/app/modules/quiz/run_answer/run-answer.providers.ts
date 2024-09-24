import { DataSource } from 'typeorm';
import { Constants } from '../../../shared';
import { RunAnswerEntity } from './schemas/run-answer.entity';

export const runAnswerProviders = [
  {
    provide: Constants.RUN_ANSWER_REPOSITORY,
    useFactory: (connection: DataSource) => connection.getRepository(RunAnswerEntity),
    inject: [Constants.DATABASE_CONNECTION]
  }
];
