import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CriterionEntity } from '../criterion/schemas/criterion.entity';
import { ScaleAnswerEntity } from '../scale_answer/schemas/scale-answer.entity';
import { TestEntity } from '../test/schemas/test.entity';
import { ScaleRepository } from './scale-repository';
import { ScaleController } from './scale.controller';
import { ScaleService } from './scale.service';
import { ScaleEntity } from './schemas/scale.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ScaleEntity, ScaleRepository, TestEntity, CriterionEntity, ScaleAnswerEntity])],
  providers: [ScaleService],
  controllers: [ScaleController],
  exports: [ScaleService]
})
export class ScaleModule {}
