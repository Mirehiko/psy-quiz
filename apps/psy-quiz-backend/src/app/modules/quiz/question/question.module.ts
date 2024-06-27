import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionAnswerEntity } from '../question_answer/schemas/question-answer.entity';
import { QuestionTypeEntity } from '../question_type/schemas/question-type.entity';
import { TestEntity } from '../test/schemas/test.entity';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { QuestionEntity } from './schemas/question.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuestionEntity, TestEntity, QuestionAnswerEntity, QuestionTypeEntity])
    // forwardRef(() => TestModule)
  ],
  providers: [QuestionService],
  controllers: [QuestionController],
  exports: [QuestionService]
})
export class QuestionModule {}
