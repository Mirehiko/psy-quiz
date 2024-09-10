// import { Module } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { DataSource } from 'typeorm';
//
// export const databaseProviders = [
//   {
//     provide: 'DATA_SOURCE',
//     useFactory: async () => {
//       const dataSource = new DataSource({
//         type: 'postgres',
//         host: process.env.DB_HOST,
//         port: parseInt(process.env.DB_PORT) || 3308,
//         username: process.env.DB_USER,
//         password: process.env.DB_PASSWORD,
//         database: process.env.DB_NAME,
//         entities: [__dirname + '/../**/*.entity{.ts,.js}'],
//         synchronize: true,
//         // migrationsRun: true,
//         // autoLoadEntities: true,
//         // migrations: [
//         //   "src/migration/**/*.ts"
//         // ],
//       });
//
//       return dataSource
//         .initialize()
//         .then(() => {
//           // here you can start to work with your database
//         })
//         .catch((error) => console.log(error));
//     }
//   }
// ];
//
// @Module({
//   imports: [
//     TypeOrmModule.forRootAsync({
//       useFactory: async (configService: ConfigService) => {
//         return {
//           type: 'postgress',
//           host: process.env.DB_HOST,
//           port: parseInt(process.env.DB_PORT) || 3308,
//           username: process.env.DB_USER,
//           password: process.env.DB_PASSWORD,
//           database: process.env.DB_NAME,
//           synchronize: true,
//           // migrationsRun: true,
//           // autoLoadEntities: true,
//           // migrations: [
//           //   "src/migration/**/*.ts"
//           // ],
//         };
//       },
//       inject: [ConfigService]
//     })
//   ]
//   // providers: [...databaseProviders],
//   // exports: [...databaseProviders],
// })
// export class DatabaseModule {}
