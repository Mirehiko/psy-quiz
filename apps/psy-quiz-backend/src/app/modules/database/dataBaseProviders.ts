import {DataSource} from "typeorm";
import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigService} from "@nestjs/config";

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT) || 3306,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        // migrationsRun: true,
        // autoLoadEntities: true,
        charset: 'UTF8',
        // migrations: [
        //   "src/migration/**/*.ts"
        // ],
      })

      return dataSource.initialize().then(() => {
        // here you can start to work with your database
      })
        .catch((error) => console.log(error))
    },
  },
];

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        console.warn(__dirname)
        return {
          type: 'mysql',
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT) || 3306,
          username: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
          // migrationsRun: true,
          // autoLoadEntities: true,
          charset: 'UTF8',
          // migrations: [
          //   "src/migration/**/*.ts"
          // ],
        }
      },
      inject: [ConfigService],
    }),
  ]
  // providers: [...databaseProviders],
  // exports: [...databaseProviders],
})
export class DatabaseModule {}
