import { Connection } from 'typeorm';
import { Constants } from '../../../shared';
import {RunAnswerRepository} from "./run-answer-repository";


export const runAnswerProviders = [
  {
    provide: Constants.RUN_ANSWER_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(RunAnswerRepository),
    inject: [Constants.DATABASE_CONNECTION],
  },
];
