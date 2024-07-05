import { ITestRun } from './i-test-run';

export interface IRunAnswer {
  id: string;
  questionId: string;
  answer: string;
  run: ITestRun;
}
