import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {QuestionTypeService} from "./question-type.service";
import {QuestionTypeEntity} from "./schemas/question-type.entity";
import {QuestionTypeController} from "./question-type.controller";
import {QuestionEntity} from "../question/schemas/question.entity";
import {QuestionTypeRepository} from "./question-type-repository";


@Module({
    imports: [
        TypeOrmModule.forFeature(([QuestionTypeEntity, QuestionTypeRepository, QuestionEntity])),
    ],
    providers: [QuestionTypeService],
    controllers: [QuestionTypeController],
    exports: [QuestionTypeService]
})
export class QuestionTypeModule {}
