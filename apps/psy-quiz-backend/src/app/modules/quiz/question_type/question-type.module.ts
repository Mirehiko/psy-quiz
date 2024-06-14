import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {QuestionTypeService} from "./question-type.service";
import {QuestionTypeEntity} from "./schemas/question-type.entity";
import {QuestionTypeController} from "./question-type.controller";


@Module({
    imports: [
        TypeOrmModule.forFeature(([QuestionTypeEntity])),
    ],
    providers: [QuestionTypeService],
    controllers: [QuestionTypeController],
    exports: [QuestionTypeService]
})
export class QuestionTypeModule {}
