import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ScaleAnswerService} from "./scale-answer.service";
import {ScaleAnswerController} from "./scale-answer.controller";
import {ScaleAnswerEntity} from "./schemas/scale-answer.entity";
import {ScaleEntity} from "../scale/schemas/scale.entity";


@Module({
  imports: [
    TypeOrmModule.forFeature(([ScaleAnswerEntity, ScaleEntity])),
  ],
  providers: [ScaleAnswerService],
  controllers: [ScaleAnswerController],
  exports: [ScaleAnswerService]
})
export class ScaleAnswerModule {}
