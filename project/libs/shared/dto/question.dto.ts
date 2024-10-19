import { Exclude, Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { QuestionType } from '../enums';
import { IQuestion, IQuestionAnswer, IQuestionType } from '../interfaces';
import { QuestionAnswerResponseDto } from './question-answer.dto';

export class QuestionRequestDto implements IQuestion {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  answerType: QuestionType;

  @IsOptional()
  @IsString()
  free_answer: string;

  @IsOptional()
  @IsString()
  testId: string;
}

@Exclude()
export class QuestionResponseDto implements IQuestion {
  @Expose()
  id: string;
  @Expose()
  name: string;
  @Expose()
  description?: string;
  @Expose()
  answerType: QuestionType;
  @Expose()
  answers?: QuestionAnswerResponseDto[];
  @Expose()
  free_answer?: string;
  @Expose()
  testId: string;
}
