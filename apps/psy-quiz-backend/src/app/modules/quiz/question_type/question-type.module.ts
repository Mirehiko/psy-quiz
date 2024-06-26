import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { QuestionEntity } from '../question/schemas/question.entity';
import { QuestionTypeRepository } from './question-type-repository';
import { QuestionTypeController } from './question-type.controller';
import { QuestionTypeService } from './question-type.service';
// import { QuestionTypeEntity } from './schemas/question-type.entity';
import { QuestionRepository } from '../question/question-repository';

@Module({
  imports: [TypeOrmModule.forFeature([
    // QuestionTypeEntity,
    QuestionTypeRepository,
    // QuestionEntity
    QuestionRepository
  ])],
  providers: [QuestionTypeService],
  controllers: [QuestionTypeController],
  exports: [QuestionTypeService]
})
export class QuestionTypeModule {}
