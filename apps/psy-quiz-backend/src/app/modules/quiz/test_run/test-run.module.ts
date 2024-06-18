import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RunAnswerEntity } from '../run_answer/schemas/run-answer.entity';
import { TestEntity } from '../test/schemas/test.entity';
import { TestRunEntity } from './schemas/test-run.entity';
import { TestRunRepository } from './test-run-repository';
import { TestRunController } from './test-run.controller';
import { TestRunService } from './test-run.service';

@Module({
  imports: [TypeOrmModule.forFeature([TestRunEntity, TestRunRepository, TestEntity, RunAnswerEntity])],
  providers: [TestRunService],
  controllers: [TestRunController],
  exports: [TestRunService]
})
export class TestRunModule {}
