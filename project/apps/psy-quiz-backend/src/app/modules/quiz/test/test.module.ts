import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../common/auth/auth.module';
import { PermissionEntity } from '../../common/permission/schemas/permission.entity';
import { UserEntity } from '../../common/user/schemas/user.entity';
import { QuestionEntity } from '../question/schemas/question.entity';
import { ScaleEntity } from '../scale/schemas/scale.entity';
import { TestRunEntity } from '../test_run/schemas/test-run.entity';
import { TestEntity } from './schemas/test.entity';
import { TestController } from './test.controller';
import { TestService } from './test.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TestEntity, QuestionEntity, ScaleEntity, TestRunEntity, PermissionEntity, UserEntity]),
    forwardRef(() => AuthModule)
    // forwardRef(() => QuestionModule),
  ],
  providers: [TestService],
  exports: [TestService],
  controllers: [TestController]
})
export class TestModule {}
