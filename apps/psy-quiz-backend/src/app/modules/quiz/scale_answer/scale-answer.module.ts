import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScaleEntity } from '../scale/schemas/scale.entity';
import { ScaleAnswerRepository } from './scale-answer-repository';
import { ScaleAnswerController } from './scale-answer.controller';
import { ScaleAnswerService } from './scale-answer.service';
import { ScaleAnswerEntity } from './schemas/scale-answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ScaleAnswerEntity, ScaleAnswerRepository, ScaleEntity])],
  providers: [ScaleAnswerService],
  controllers: [ScaleAnswerController],
  exports: [ScaleAnswerService]
})
export class ScaleAnswerModule {}
