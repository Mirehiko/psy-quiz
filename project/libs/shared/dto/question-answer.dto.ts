import { IsOptional, IsString } from 'class-validator';
import { IQuestion, IQuestionAnswer } from '../interfaces';

export class QuestionAnswerRequestDto implements IQuestionAnswer {
  @IsOptional()
  @IsString()
  name: string;

  question: IQuestion;

  @IsOptional()
  @IsString()
  description?: string;
}

export class QuestionAnswerResponseDto implements IQuestionAnswer {
  id: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  question: IQuestion;
}
