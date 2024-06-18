import { Connection } from 'typeorm';
import { Constants } from '../../../shared';
import { QuestionAnswerRepository } from './question-answer-repository';

export const questionAnswerProviders = [
  {
    provide: Constants.QUESTION_ANSWER_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(QuestionAnswerRepository),
    inject: [Constants.DATABASE_CONNECTION]
  }
];
