import { Connection } from 'typeorm';
import { Constants } from '../../../shared';
import { ScaleAnswerRepository } from './scale-answer-repository';

export const scaleAnswerProviders = [
  {
    provide: Constants.SCALE_ANSWER_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(ScaleAnswerRepository),
    inject: [Constants.DATABASE_CONNECTION]
  }
];
