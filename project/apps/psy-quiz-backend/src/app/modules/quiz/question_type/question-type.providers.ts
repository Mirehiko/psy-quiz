import { DataSource } from 'typeorm';
import { Constants } from '../../../shared';
import { QuestionTypeEntity } from './schemas/question-type.entity';

export const questionTypeProviders = [
  {
    provide: Constants.QUESTION_TYPE_REPOSITORY,
    useFactory: (connection: DataSource) => connection.getRepository(QuestionTypeEntity),
    inject: [Constants.DATABASE_CONNECTION]
  }
];
