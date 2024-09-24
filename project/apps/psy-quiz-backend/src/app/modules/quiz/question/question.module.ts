import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionAnswerEntity } from '../question_answer/schemas/question-answer.entity';
import { QuestionTypeEntity } from '../question_type/schemas/question-type.entity';
import { TestEntity } from '../test/schemas/test.entity';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { QuestionEntity } from './schemas/question.entity';
import { PermissionEntity } from '../../common/permission/schemas/permission.entity';
import { UserEntity } from '../../common/user/schemas/user.entity';
import { AuthModule } from '../../common/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuestionEntity, TestEntity, QuestionAnswerEntity, QuestionTypeEntity, PermissionEntity, UserEntity]), forwardRef(() => AuthModule)
    // forwardRef(() => TestModule)
  ],
  providers: [QuestionService],
  controllers: [QuestionController],
  exports: [QuestionService]
})
export class QuestionModule {}
