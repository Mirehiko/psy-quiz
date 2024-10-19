import { IsOptional, IsString } from 'class-validator';
import { IUser } from '../../common';
import { ITestRun, ITestRunRequestDto, ITestRunResponseDto } from '../interfaces';

export class TestRunRequestDto implements ITestRunRequestDto {
  // @IsString()
  // name: string;
  // @IsString()
  // testId

  // @IsOptional()
  // @IsString()
  // description?: string;
  @IsOptional()
  @IsString()
  userId?: string;
}

export class TestRunResponseDto implements ITestRunResponseDto {
  id: string;
  name: string;
  description: string;
  user: IUser;
  test: ITestRun;
  startDate: Date;
  endDate: Date;
  userId: string;
  testId: string;
  createdAt: Date;
}
