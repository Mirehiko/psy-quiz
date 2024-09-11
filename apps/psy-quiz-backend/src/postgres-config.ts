import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const postgresConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!) || 3308,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // entities: [__dirname + '/**/*.entity{.ts,.js}'],
  // migrations: [__dirname + '/migrations/*{.ts,.js}'],
  migrations: ['migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  synchronize: false,
  migrationsRun: true,
  autoLoadEntities: true,
}

