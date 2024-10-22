import { ICriterion } from './i-criterion';

export interface IResult {
  scaleName: string;
  scaleDescription: string;
  score: number;
  criterion?: ICriterion;
}
