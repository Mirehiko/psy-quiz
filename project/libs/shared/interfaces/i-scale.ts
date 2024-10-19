import { UserEntity } from '../../../apps/psy-quiz-backend/src/app/modules/common/user/schemas/user.entity';
import { CriterionEntity } from '../../../apps/psy-quiz-backend/src/app/modules/quiz/criterion/schemas/criterion.entity';
import { ScaleAnswerEntity } from '../../../apps/psy-quiz-backend/src/app/modules/quiz/scale_answer/schemas/scale-answer.entity';
import { TestEntity } from '../../../apps/psy-quiz-backend/src/app/modules/quiz/test/schemas/test.entity';
import { ICriterion } from './i-criterion';
import { ITest } from './i-test';

// export interface IScale {
//   id?: string;
//   name: string;
//   description?: string;
//   answers?: IScale[];
//   criteria?: ICriterion[];
//   test: ITest;
// }
export interface IScale {
  name: string;
  description?: string;
  // createdBy?: IUser;
  answers?: ScaleAnswerEntity[];
  criteria?: CriterionEntity[];
  test?: TestEntity;
  createdBy?: UserEntity;
}
