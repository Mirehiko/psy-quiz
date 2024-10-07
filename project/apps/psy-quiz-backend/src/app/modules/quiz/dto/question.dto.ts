import { IsNumber, IsOptional, IsString } from 'class-validator';
import { IQuestion } from '../interfaces/i-question';
import { IQuestionType } from '../interfaces/i-question-type';
import { ITest } from '../interfaces/i-test';

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
  @IsNumber()
  // @IsString() // todo
  testId: number;
}

export class QuestionResponseDto implements IQuestion {
  id: string;
  name: string;
  description?: string;
  answerType: IQuestionType;
  answers?: IQuestion[];
  free_answer?: string;
  test: ITest;
}
