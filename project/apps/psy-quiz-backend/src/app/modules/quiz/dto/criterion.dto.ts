import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ICriterion } from '../interfaces/i-criterion';
import { IScale } from '../interfaces/i-scale';

export class CriterionRequestDto implements ICriterion {
  @IsNumber()
  @IsOptional()
  minScore?: number;

  @IsNumber()
  @IsOptional()
  maxScore?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  name: string;

  @IsString()
  scaleId: string;
}
export class CriterionResponseDto implements ICriterion {
  id: string;
  minScore: number;
  maxScore: number;
  description: string;
  name: string;
  scale: IScale;
}
