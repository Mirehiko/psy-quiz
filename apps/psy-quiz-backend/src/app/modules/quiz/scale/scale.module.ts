import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ScaleEntity} from "./schemas/scale.entity";
import {ScaleService} from "./scale.service";
import {ScaleController} from "./scale.controller";
import {TestEntity} from "../test/schemas/test.entity";
import {ScaleAnswerEntity} from "../scale_answer/schemas/scale-answer.entity";
import {CriterionEntity} from "../criterion/schemas/criterion.entity";
import {ScaleRepository} from "./scale-repository";


@Module({
    imports: [
        TypeOrmModule.forFeature(([ScaleEntity, ScaleRepository, TestEntity, CriterionEntity, ScaleAnswerEntity])),
    ],
    providers: [ScaleService],
    controllers: [ScaleController],
    exports: [ScaleService]
})
export class ScaleModule {}
