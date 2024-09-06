import { IUser } from '../../common/user/schemas/user.entity';

export interface ITestRun {
  // name: string;
  // description?: string;
  startDate?: string;
  endDate?: string;
}

export interface ITestRunRequestDto extends ITestRun {
  // testId: string;
}

export interface ITestRunResponseDto extends ITestRun {
  user: IUser;
  test: ITestRun;
}
