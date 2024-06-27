import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestRunEntity } from '../test_run/schemas/test-run.entity';
import { RunAnswerController } from './run-answer.controller';
import { RunAnswerService } from './run-answer.service';
import { RunAnswerEntity } from './schemas/run-answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RunAnswerEntity, TestRunEntity])],
  providers: [RunAnswerService],
  controllers: [RunAnswerController],
  exports: [RunAnswerService]
})
export class RunAnswerModule {}
