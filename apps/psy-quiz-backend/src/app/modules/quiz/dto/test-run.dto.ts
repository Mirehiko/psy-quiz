import { ITestRun, ITestRunRequestDto, ITestRunResponseDto } from '../interfaces/i-test-run';
import { IUser } from '../../common/user/schemas/user.entity';

export class TestRunRequestDto implements ITestRunRequestDto {
  // @IsString()
  // name: string;
  // @IsString()
  // testId

  // @IsOptional()
  // @IsString()
  // description?: string;
}

export class TestRunResponseDto implements ITestRunResponseDto {
  name: string;
  description: string;
  user: IUser;
  test: ITestRun;
  startDate: string;
  endDate: string;
}
