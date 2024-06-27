import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionEntity } from '../question/schemas/question.entity';
import { QuestionTypeController } from './question-type.controller';
import { QuestionTypeService } from './question-type.service';
import { QuestionTypeEntity } from './schemas/question-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionTypeEntity, QuestionEntity])],
  providers: [QuestionTypeService],
  controllers: [QuestionTypeController],
  exports: [QuestionTypeService]
})
export class QuestionTypeModule {}
