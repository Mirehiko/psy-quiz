import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { ScaleEntity } from '../scale/schemas/scale.entity';
import { CriterionRepository } from './criterion-repository';
import { CriterionController } from './criterion.controller';
import { CriterionService } from './criterion.service';
// import { CriterionEntity } from './schemas/criterion.entity';
import { ScaleRepository } from '../scale/scale-repository';

@Module({
  imports: [TypeOrmModule.forFeature([
    // CriterionEntity,
    CriterionRepository,
    // ScaleEntity
    ScaleRepository
  ])],
  providers: [CriterionService],
  controllers: [CriterionController],
  exports: [CriterionService]
})
export class CriterionModule {}
