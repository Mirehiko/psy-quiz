import { IQuestion } from './i-question';
import { IScale } from './i-scale';
import { ITestRun } from './i-test-run';

export interface ITest {
  id?: string;
  name: string;
  description?: string;
  questions?: IQuestion[];
  scales?: IScale[];
  runs?: ITestRun[];
  createdById?: string;
}
