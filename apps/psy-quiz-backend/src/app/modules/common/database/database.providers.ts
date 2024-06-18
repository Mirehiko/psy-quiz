import { createConnection } from 'typeorm';
import { Constants } from '../../../shared';

export const databaseProviders = [
  {
    provide: Constants.DATABASE_CONNECTION,
    useFactory: async () =>
      await createConnection({
        type: 'mysql',
        host: 'localhost',
        port: 3307,
        username: 'root',
        password: 'psd',
        database: 'psy-quiz',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        // migrations: [
        //   "src/migration/**/*.ts"
        // ],
        // subscribers: [
        //   "src/subscriber/**/*.ts"
        // ],
        // synchronize: true,
        synchronize: false
      })
  }
];
