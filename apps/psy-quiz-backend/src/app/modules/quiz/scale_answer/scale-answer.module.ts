import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ScaleAnswerEntity} from "./schemas/scale-answer.entity";
import {ScaleController, ScaleService} from "../scale";


@Module({
    imports: [
        TypeOrmModule.forFeature(([ScaleAnswerEntity])),
    ],
    providers: [ScaleService],
    controllers: [ScaleController],
    exports: [ScaleService]
})
export class ScaleAnswerModule {}
