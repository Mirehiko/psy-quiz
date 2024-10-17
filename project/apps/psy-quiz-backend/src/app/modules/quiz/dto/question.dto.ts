import { Exclude, Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { IQuestion } from '../interfaces/i-question';
import { IQuestionType } from '../interfaces/i-question-type';

export class QuestionRequestDto implements IQuestion {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  answerType: IQuestionType;

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
  answerType: IQuestionType;
  @Expose()
  answers?: IQuestion[];
  @Expose()
  free_answer?: string;
  @Expose()
  testId: string;
}
