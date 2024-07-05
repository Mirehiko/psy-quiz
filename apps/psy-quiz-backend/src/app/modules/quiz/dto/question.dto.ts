import { IQuestion } from '../interfaces/i-question';
import { IQuestionType } from '../interfaces/i-question-type';
import { ITest } from '../interfaces/i-test';

export class QuestionRequestDto implements IQuestion {
  name: string;
  test: ITest;
  description?: string;
}

export class QuestionResponseDto implements IQuestion {
  id: string;
  name: string;
  description?: string;
  answerType: IQuestionType;
  answers?: IQuestion[];
  free_answer?: string;
  test: ITest;
}
