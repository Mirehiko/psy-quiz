import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ScaleService} from "./scale.service";
import {ScaleController} from "./scale.controller";
import {TestEntity} from "../test/schemas/test.entity";
import {CriterionEntity} from "../criterion/schemas/criterion.entity";
import {ScaleAnswerEntity} from "../scale_answer/schemas/scale-answer.entity";
import {ScaleEntity} from "./schemas/scale.entity";


@Module({
  imports: [
    TypeOrmModule.forFeature(([ScaleEntity, TestEntity, CriterionEntity, ScaleAnswerEntity])),
  ],
  providers: [ScaleService],
  controllers: [ScaleController],
  exports: [ScaleService]
})
export class ScaleModule {}
