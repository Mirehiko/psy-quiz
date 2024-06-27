import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionEntity } from '../question/schemas/question.entity';
import { ScaleEntity } from '../scale/schemas/scale.entity';
import { TestRunEntity } from '../test_run/schemas/test-run.entity';
import { TestEntity } from './schemas/test.entity';
import { TestController } from './test.controller';
import { TestService } from './test.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TestEntity, QuestionEntity, ScaleEntity, TestRunEntity])
    // forwardRef(() => QuestionModule),
  ],
  providers: [TestService],
  exports: [TestService],
  controllers: [TestController]
})
export class TestModule {}
