import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {QuestionAnswerEntity} from "./schemas/question-answer.entity";
import {QuestionAnswerController} from "./question-answer.controller";
import {QuestionAnswerService} from "./question-answer.service";


@Module({
    imports: [
        TypeOrmModule.forFeature(([QuestionAnswerEntity])),
    ],
    providers: [QuestionAnswerService],
    controllers: [QuestionAnswerController],
    exports: [QuestionAnswerService]
})
export class QuestionAnswerModule {}
