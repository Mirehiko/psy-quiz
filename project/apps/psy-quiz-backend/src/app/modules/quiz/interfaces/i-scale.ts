import { ICriterion } from './i-criterion';
import { ITest } from './i-test';

export interface IScale {
  id?: string;
  name: string;
  description?: string;
  answers?: IScale[];
  criteria?: ICriterion[];
  test: ITest;
}
