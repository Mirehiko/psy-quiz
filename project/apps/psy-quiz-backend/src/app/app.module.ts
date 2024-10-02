import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection, DataSource } from 'typeorm';
import typeorm from './config/postgres-datasource';
import { LoggingMiddleware } from './middleware';
import { AuthModule } from './modules/common/auth/auth.module';
import { GatewayModule } from './modules/common/gateway/gateway.module';
import { PermissionModule } from './modules/common/permission/permission.module';
import { RoleModule } from './modules/common/role/role.module';
import { TokenModule } from './modules/common/token/token.module';
import { UserModule } from './modules/common/user/user.module';
import { CriterionModule } from './modules/quiz/criterion/criterion.module';
import { QuestionModule } from './modules/quiz/question/question.module';
import { QuestionAnswerModule } from './modules/quiz/question_answer/question-answer.module';
import { QuestionTypeModule } from './modules/quiz/question_type/question-type.module';
import { RunAnswerModule } from './modules/quiz/run_answer/run-answer.module';
import { ScaleModule } from './modules/quiz/scale/scale.module';
import { ScaleAnswerModule } from './modules/quiz/scale_answer/scale-answer.module';
import { TestModule } from './modules/quiz/test/test.module';
import { TestRunModule } from './modules/quiz/test_run/test-run.module';

@Module({
  imports: [
    // configModule,
    // ServeStaticModule.forRoot({
    //   rootPath: path.resolve(__dirname, '../../static'),
    // }),
    // TypeOrmModule.forRoot(postgresConfig),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [typeorm]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => configService.get('typeorm')
    }),
    UserModule,
    AuthModule,
    RoleModule,
    PermissionModule,
    TokenModule,
    GatewayModule,
    CriterionModule,
    QuestionModule,
    QuestionAnswerModule,
    QuestionTypeModule,
    RunAnswerModule,
    ScaleModule,
    ScaleAnswerModule,
    TestModule,
    TestRunModule
  ]
  // providers: [AppGateway],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggingMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
