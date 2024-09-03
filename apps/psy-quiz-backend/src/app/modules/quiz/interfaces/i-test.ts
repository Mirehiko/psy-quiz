import { IQuestion } from './i-question';
import { ITestRun } from './i-test-run';
import { IScale } from './i-scale';

export interface ITest {
  id?: string;
  name: string;
  description?: string;
  questions?: IQuestion[];
  scales?: IScale[];
  runs?: ITestRun[];
  createdById?: string;
}
