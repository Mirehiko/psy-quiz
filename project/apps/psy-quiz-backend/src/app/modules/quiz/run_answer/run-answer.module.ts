import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../common/auth/auth.module';
import { PermissionEntity } from '../../common/permission/schemas/permission.entity';
import { UserEntity } from '../../common/user/schemas/user.entity';
import { TestRunEntity } from '../test_run/schemas/test-run.entity';
import { RunAnswerController } from './run-answer.controller';
import { RunAnswerService } from './run-answer.service';
import { RunAnswerEntity } from './schemas/run-answer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RunAnswerEntity, TestRunEntity, PermissionEntity, UserEntity]),
    forwardRef(() => AuthModule)
  ],
  providers: [RunAnswerService],
  controllers: [RunAnswerController],
  exports: [RunAnswerService]
})
export class RunAnswerModule {}
