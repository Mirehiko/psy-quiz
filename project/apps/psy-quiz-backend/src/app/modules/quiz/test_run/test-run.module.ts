import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../common/auth/auth.module';
import { PermissionEntity } from '../../common/permission/schemas/permission.entity';
import { UserEntity } from '../../common/user/schemas/user.entity';
import { RunAnswerEntity } from '../run_answer/schemas/run-answer.entity';
import { TestEntity } from '../test/schemas/test.entity';
import { TestRunEntity } from './schemas/test-run.entity';
import { TestRunController } from './test-run.controller';
import { TestRunService } from './test-run.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TestRunEntity, TestEntity, RunAnswerEntity, PermissionEntity, UserEntity]),
    forwardRef(() => AuthModule)
  ],
  providers: [TestRunService],
  controllers: [TestRunController],
  exports: [TestRunService]
})
export class TestRunModule {}
