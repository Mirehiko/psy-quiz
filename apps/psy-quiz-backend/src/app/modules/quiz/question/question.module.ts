import {forwardRef, Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {QuestionController} from "./question.controller";
import {QuestionService} from "./question.service";
import {QuestionRepository} from "./question-repository";
import {TestRepository} from "../test/test-repository";
import {TestModule} from "../test/test.module";
import {QuestionEntity} from "./schemas/question.entity";
import {TestEntity} from "../test/schemas/test.entity";
import {QuestionAnswerEntity} from "../question_answer/schemas/question-answer.entity";
import {QuestionTypeEntity} from "../question_type/schemas/question-type.entity";


@Module({
  imports: [
    TypeOrmModule.forFeature(([QuestionEntity, QuestionRepository, TestEntity, TestRepository, QuestionAnswerEntity, QuestionTypeEntity])),
    forwardRef(() => TestModule),
  ],
  providers: [QuestionService],
  controllers: [QuestionController],
  exports: [QuestionService]
})
export class QuestionModule {}
