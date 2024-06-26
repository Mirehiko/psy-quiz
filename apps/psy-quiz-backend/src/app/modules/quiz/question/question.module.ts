import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionAnswerEntity } from '../question_answer/schemas/question-answer.entity';
import { QuestionTypeEntity } from '../question_type/schemas/question-type.entity';
import { TestEntity } from '../test/schemas/test.entity';
import { TestRepository } from '../test/test-repository';
import { TestModule } from '../test/test.module';
import { QuestionRepository } from './question-repository';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { QuestionEntity } from './schemas/question.entity';
import { QuestionAnswerRepository } from '../question_answer/question-answer-repository';
import { QuestionTypeRepository } from '../question_type/question-type-repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      // QuestionEntity,
      // TestEntity,
      // QuestionAnswerEntity,
      // QuestionTypeEntity,
      QuestionRepository,
      TestRepository,
      QuestionAnswerRepository,
      QuestionTypeRepository
    ]),
    forwardRef(() => TestModule)
  ],
  providers: [QuestionService],
  controllers: [QuestionController],
  exports: [QuestionService]
})
export class QuestionModule {}
