import { DataSource, DataSourceOptions } from 'typeorm';
import { postgresConfig } from '../../postgres-config';
import { registerAs } from '@nestjs/config';

export default registerAs('typeorm', () => postgresConfig);
export const ConnectionSource = new DataSource(postgresConfig as DataSourceOptions);
