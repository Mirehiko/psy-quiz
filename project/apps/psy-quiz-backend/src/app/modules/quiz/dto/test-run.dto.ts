import { IsOptional, IsString } from 'class-validator';
import { IUser } from '../../common/user/schemas/user.entity';
import { ITestRun, ITestRunRequestDto, ITestRunResponseDto } from '../interfaces/i-test-run';

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
  name: string;
  description: string;
  user: IUser;
  test: ITestRun;
  startDate: Date;
  endDate: Date;
}
