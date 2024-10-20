import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as process from 'node:process';

require('dotenv').config();

export const postgresConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DB_URL,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT!),
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  synchronize: false, // todo: заменить на начальную миграцию
  migrationsRun: true,
  migrationsTransactionMode: 'each',
  autoLoadEntities: true
};
