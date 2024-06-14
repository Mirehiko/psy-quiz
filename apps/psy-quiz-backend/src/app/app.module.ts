import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import * as path from 'node:path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { Connection } from 'typeorm';
import { configModule } from './config/configure.root';
import { LoggingMiddleware } from './middleware';
import { UserModule } from './modules/common/user/user.module';
import { TokenModule } from './modules/common/token/token.module';
import { RoleModule } from './modules/common/role/role.module';
import { GatewayModule } from './modules/common/gateway/gateway.module';
import { PermissionModule } from './modules/common/permission/permission.module';
import { AuthModule } from './modules/common/auth/auth.module';
import { AppGateway } from './modules/common/gateway/gateway.gateway';


@Module({
  imports: [
    configModule,
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '../../static'),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT) || 3306,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        // migrationsRun: true,
        autoLoadEntities: true,
        charset: 'UTF8',
        // migrations: [
        //   "src/migration/**/*.ts"
        // ],
      })
      // subscribers: [
      //   "src/subscriber/**/*.ts"
      // ],
    }),
    UserModule,
    AuthModule,
    RoleModule,
    PermissionModule,
    TokenModule,
    GatewayModule,
  ],
  providers: [AppGateway],
})
export class AppModule implements NestModule {
  constructor(private connection: Connection) {
  }

  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(LoggingMiddleware)
      .forRoutes({path: '*', method: RequestMethod.ALL})
  }
}

// @Module({
//   imports: [],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}
