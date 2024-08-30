import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionEntity } from '../question/schemas/question.entity';
import { QuestionTypeController } from './question-type.controller';
import { QuestionTypeService } from './question-type.service';
import { QuestionTypeEntity } from './schemas/question-type.entity';
import { PermissionEntity } from '../../common/permission/schemas/permission.entity';
import { UserEntity } from '../../common/user/schemas/user.entity';
import { AuthModule } from '../../common/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionTypeEntity, QuestionEntity, PermissionEntity, UserEntity]), forwardRef(() => AuthModule)],
  providers: [QuestionTypeService],
  controllers: [QuestionTypeController],
  exports: [QuestionTypeService]
})
export class QuestionTypeModule {}
