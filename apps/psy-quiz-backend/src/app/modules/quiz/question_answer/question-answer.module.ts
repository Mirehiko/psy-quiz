import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { QuestionEntity } from '../question/schemas/question.entity';
import { QuestionAnswerRepository } from './question-answer-repository';
import { QuestionAnswerController } from './question-answer.controller';
import { QuestionAnswerService } from './question-answer.service';
// import { QuestionAnswerEntity } from './schemas/question-answer.entity';
import { QuestionRepository } from '../question/question-repository';

@Module({
  imports: [TypeOrmModule.forFeature([
    // QuestionAnswerEntity,
    QuestionAnswerRepository,
    // QuestionEntity
    QuestionRepository
  ])],
  providers: [QuestionAnswerService],
  controllers: [QuestionAnswerController],
  exports: [QuestionAnswerService]
})
export class QuestionAnswerModule {}
