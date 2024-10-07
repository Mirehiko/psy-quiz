import { IQuestion } from './i-question';

export interface IQuestionAnswer {
  id?: string;
  name: string;
  description?: string;
  question: IQuestion;
}
