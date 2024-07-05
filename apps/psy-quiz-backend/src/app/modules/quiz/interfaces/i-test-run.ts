import { ITest } from './i-test';
import { IRunAnswer } from './i-run-answer';

export interface ITestRun {
  userId: string;
  answers?: IRunAnswer[]
  test: ITest;
}
