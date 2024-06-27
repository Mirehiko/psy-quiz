import {forwardRef, Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TestService} from "./test.service";
import {TestController} from "./test.controller";
import {TestEntity} from "./schemas/test.entity";
import {TestRunEntity} from "../test_run/schemas/test-run.entity";
import {QuestionEntity} from "../question/schemas/question.entity";
import {ScaleEntity} from "../scale/schemas/scale.entity";


@Module({
  imports: [
    TypeOrmModule.forFeature(([TestEntity, QuestionEntity, ScaleEntity, TestRunEntity])),
    // forwardRef(() => QuestionModule),
  ],
  providers: [TestService],
  exports: [TestService],
  controllers: [TestController]
})
export class TestModule {}
