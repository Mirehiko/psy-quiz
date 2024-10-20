import { IUser } from '../../common';

export interface ITestRun {
  // name: string;
  // description?: string;
  userId?: string;
  startDate?: Date;
  endDate?: Date;
  isFinished?: boolean;
}

export interface ITestRunRequestDto extends ITestRun {
  // testId: string;
}

export interface ITestRunResponseDto extends ITestRun {
  user: IUser;
  test: ITestRun;
}
