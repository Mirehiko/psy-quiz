import { IsOptional, IsString } from 'class-validator';
import { IQuestion, IQuestionAnswer } from '../interfaces';
import { QuestionResponseDto } from './question.dto';

export class QuestionAnswerRequestDto implements IQuestionAnswer {
  @IsOptional()
  @IsString()
  name: string;

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

  question: QuestionResponseDto;
}
