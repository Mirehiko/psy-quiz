import { QuestionType } from '../enums';

export interface IQuestion {
  id?: string;
  name?: string;
  description?: string;
  answerType: QuestionType;
  free_answer?: string;
}
