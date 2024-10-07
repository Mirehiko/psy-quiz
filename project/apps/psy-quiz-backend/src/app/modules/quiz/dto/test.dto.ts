import { IsOptional, IsString } from 'class-validator';
import { IUser } from '../../common/user/schemas/user.entity';
import { IQuestion } from '../interfaces/i-question';
import { IScale } from '../interfaces/i-scale';
import { ITest } from '../interfaces/i-test';
import { ITestRun } from '../interfaces/i-test-run';

export class TestRequestDto implements ITest {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  questions?: IQuestion[];

  @IsOptional()
  scales?: IScale[];

  @IsOptional()
  runs?: ITestRun[];
}

export class TestResponseDto implements ITest {
  id: string;
  name: string;
  description?: string;
  questions?: IQuestion[];
  scales?: IScale[];
  runs?: ITestRun[];
  createdBy: IUser;
}
