import {DataSource} from 'typeorm';
import { Constants } from '../../../shared';
import {ScaleAnswerEntity} from "./schemas/scale-answer.entity";


export const scaleAnswerProviders = [
  {
    provide: Constants.SCALE_ANSWER_REPOSITORY,
    useFactory: (connection: DataSource) => connection.getRepository(ScaleAnswerEntity),
    inject: [Constants.DATABASE_CONNECTION],
  },
];

