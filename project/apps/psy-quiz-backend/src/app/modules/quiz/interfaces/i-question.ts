import { IQuestionType } from './i-question-type';

export interface IQuestion {
  id?: string;
  name?: string;
  description?: string;
  answerType?: IQuestionType;
  answers?: IQuestion[];
  free_answer?: string;
}
