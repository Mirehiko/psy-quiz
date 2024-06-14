import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {RunAnswerEntity} from "./schemas/run-answer.entity";
import {RunAnswerController} from "./run-answer.controller";
import {RunAnswerService} from "./run-answer.service";


@Module({
    imports: [
        TypeOrmModule.forFeature(([RunAnswerEntity])),
    ],
    providers: [RunAnswerService],
    controllers: [RunAnswerController],
    exports: [RunAnswerService]
})
export class RunAnswerModule {}
