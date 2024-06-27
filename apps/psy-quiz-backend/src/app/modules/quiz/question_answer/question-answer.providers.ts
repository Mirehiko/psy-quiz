import {DataSource} from 'typeorm';
import { Constants } from '../../../shared';
import {QuestionAnswerEntity} from "./schemas/question-answer.entity";


export const questionAnswerProviders = [
  {
    provide: Constants.QUESTION_ANSWER_REPOSITORY,
    useFactory: (connection: DataSource) => connection.getRepository(QuestionAnswerEntity),
    inject: [Constants.DATABASE_CONNECTION],
  },
];
