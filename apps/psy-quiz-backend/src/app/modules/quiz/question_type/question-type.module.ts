import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {QuestionTypeService} from "./question-type.service";
import {QuestionTypeController} from "./question-type.controller";
import {QuestionEntity} from "../question/schemas/question.entity";
import {QuestionTypeEntity} from "./schemas/question-type.entity";


@Module({
  imports: [
    TypeOrmModule.forFeature(([QuestionTypeEntity, QuestionEntity])),
  ],
  providers: [QuestionTypeService],
  controllers: [QuestionTypeController],
  exports: [QuestionTypeService]
})
export class QuestionTypeModule {}
