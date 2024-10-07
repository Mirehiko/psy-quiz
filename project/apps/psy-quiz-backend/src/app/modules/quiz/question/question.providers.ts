import { DataSource } from 'typeorm';
import { Constants } from '../../../shared';
import { QuestionEntity } from './schemas/question.entity';

export const questionProviders = [
  {
    provide: Constants.QUESTION_REPOSITORY,
    useFactory: (connection: DataSource) => connection.getRepository(QuestionEntity),
    inject: [Constants.DATABASE_CONNECTION]
  }
];
