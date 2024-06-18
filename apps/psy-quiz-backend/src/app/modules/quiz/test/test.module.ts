import {forwardRef, Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TestService} from "./test.service";
import {TestController} from "./test.controller";
import {TestRepository} from "./test-repository";
import {QuestionRepository} from "../question/question-repository";
import {QuestionModule} from "../question/question.module";
import {TestEntity} from "./schemas/test.entity";
import {QuestionEntity} from "../question/schemas/question.entity";
import {ScaleEntity} from "../scale/schemas/scale.entity";
import {TestRunEntity} from "../test_run/schemas/test-run.entity";


@Module({
  imports: [
    TypeOrmModule.forFeature(([TestEntity, QuestionEntity, TestRepository, ScaleEntity, TestRunEntity, QuestionRepository])),
    forwardRef(() => QuestionModule),
  ],
  providers: [TestService],
  controllers: [TestController],
  exports: [TestService]
})
export class TestModule {}
