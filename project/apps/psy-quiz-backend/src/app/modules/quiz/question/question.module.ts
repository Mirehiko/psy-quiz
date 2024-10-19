import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../common/auth/auth.module';
import { PermissionEntity } from '../../common/permission/schemas/permission.entity';
import { UserEntity } from '../../common/user/schemas/user.entity';
import { QuestionAnswerEntity } from '../question_answer/schemas/question-answer.entity';
import { TestEntity } from '../test/schemas/test.entity';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { QuestionEntity } from './schemas/question.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuestionEntity, TestEntity, QuestionAnswerEntity, PermissionEntity, UserEntity]),
    forwardRef(() => AuthModule)
    // forwardRef(() => TestModule)
  ],
  providers: [QuestionService],
  controllers: [QuestionController],
  exports: [QuestionService]
})
export class QuestionModule {}
