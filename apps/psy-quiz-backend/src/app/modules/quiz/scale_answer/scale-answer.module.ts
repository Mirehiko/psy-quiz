import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ScaleEntity} from "../scale/schemas/scale.entity";
import {ScaleAnswerEntity} from "./schemas/scale-answer.entity";
import {ScaleAnswerService} from "./scale-answer.service";
import {ScaleAnswerController} from "./scale-answer.controller";
import {ScaleAnswerRepository} from "./scale-answer-repository";


@Module({
    imports: [
        TypeOrmModule.forFeature(([ScaleAnswerEntity, ScaleAnswerRepository, ScaleEntity])),
    ],
    providers: [ScaleAnswerService],
    controllers: [ScaleAnswerController],
    exports: [ScaleAnswerService]
})
export class ScaleAnswerModule {}
