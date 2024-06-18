import { Connection } from 'typeorm';
import { Constants } from '../../../shared';
import { QuestionRepository } from './question-repository';

export const questionProviders = [
  {
    provide: Constants.QUESTION_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(QuestionRepository),
    inject: [Constants.DATABASE_CONNECTION]
  }
];
