import { Connection } from 'typeorm';
import { Constants } from '../../../shared';
import { QuestionTypeRepository } from './question-type-repository';

export const questionTypeProviders = [
  {
    provide: Constants.QUESTION_TYPE_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(QuestionTypeRepository),
    inject: [Constants.DATABASE_CONNECTION]
  }
];
