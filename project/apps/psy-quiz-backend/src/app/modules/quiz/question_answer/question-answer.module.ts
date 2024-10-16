import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../common/auth/auth.module';
import { PermissionEntity } from '../../common/permission/schemas/permission.entity';
import { UserEntity } from '../../common/user/schemas/user.entity';
import { QuestionEntity } from '../question/schemas/question.entity';
import { QuestionAnswerController } from './question-answer.controller';
import { QuestionAnswerService } from './question-answer.service';
import { QuestionAnswerEntity } from './schemas/question-answer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuestionAnswerEntity, QuestionEntity, PermissionEntity, UserEntity]),
    forwardRef(() => AuthModule)
  ],
  providers: [QuestionAnswerService],
  controllers: [QuestionAnswerController],
  exports: [QuestionAnswerService]
})
export class QuestionAnswerModule {}
