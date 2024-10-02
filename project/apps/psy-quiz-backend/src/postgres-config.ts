import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as process from 'node:process';

require('dotenv').config();

export const postgresConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT!),
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  synchronize: true, // todo: заменить на начальную миграцию
  migrationsRun: true,
  autoLoadEntities: true
};
