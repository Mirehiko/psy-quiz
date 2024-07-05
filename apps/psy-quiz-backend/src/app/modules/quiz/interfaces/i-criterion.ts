import { IScale } from './i-scale';

export interface ICriterion {
  id?: string;
  minScore: number;
  maxScore: number;
  name: string;
  description?: string;
  scale: IScale
}
