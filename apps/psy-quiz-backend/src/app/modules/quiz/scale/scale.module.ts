import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CriterionEntity } from '../criterion/schemas/criterion.entity';
import { ScaleAnswerEntity } from '../scale_answer/schemas/scale-answer.entity';
import { TestEntity } from '../test/schemas/test.entity';
import { ScaleRepository } from './scale-repository';
import { ScaleController } from './scale.controller';
import { ScaleService } from './scale.service';
import { ScaleEntity } from './schemas/scale.entity';
import { TestRepository } from '../test/test-repository';
import { CriterionRepository } from '../criterion/criterion-repository';
import { ScaleAnswerRepository } from '../scale_answer/scale-answer-repository';

@Module({
  imports: [TypeOrmModule.forFeature([
    // ScaleEntity,
    // TestEntity,
    // CriterionEntity,
    // ScaleAnswerEntity,
    ScaleRepository,
    TestRepository,
    CriterionRepository,
    ScaleAnswerRepository
  ])],
  providers: [ScaleService],
  controllers: [ScaleController],
  exports: [ScaleService]
})
export class ScaleModule {}
