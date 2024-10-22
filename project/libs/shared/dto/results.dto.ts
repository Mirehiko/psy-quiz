import { CriterionResponseDto } from './criterion.dto';

export class Result {
  scaleName: string;
  scaleDescription: string;
  score: number;
  criterion: CriterionResponseDto;
}
