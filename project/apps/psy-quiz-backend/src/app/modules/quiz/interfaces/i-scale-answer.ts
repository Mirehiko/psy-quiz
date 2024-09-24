import { IScale } from './i-scale';

export interface IScaleAnswer {
  id?: string;
  questionId: string;
  answer: string;
  scale: IScale;
}
