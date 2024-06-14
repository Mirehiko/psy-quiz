import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {QuestionEntity} from "./schemas/question.entity";
import {QuestionController} from "./question.controller";
import {QuestionService} from "./question.service";


@Module({
    imports: [
        TypeOrmModule.forFeature(([QuestionEntity])),
    ],
    providers: [QuestionService],
    controllers: [QuestionController],
    exports: [QuestionService]
})
export class QuestionModule {}
