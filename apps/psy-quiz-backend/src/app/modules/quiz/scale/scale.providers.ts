import { DataSource } from 'typeorm';
import { Constants } from '../../../shared';
import { ScaleEntity } from './schemas/scale.entity';

export const scaleProviders = [
  {
    provide: Constants.SCALE_REPOSITORY,
    useFactory: (connection: DataSource) => connection.getRepository(ScaleEntity),
    inject: [Constants.DATABASE_CONNECTION]
  }
];
