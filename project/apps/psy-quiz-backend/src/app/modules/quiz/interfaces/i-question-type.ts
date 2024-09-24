import { IQuestion } from './i-question';

export interface IQuestionType {
  id?: string;
  name: string;
  description?: string;
  question?: IQuestion[];
}
