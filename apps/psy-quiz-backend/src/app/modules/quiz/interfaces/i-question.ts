import { ITest } from './i-test';
import { IQuestionType } from './i-question-type';

export interface IQuestion {
  id?: string;
  name: string;
  test: ITest;
  description?: string;
  answerType?: IQuestionType;
  answers?: IQuestion[];
  free_answer?: string;
}
