import { ITest } from '../interfaces/i-test';
import { IQuestion } from '../interfaces/i-question';
import { IScale } from '../interfaces/i-scale';
import { ITestRun } from '../interfaces/i-test-run';

export class TestRequestDto implements ITest {
  name: string;
  description?: string;
}

export class TestResponseDto implements ITest {
  id: string;
  name: string;
  description?: string;
  questions?: IQuestion[];
  scales?: IScale[];
  runs?: ITestRun[];
}
