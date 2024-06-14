import { Connection } from 'typeorm';
import { Constants } from '../../../shared';
import {ScaleRepository} from "./scale-repository";


export const scaleProviders = [
  {
    provide: Constants.SCALE_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(ScaleRepository),
    inject: [Constants.DATABASE_CONNECTION],
  },
];
