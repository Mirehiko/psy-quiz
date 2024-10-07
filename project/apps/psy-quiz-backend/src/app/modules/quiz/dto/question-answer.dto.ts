import { IQuestion } from '../interfaces/i-question';
import { IQuestionAnswer } from '../interfaces/i-question-answer';

export class QuestionAnswerRequestDto implements IQuestionAnswer {
  name: string;
  question: IQuestion;
  description?: string;
}

export class QuestionAnswerResponseDto implements IQuestionAnswer {
  id: string;
  name: string;
  description?: string;
  question: IQuestion;
}
