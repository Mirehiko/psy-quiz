import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class ScaleAnswerRequestDto {
  @IsString()
  scaleId?: string;

  @IsString()
  answer: string;

  @IsString()
  questionId: string;
}
export class ScaleAnswerResponseDto {
  @Expose()
  id: string;

  @Expose()
  answer: string;

  @Expose()
  questionId: string;
}
