import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CriterionService} from "./criterion.service";
import {CriterionController} from "./criterion.controller";
import {CriterionEntity} from "./schemas/criterion.entity";
import {ScaleEntity} from "../scale/schemas/scale.entity";


@Module({
  imports: [
    TypeOrmModule.forFeature(([CriterionEntity, ScaleEntity])),
  ],
  providers: [CriterionService],
  controllers: [CriterionController],
  exports: [CriterionService]
})
export class CriterionModule {}
