import {forwardRef, Module} from '@nestjs/common';
import {QuestionController} from "./question.controller";
import {QuestionService} from "./question.service";
import {TestEntity} from "../test/schemas/test.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {QuestionEntity} from "./schemas/question.entity";
import {QuestionAnswerEntity} from "../question_answer/schemas/question-answer.entity";
import {QuestionTypeEntity} from "../question_type/schemas/question-type.entity";


@Module({
  imports: [
    TypeOrmModule.forFeature(([QuestionEntity, TestEntity, QuestionAnswerEntity, QuestionTypeEntity])),
  ],
  providers: [QuestionService],
  controllers: [QuestionController],
  exports: [QuestionService]
})
export class QuestionModule {}
