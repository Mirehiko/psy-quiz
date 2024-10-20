import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { IRunAnswer } from '../interfaces';

export class RunAnswerRequestDto implements IRunAnswer {
  @IsString()
  questionId: string;

  @IsString()
  answer: string;
}

@Exclude()
export class RunAnswerResponseDto implements IRunAnswer {
  @Expose()
  questionId: string;

  @Expose()
  answer: string;

  @Expose()
  id: string;

  @Expose()
  userId: string;
}
