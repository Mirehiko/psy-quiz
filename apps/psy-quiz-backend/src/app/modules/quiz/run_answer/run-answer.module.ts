import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { TestRunEntity } from '../test_run/schemas/test-run.entity';
import { RunAnswerRepository } from './run-answer-repository';
import { RunAnswerController } from './run-answer.controller';
import { RunAnswerService } from './run-answer.service';
// import { RunAnswerEntity } from './schemas/run-answer.entity';
import { TestRunRepository } from '../test_run/test-run-repository';

@Module({
  imports: [TypeOrmModule.forFeature([
    // RunAnswerEntity,
    RunAnswerRepository,
    // TestRunEntity
    TestRunRepository
  ])],
  providers: [RunAnswerService],
  controllers: [RunAnswerController],
  exports: [RunAnswerService]
})
export class RunAnswerModule {}
